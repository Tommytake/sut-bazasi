-- Tuzatish: Telegram'ga ulanish vaqtini 30 soniyaga oshirish. Hech narsani o'zgartirmasdan Run bosing.

create or replace function public.send_expiry_telegram()
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  tok   text;
  chat  text;
  today date := (now() at time zone 'Asia/Tashkent')::date;
  total int;
  lines text;
  body  text;
begin
  select decrypted_secret into tok  from vault.decrypted_secrets where name = 'telegram_bot_token';
  select decrypted_secret into chat from vault.decrypted_secrets where name = 'telegram_chat_id';
  if tok is null or chat is null then return; end if;

  with items as (
    select p.name, b.expiry_date, b.qty, (b.expiry_date - today) as left_days
    from batches b
    join products p on p.id = b.product_id
    left join settings s on s.user_id = b.user_id
    where b.deleted_at is null and p.deleted_at is null
      and b.expiry_date - today <= coalesce(s.warn_days, 3)
  ), numbered as (
    select *, row_number() over (order by expiry_date, name) as rn, count(*) over () as cnt from items
  )
  select max(cnt),
         string_agg(
           (case when left_days < 0 then '🔴' when left_days <= 1 then '🟠' else '🟡' end)
           || ' ' || name || ' — ' || to_char(expiry_date, 'DD.MM.YYYY') || ' ('
           || (case when left_days < 0 then (-left_days) || ' kun o''tgan'
                    when left_days = 0 then 'bugun tugaydi'
                    when left_days = 1 then 'ertaga tugaydi'
                    else left_days || ' kun qoldi' end)
           || ')' || coalesce(' · ' || qty || ' dona', ''),
           E'\n' order by rn)
    into total, lines
  from numbered where rn <= 60;

  if coalesce(total, 0) = 0 then
    body := '✅ Sut bo''limi — ' || to_char(today, 'DD.MM.YYYY') || E'\n'
         || 'Bugun muddati yaqin yoki o''tgan mahsulot yo''q.';
  else
    body := '⚠️ Sut bo''limi — ' || to_char(today, 'DD.MM.YYYY') || E'\n'
         || 'Muddati yaqin / o''tgan: ' || total || E' ta\n\n' || lines
         || (case when total > 60 then E'\n… va yana ' || (total - 60) || ' ta' else '' end);
  end if;
  body := body || E'\n\n🔗 https://tommytake.github.io/sut-bazasi/';

  perform net.http_post(
    url     := 'https://api.telegram.org/bot' || tok || '/sendMessage',
    body    := jsonb_build_object('chat_id', chat, 'text', body, 'disable_web_page_preview', true),
    headers := '{"Content-Type": "application/json"}'::jsonb,
    timeout_milliseconds := 30000
  );
end;
$$;

-- Saytdan (internetdan) chaqirib bo'lmasin
revoke execute on function public.send_expiry_telegram() from public, anon, authenticated;

-- Sinov xabari
select public.send_expiry_telegram();
