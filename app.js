'use strict';
/* ====================== Yordamchi funksiyalar ====================== */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => ymd(new Date());
const parseYmd = s => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const diffDays = (a, b) => Math.round((parseYmd(a) - parseYmd(b)) / 86400000);
const daysLeft = s => diffDays(s, todayStr());
const fmtDate = s => s ? String(s).slice(0, 10).split('-').reverse().join('.') : '—';
const fmtDT = iso => { if (!iso) return '—'; const d = new Date(iso); return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2));
const toInt = v => { const n = parseInt(v, 10); return Number.isFinite(n) && n > 0 ? n : null; };
const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const todayLong = () => { const d = new Date(); return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}-${MONTHS[d.getMonth()]}`; };
function dayRange(s) { const a = parseYmd(s), b = parseYmd(addDays(s, 1)); return [a.toISOString(), b.toISOString()]; }

const I = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON = {
  home: I('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  box: I('<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
  scan: I('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 8v8M11 8v8M14 8v8M17 8v8" stroke-width="1.6"/>'),
  tasks: I('<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m8 12 3 3 5-6"/>'),
  file: I('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
  bell: I('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>'),
  gear: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  trash: I('<path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1l1-13M9 7V4h6v3"/>'),
  x: I('<path d="M6 6l12 12M18 6 6 18"/>'),
  camera: I('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>'),
  download: I('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'),
  milk: I('<path d="M9 2h6v3l2 3v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8l2-3z"/><path d="M7 12h10"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  edit: I('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>'),
  check: I('<path d="m5 12 5 5 9-10" stroke-width="3"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  refresh: I('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>'),
  logout: I('<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11"/>'),
};

/* ====================== Holat ====================== */
const S = {
  products: [], batches: [], notes: [], tasks: [], checks: [], checksDay: '',
  settings: { warn_days: 3 }, tab: 'home', q: '', filter: 'all', seg: 'daily',
  modal: null, ready: false, loadedAt: 0, lastAlertAt: 0, pendingImage: undefined,
};
let api = null, sb = null, demo = false, user = null;

const productById = id => S.products.find(p => p.id === id);
const batchesOf = pid => S.batches.filter(b => b.product_id === pid).sort((a, b) => a.expiry_date.localeCompare(b.expiry_date));
const warnDays = () => Number(S.settings?.warn_days) || 3;
function status(expiry) { const d = daysLeft(expiry); return d < 0 ? 'expired' : d <= 1 ? 'urgent' : d <= warnDays() ? 'warn' : 'ok'; }
function daysLabel(expiry) { const d = daysLeft(expiry); if (d < 0) return `${-d} kun o'tgan`; if (d === 0) return 'Bugun tugaydi'; if (d === 1) return 'Ertaga tugaydi'; return `${d} kun qoldi`; }
const alertList = () => S.batches.filter(b => productById(b.product_id) && daysLeft(b.expiry_date) <= warnDays()).sort((a, b) => a.expiry_date.localeCompare(b.expiry_date));
const isChecked = tid => S.checks.some(c => c.task_id === tid);

/* ====================== Ma'lumotlar qatlami ====================== */
function supaAdapter(sb) {
  const chk = ({ data, error }) => { if (error) throw error; return data; };
  async function all(build) {
    const size = 1000; let from = 0; const out = [];
    for (;;) { const data = chk(await build().range(from, from + size - 1)); out.push(...data); if (data.length < size) return out; from += size; }
  }
  return {
    async loadAll() {
      const t = todayStr();
      const [products, batches, notes, tasks, checks, settings] = await Promise.all([
        all(() => sb.from('products').select('*').is('deleted_at', null).order('created_at')),
        all(() => sb.from('batches').select('*').is('deleted_at', null).order('expiry_date')),
        all(() => sb.from('notes').select('*').order('created_at', { ascending: false })),
        all(() => sb.from('tasks').select('*').order('position').order('created_at')),
        all(() => sb.from('task_checks').select('*').eq('day', t)),
        sb.from('settings').select('*').limit(1).then(chk),
      ]);
      return { products, batches, notes, tasks, checks, settings: settings[0] || null, checksDay: t };
    },
    insert: async (t, row) => chk(await sb.from(t).insert(row).select().single()),
    update: async (t, id, patch) => chk(await sb.from(t).update(patch).eq('id', id).select().single()),
    remove: async (t, match) => { chk(await sb.from(t).delete().match(match)); },
    async softDeleteProduct(pid, now) {
      chk(await sb.from('batches').update({ deleted_at: now }).eq('product_id', pid).is('deleted_at', null));
      chk(await sb.from('products').update({ deleted_at: now }).eq('id', pid));
    },
    saveSettings: async s => chk(await sb.from('settings').upsert({ user_id: user.id, ...s }).select().single()),
    report: (field, from, to) => all(() => sb.from('batches').select('*, products(name, barcode)').gte(field, from).lt(field, to).order(field)),
  };
}

function localAdapter() {
  const KEY = 'sut_bazasi_demo_v1';
  const empty = () => ({ products: [], batches: [], notes: [], tasks: [], task_checks: [], settings: [] });
  let db; try { db = Object.assign(empty(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch { db = empty(); }
  const save = () => localStorage.setItem(KEY, JSON.stringify(db));
  const clone = o => JSON.parse(JSON.stringify(o));
  const matches = (r, m) => Object.entries(m).every(([k, v]) => r[k] === v);
  const dup = () => Object.assign(new Error('duplicate'), { code: '23505' });
  return {
    async loadAll() {
      const t = todayStr();
      return clone({
        products: db.products.filter(p => !p.deleted_at),
        batches: db.batches.filter(b => !b.deleted_at),
        notes: [...db.notes].sort((a, b) => b.created_at.localeCompare(a.created_at)),
        tasks: [...db.tasks].sort((a, b) => (a.position - b.position) || a.created_at.localeCompare(b.created_at)),
        checks: db.task_checks.filter(c => c.day === t), settings: db.settings[0] || null, checksDay: t,
      });
    },
    async insert(t, row) {
      if (t === 'products' && db.products.some(p => !p.deleted_at && p.barcode === row.barcode)) throw dup();
      if (t === 'task_checks' && db.task_checks.some(c => c.task_id === row.task_id && c.day === row.day)) throw dup();
      const r = { id: uuid(), created_at: new Date().toISOString(), deleted_at: null, done: false, position: 0, ...row };
      db[t].push(r); save(); return clone(r);
    },
    async update(t, id, patch) { const r = db[t].find(x => x.id === id); if (!r) throw new Error('topilmadi'); Object.assign(r, patch); save(); return clone(r); },
    async remove(t, match) {
      db[t] = db[t].filter(r => !matches(r, match));
      if (t === 'tasks') db.task_checks = db.task_checks.filter(c => c.task_id !== match.id);
      save();
    },
    async softDeleteProduct(pid, now) {
      db.batches.forEach(b => { if (b.product_id === pid && !b.deleted_at) b.deleted_at = now; });
      const p = db.products.find(x => x.id === pid); if (p) p.deleted_at = now; save();
    },
    async saveSettings(s) { db.settings = [{ ...(db.settings[0] || {}), ...s }]; save(); return clone(db.settings[0]); },
    async report(field, from, to) {
      return clone(db.batches.filter(b => b[field] && b[field] >= from && b[field] < to)
        .sort((a, b) => a[field].localeCompare(b[field]))
        .map(b => { const p = db.products.find(x => x.id === b.product_id) || {}; return { ...b, products: { name: p.name, barcode: p.barcode } }; }));
    },
    reset() { db = empty(); save(); },
  };
}

/* ====================== UI yordamchilari ====================== */
let toastTimer;
function toast(msg, type = '') {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast show ' + type;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.className = 'toast ' + type, 2600);
}
function errMsg(e) {
  if (!navigator.onLine) return "Internet yo'q. Ulanishni tekshiring.";
  if (e?.code === '23505') return 'Bu yozuv allaqachon mavjud.';
  return 'Xatolik: ' + (e?.message || e);
}
async function safe(fn) { try { return await fn(); } catch (e) { console.error(e); toast(errMsg(e), 'err'); } }
const loading = on => $('#loader').classList.toggle('hidden', !on);

function openModal(type, html, opts = {}) {
  closeModal(true);
  const wrap = document.createElement('div');
  wrap.className = 'modal-wrap';
  wrap.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
  wrap.addEventListener('click', e => { if (e.target === wrap) closeModal(); });
  $('#modalRoot').appendChild(wrap);
  document.body.style.overflow = 'hidden';
  S.modal = { type, wrap, ...opts };
  return wrap.firstElementChild;
}
function closeModal(silent) {
  const m = S.modal; if (!m) return;
  S.modal = null; m.onClose?.();
  if (m.wrap.contains(document.activeElement)) document.activeElement.blur();
  m.wrap.remove();
  document.body.style.overflow = '';
}
function setModalContent(html) { if (S.modal) { const sh = S.modal.wrap.firstElementChild; const top = sh.scrollTop; sh.innerHTML = html; sh.scrollTop = top; } }

function confirmBox(text, okLabel = "Ha, o'chirish", danger = true) {
  return new Promise(res => {
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap confirm-wrap';
    wrap.innerHTML = `<div class="sheet confirm"><h3>${esc(text)}</h3><div class="row gap"><button class="btn" data-r="0">Bekor qilish</button><button class="btn ${danger ? 'danger' : 'primary'}" data-r="1">${esc(okLabel)}</button></div></div>`;
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-r]');
      if (b || e.target === wrap) { e.stopPropagation(); wrap.remove(); res(b?.dataset.r === '1'); }
    });
    $('#confirmRoot').appendChild(wrap);
  });
}
const imgHTML = p => p?.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" onerror="this.remove()">` : ICON.milk;
const emptyHTML = t => `<div class="empty">${t}</div>`;

/* ====================== Ishga tushirish ====================== */
async function init() {
  $('#bellIcon').innerHTML = ICON.bell; $('#gearIcon').innerHTML = ICON.gear;
  renderNav();
  const cfg = window.APP_CONFIG || {};
  if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase) {
    sb = window.supabase.createClient(cfg.SUPABASE_URL.trim(), cfg.SUPABASE_ANON_KEY.trim(), { auth: { persistSession: true, autoRefreshToken: true } });
    api = supaAdapter(sb);
    const { data } = await sb.auth.getSession();
    if (data?.session) { user = data.session.user; await start(); } else showLogin();
    sb.auth.onAuthStateChange((ev, session) => { if (ev === 'SIGNED_OUT') { user = null; showLogin(); } else if (session) user = session.user; });
  } else {
    demo = true; api = localAdapter();
    $('#demoBanner').classList.remove('hidden');
    await start();
  }
}
function showLogin() {
  loading(false); closeModal(); S.ready = false;
  $('#app').classList.add('hidden'); $('#login').classList.remove('hidden');
}
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, btn = f.querySelector('button'); btn.disabled = true; $('#loginErr').textContent = '';
  const { data, error } = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value });
  btn.disabled = false;
  if (error) { $('#loginErr').textContent = error.message.includes('Invalid') ? "Email yoki parol noto'g'ri" : error.message; return; }
  user = data.user; await start();
});

async function start() {
  $('#login').classList.add('hidden'); $('#app').classList.remove('hidden');
  loading(true);
  try { await reload(); } catch (e) { console.error(e); toast(errMsg(e), 'err'); }
  loading(false); S.ready = true; render();
  if (alertList().length) openAlerts();
}
async function reload() {
  const d = await api.loadAll();
  Object.assign(S, d);
  S.settings = d.settings || { warn_days: 3 };
  S.loadedAt = Date.now();
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || !S.ready) return;
  if (Date.now() - S.loadedAt < 15000 && S.checksDay === todayStr()) return;
  safe(async () => {
    await reload(); render();
    if (S.modal?.type === 'product') refreshProductModal();
    else if (S.modal?.type === 'alerts') setModalContent(alertsHTML());
    if (!S.modal && alertList().length && Date.now() - S.lastAlertAt > 30 * 60000) openAlerts();
  });
});

/* ====================== Render ====================== */
function renderNav() {
  const items = [['home', 'Bosh', ICON.home], ['base', 'Baza', ICON.box], ['scan', '', ICON.scan], ['tasks', 'Ishlar', ICON.tasks], ['report', 'Hisobot', ICON.file]];
  $('#nav').innerHTML = items.map(([k, l, ic]) => k === 'scan'
    ? `<button class="scan-btn" data-act="scan" aria-label="Skanerlash">${ic}</button>`
    : `<button data-act="tab" data-tab="${k}" class="${S.tab === k ? 'active' : ''}">${ic}<span>${l}</span></button>`).join('');
}
function render() {
  renderNav();
  const n = alertList().length, bd = $('#bellBadge');
  bd.textContent = n > 99 ? '99+' : n; bd.classList.toggle('hidden', !n); bd.classList.toggle('pulse', n > 0);
  const v = { home: viewHome, base: viewBase, tasks: viewTasks, report: viewReport }[S.tab] || viewHome;
  $('#view').innerHTML = v();
  if (S.tab === 'report') loadReportCounts();
}

function alertItemHTML(b) {
  const p = productById(b.product_id), st = status(b.expiry_date);
  return `<div class="aitem ${st}">
    <div class="pimg clickable" data-act="openProduct" data-id="${p.id}">${imgHTML(p)}</div>
    <div class="grow clickable" data-act="openProduct" data-id="${p.id}">
      <div class="name ellipsis">${esc(p.name)}</div>
      <div class="muted small">${fmtDate(b.expiry_date)}${b.qty ? ` · ${b.qty} dona` : ''}</div>
    </div>
    <span class="badge ${st}">${daysLabel(b.expiry_date)}</span>
    <button class="icon-btn danger" data-act="delBatch" data-id="${b.id}" aria-label="O'chirish">${ICON.trash}</button>
  </div>`;
}
function taskHTML(t) {
  return `<div class="task ${isChecked(t.id) ? 'done' : ''}">
    <button class="check" data-act="toggleTask" data-id="${t.id}" aria-label="Belgilash">${ICON.check}</button>
    <div class="t clickable" data-act="toggleTask" data-id="${t.id}">${esc(t.title)}</div>
    ${S.tab === 'tasks' ? `<button class="icon-btn danger" data-act="delTask" data-id="${t.id}" aria-label="O'chirish">${ICON.trash}</button>` : ''}
  </div>`;
}
function progressHTML() {
  const total = S.tasks.length, done = S.tasks.filter(t => isChecked(t.id)).length;
  return `<div class="progress"><i style="width:${total ? Math.round(done / total * 100) : 0}%"></i></div>`;
}

function viewHome() {
  const al = alertList(), exp = al.filter(b => daysLeft(b.expiry_date) < 0).length;
  const done = S.tasks.filter(t => isChecked(t.id)).length;
  const stat = (n, l, c = '') => `<div class="stat glass ${c}"><b>${n}</b><span>${l}</span></div>`;
  return `
  <section class="hero glass">
    <div><div class="muted small">${todayLong()}</div><h1>Sut bo'limi</h1></div>
    <button class="btn primary big" data-act="scan">${ICON.scan} Skanerlash</button>
  </section>
  <section class="stats">
    ${stat(S.products.length, 'Mahsulot')}${stat(S.batches.length, 'Muddatlar')}${stat(al.length - exp, 'Muddati yaqin', 'warn')}${stat(exp, "Muddati o'tgan", 'expired')}
  </section>
  <div class="grid2">
    <section class="glass card">
      <div class="card-head"><h2>⚠️ Muddati yaqinlar</h2><span class="pill">${al.length}</span></div>
      ${al.length ? `<div class="list">${al.map(alertItemHTML).join('')}</div>` : emptyHTML("Hammasi joyida — muddati yaqin mahsulot yo'q ✅")}
    </section>
    <section class="glass card">
      <div class="card-head"><h2>✅ Bugungi ishlar</h2><span class="pill">${done}/${S.tasks.length}</span></div>
      ${S.tasks.length ? progressHTML() + `<div class="list">${S.tasks.map(taskHTML).join('')}</div>` : emptyHTML("Kunlik ishlar ro'yxati bo'sh")}
      <button class="btn ghost sm" style="margin-top:10px" data-act="tab" data-tab="tasks">Ishlar bo'limiga o'tish →</button>
    </section>
  </div>`;
}

function productItemHTML(p) {
  const bs = batchesOf(p.id);
  const chips = bs.slice(0, 4).map(b => `<span class="chip ${status(b.expiry_date)}">${fmtDate(b.expiry_date)}</span>`).join('') + (bs.length > 4 ? `<span class="chip">+${bs.length - 4}</span>` : '');
  return `<button class="pitem" data-act="openProduct" data-id="${p.id}">
    <div class="pimg">${imgHTML(p)}</div>
    <div class="grow"><div class="name ellipsis">${esc(p.name)}</div><div class="muted small mono ellipsis">${esc(p.barcode)}</div>
      <div class="chips">${chips || '<span class="chip">Muddat kiritilmagan</span>'}</div></div>
  </button>`;
}
function productListHTML() {
  const q = S.q.trim().toLowerCase(), w = warnDays();
  let list = S.products.map(p => ({ p, bs: batchesOf(p.id) }));
  if (q) list = list.filter(({ p }) => p.name.toLowerCase().includes(q) || p.barcode.includes(q));
  if (S.filter === 'near') list = list.filter(({ bs }) => bs.some(b => { const d = daysLeft(b.expiry_date); return d >= 0 && d <= w; }));
  if (S.filter === 'expired') list = list.filter(({ bs }) => bs.some(b => daysLeft(b.expiry_date) < 0));
  if (S.filter === 'none') list = list.filter(({ bs }) => !bs.length);
  list.sort((a, b) => (a.bs[0]?.expiry_date || '9999').localeCompare(b.bs[0]?.expiry_date || '9999') || a.p.name.localeCompare(b.p.name));
  if (!list.length) return emptyHTML(S.products.length ? 'Hech narsa topilmadi' : "Baza bo'sh. Birinchi mahsulotni skanerlang 📷");
  return list.map(({ p }) => productItemHTML(p)).join('');
}
function viewBase() {
  const f = [['all', 'Hammasi'], ['near', 'Muddati yaqin'], ['expired', "Muddati o'tgan"], ['none', 'Muddatsiz']];
  return `<section class="glass card">
    <div class="card-head"><h2>📦 Mahsulotlar bazasi</h2><span class="pill">${S.products.length}</span></div>
    <div class="search">${ICON.search}<input id="q" type="search" placeholder="Nom yoki shtrix-kod bo'yicha qidirish" value="${esc(S.q)}" autocomplete="off"></div>
    <div class="filters">${f.map(([k, l]) => `<button class="chip ${S.filter === k ? 'on' : ''}" data-act="filter" data-f="${k}">${l}</button>`).join('')}</div>
    <div id="plist" class="list">${productListHTML()}</div>
  </section>`;
}

function viewTasks() {
  const seg = `<div class="seg"><button class="${S.seg === 'daily' ? 'on' : ''}" data-act="seg" data-s="daily">Kunlik ishlar</button><button class="${S.seg === 'notes' ? 'on' : ''}" data-act="seg" data-s="notes">Muhim ishlar</button></div>`;
  if (S.seg === 'daily') {
    const done = S.tasks.filter(t => isChecked(t.id)).length;
    return `<section class="glass card">${seg}</section>
    <section class="glass card">
      <div class="card-head"><div><h2>Har kungi ishlar</h2><div class="muted small">${todayLong()} · har kuni avtomatik yangilanadi</div></div><span class="pill">${done}/${S.tasks.length}</span></div>
      ${S.tasks.length ? progressHTML() : ''}
      <div class="list">${S.tasks.length ? S.tasks.map(taskHTML).join('') : emptyHTML("Har kuni qilinadigan ishlarni qo'shing (masalan: «Muddatlarni tekshirish»)")}</div>
      <form data-form="addTask" class="inline-form" style="margin-top:12px"><input name="title" placeholder="Yangi kunlik ish..." maxlength="200" required><button class="btn primary" aria-label="Qo'shish">${ICON.plus}</button></form>
    </section>`;
  }
  const notes = [...S.notes].sort((a, b) => (a.done - b.done) || b.created_at.localeCompare(a.created_at));
  return `<section class="glass card">${seg}</section>
  <section class="glass card">
    <div class="card-head"><h2>📌 Muhim ishlar</h2><span class="pill">${S.notes.filter(n => !n.done).length}</span></div>
    <form data-form="addNote" class="form-box" style="margin-bottom:12px"><textarea name="text" placeholder="Muhim ish yoki eslatmani yozing..." maxlength="2000" required></textarea><button class="btn primary">${ICON.plus} Saqlash</button></form>
    <div class="list">${notes.length ? notes.map(n => `<div class="task ${n.done ? 'done' : ''}">
      <button class="check" data-act="toggleNote" data-id="${n.id}" aria-label="Bajarildi">${ICON.check}</button>
      <div class="t">${esc(n.text).replace(/\n/g, '<br>')}<div class="note-date">${fmtDT(n.created_at)}</div></div>
      <button class="icon-btn danger" data-act="delNote" data-id="${n.id}" aria-label="O'chirish">${ICON.trash}</button></div>`).join('') : emptyHTML("Hozircha muhim ishlar yo'q")}</div>
  </section>`;
}

function viewReport() {
  const d = S.repDate || todayStr();
  return `<section class="glass card">
    <div class="card-head"><h2>📊 Hisobotlar (Excel)</h2></div>
    <label>Sanani tanlang<input type="date" id="repDate" value="${d}" max="${todayStr()}"></label>
    <div class="rep-grid">
      <div class="stat"><b id="cAdded">…</b><span>Shu kuni qo'shilgan</span></div>
      <div class="stat expired"><b id="cDeleted">…</b><span>Shu kuni o'chirilgan</span></div>
    </div>
    <h3 style="margin-bottom:8px">Kunlik</h3>
    <div class="rep-btns">
      <button class="btn green" data-act="export" data-k="added">${ICON.download} Qo'shilganlar</button>
      <button class="btn green" data-act="export" data-k="deleted">${ICON.download} O'chirilganlar</button>
      <button class="btn green" data-act="export" data-k="day">${ICON.download} Kunlik to'liq hisobot</button>
    </div>
    <h3 style="margin:16px 0 8px">Haftalik va umumiy</h3>
    <div class="rep-btns">
      <button class="btn primary" data-act="export" data-k="week">${ICON.download} 7 kunlik hisobot<br><small class="muted">${fmtDate(addDays(d, -6))} – ${fmtDate(d)}</small></button>
      <button class="btn primary" data-act="export" data-k="base">${ICON.download} Joriy baza (hammasi)</button>
    </div>
    <p class="muted small" style="margin-top:14px">Barcha yozuvlar saqlanib boradi — istalgan kun yoki hafta uchun hisobotni qayta yuklab olish mumkin.</p>
  </section>`;
}
async function loadReportCounts() {
  const d = S.repDate || todayStr(), [f, t] = dayRange(d);
  const r = await safe(() => Promise.all([api.report('created_at', f, t), api.report('deleted_at', f, t)]));
  if (!r || S.tab !== 'report' || (S.repDate || todayStr()) !== d) return;
  $('#cAdded').textContent = r[0].length; $('#cDeleted').textContent = r[1].length;
}

/* ====================== Mahsulot oynalari ====================== */
function batchRowHTML(b) {
  const st = status(b.expiry_date);
  return `<div class="batch ${st}">
    <div class="grow"><div class="exp">${fmtDate(b.expiry_date)}</div>
      <div class="muted small">${b.prod_date ? 'Ishlab chiq.: ' + fmtDate(b.prod_date) : 'Kiritilgan: ' + fmtDT(b.created_at)}${b.qty ? ` · ${b.qty} dona` : ''}</div></div>
    <span class="badge ${st}">${daysLabel(b.expiry_date)}</span>
    <button class="icon-btn danger" data-act="delBatch" data-id="${b.id}" aria-label="O'chirish">${ICON.trash}</button>
  </div>`;
}
function dateFieldsHTML(p) {
  return `<div class="fgrid">
    <label>Ishlab chiqarilgan<input type="date" name="prod_date" data-calc></label>
    <label>Saqlash muddati (kun)<input type="number" name="shelf_days" min="1" max="3650" inputmode="numeric" placeholder="masalan 7" value="${p?.shelf_days || ''}" data-calc></label>
    <label class="full">Yaroqlilik muddati tugash sanasi *<input type="date" name="expiry_date" required></label>
    <label class="full">Miqdori (ixtiyoriy)<input type="number" name="qty" min="1" inputmode="numeric" placeholder="dona"></label>
    <div class="hint full">Ishlab chiqarilgan sana + saqlash kunini kiritsangiz, tugash sanasi o'zi hisoblanadi.</div>
  </div>`;
}
function productHTML(p) {
  const bs = batchesOf(p.id);
  return `<div class="sheet-head">
      <div class="pimg lg">${imgHTML(p)}</div>
      <div class="grow"><h2>${esc(p.name)}</h2><div class="muted small mono">${esc(p.barcode)}</div>${p.shelf_days ? `<div class="muted small">Saqlash muddati: ${p.shelf_days} kun</div>` : ''}</div>
      <button class="icon-btn soft" data-act="closeModal" aria-label="Yopish">${ICON.x}</button>
    </div>
    <form data-form="addBatch" data-pid="${p.id}" class="form-box">
      <h3>➕ Yangi muddat qo'shish</h3>
      ${dateFieldsHTML(p)}
      <button class="btn primary wide">Muddatni saqlash</button>
    </form>
    <div><h3 style="margin-bottom:8px">Saqlangan muddatlar (${bs.length})</h3>
      <div class="list">${bs.length ? bs.map(batchRowHTML).join('') : emptyHTML('Hali muddat kiritilmagan')}</div></div>
    <div class="row gap wrap">
      <button class="btn" data-act="scanNext">${ICON.scan} Keyingisini skanerlash</button>
      <button class="btn ghost" data-act="editProduct" data-id="${p.id}">${ICON.edit} Tahrirlash</button>
      <button class="btn danger ghost" data-act="delProduct" data-id="${p.id}">${ICON.trash} Mahsulotni o'chirish</button>
    </div>`;
}
function openProduct(id) {
  const p = productById(id); if (!p) return toast('Mahsulot topilmadi', 'err');
  openModal('product', productHTML(p), { id });
}
function refreshProductModal() {
  const p = productById(S.modal?.id);
  if (!p) return closeModal();
  const form = S.modal.wrap.querySelector('form[data-form=addBatch]');
  const keep = form ? Object.fromEntries(new FormData(form)) : null;
  setModalContent(productHTML(p));
  if (keep) { const f = S.modal.wrap.querySelector('form[data-form=addBatch]'); for (const [k, v] of Object.entries(keep)) if (f[k]) f[k].value = v; }
}

function photoPickHTML(p) {
  return `<div class="photo-pick">
    <div class="pimg" id="photoPrev">${imgHTML(p)}</div>
    <div class="row gap wrap">
      <label class="btn sm" style="color:#fff">${ICON.camera} Rasm olish<input type="file" accept="image/*" capture="environment" hidden data-photo></label>
      <label class="btn sm ghost" style="color:#fff">Galereyadan<input type="file" accept="image/*" hidden data-photo></label>
    </div></div>`;
}
function openNewProduct(code) {
  S.pendingImage = undefined;
  openModal('new', `<div class="sheet-head"><div class="grow"><h2>Yangi mahsulot</h2><div class="muted small">Bu shtrix-kod bazada yo'q — ma'lumotlarni kiriting</div></div>
      <button class="icon-btn soft" data-act="closeModal" aria-label="Yopish">${ICON.x}</button></div>
    <form data-form="newProduct" class="form-box">
      <label>Shtrix-kod<input name="barcode" value="${esc(code)}" inputmode="numeric" required></label>
      <label>Mahsulot nomi * <span id="offHint" class="hint"></span><input name="name" placeholder="masalan: Sut 3.2% 1L" maxlength="200" required></label>
      ${photoPickHTML(null)}
      ${dateFieldsHTML(null)}
      <button class="btn primary wide">Bazaga saqlash</button>
    </form>`);
  lookupOFF(code);
}
async function lookupOFF(code) {
  if (!/^\d{8,14}$/.test(code)) return;
  const hint = $('#offHint'); if (hint) hint.textContent = '(internetdan qidirilmoqda...)';
  try {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 5000);
    const r = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,product_name_uz,product_name_ru,brands,image_front_small_url`, { signal: ctl.signal });
    clearTimeout(tm);
    const j = await r.json(); const pr = j?.product || {};
    const f = S.modal?.wrap.querySelector('form[data-form=newProduct]'); if (!f || f.barcode.value !== code) return;
    const name = pr.product_name_uz || pr.product_name || pr.product_name_ru;
    if (name && !f.name.value) f.name.value = [pr.brands?.split(',')[0], name].filter(Boolean).join(' ').trim();
    if (pr.image_front_small_url && S.pendingImage === undefined) { S.pendingImage = pr.image_front_small_url; $('#photoPrev').innerHTML = `<img src="${esc(S.pendingImage)}" alt="">`; }
    if ($('#offHint')) $('#offHint').textContent = name ? '(internetdan topildi ✓)' : '';
  } catch { if ($('#offHint')) $('#offHint').textContent = ''; }
}
function openEditProduct(id) {
  const p = productById(id); if (!p) return;
  S.pendingImage = undefined;
  openModal('edit', `<div class="sheet-head"><h2 class="grow">Tahrirlash</h2><button class="icon-btn soft" data-act="openProduct" data-id="${p.id}" aria-label="Orqaga">${ICON.x}</button></div>
    <form data-form="editProduct" data-id="${p.id}" class="form-box">
      <label>Shtrix-kod<input name="barcode" value="${esc(p.barcode)}" inputmode="numeric" required></label>
      <label>Mahsulot nomi<input name="name" value="${esc(p.name)}" maxlength="200" required></label>
      <label>Saqlash muddati (kun)<input type="number" name="shelf_days" min="1" inputmode="numeric" value="${p.shelf_days || ''}"></label>
      ${photoPickHTML(p)}
      <button class="btn primary wide">Saqlash</button>
    </form>`, { id });
}
function compressImage(file, max = 480, q = 0.72) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL('image/jpeg', q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Rasmni o'qib bo'lmadi")); };
    img.src = url;
  });
}

/* ====================== Bildirishnomalar ====================== */
function alertsHTML() {
  const al = alertList();
  return `<div class="sheet-head"><div class="grow"><h2>🔔 Muddati yaqin mahsulotlar</h2><div class="muted small">${warnDays()} kun va undan kam qolganlar. O'chirmaguningizcha shu yerda turadi.</div></div>
      <button class="icon-btn soft" data-act="closeModal" aria-label="Yopish">${ICON.x}</button></div>
    <div class="list">${al.length ? al.map(alertItemHTML).join('') : emptyHTML("Muddati yaqin mahsulot yo'q ✅")}</div>
    <button class="btn wide" data-act="closeModal">Tushunarli</button>`;
}
function openAlerts() { S.lastAlertAt = Date.now(); openModal('alerts', alertsHTML()); }

/* ====================== Skaner ====================== */
let scanner = null, scanDone = false;
function openScanner() {
  scanDone = false;
  openModal('scanner', `<div class="sheet-head"><h2 class="grow">📷 Shtrix-kodni skanerlash</h2><button class="icon-btn soft" data-act="closeModal" aria-label="Yopish">${ICON.x}</button></div>
    <div id="reader" class="reader"></div>
    <div id="scanMsg" class="muted small center">Kamerani shtrix-kodga yaqin tuting</div>
    <form data-form="manualCode" class="inline-form"><input name="code" inputmode="numeric" placeholder="yoki kodni qo'lda kiriting" autocomplete="off" required><button class="btn primary">Topish</button></form>`,
    { onClose: stopScanner });
  startScanner();
}
async function startScanner() {
  const msg = t => { const m = $('#scanMsg'); if (m) m.textContent = t; };
  if (!window.Html5Qrcode) return msg("Skaner yuklanmadi. Kodni qo'lda kiriting.");
  const F = window.Html5QrcodeSupportedFormats;
  const s = new Html5Qrcode('reader', { verbose: false, formatsToSupport: [F.EAN_13, F.EAN_8, F.UPC_A, F.UPC_E, F.CODE_128, F.CODE_39, F.ITF, F.QR_CODE], experimentalFeatures: { useBarCodeDetectorIfSupported: true } });
  scanner = s;
  try {
    await s.start({ facingMode: 'environment' },
      { fps: 12, qrbox: (w, h) => ({ width: Math.max(120, Math.floor(Math.min(w * 0.88, 380))), height: Math.max(80, Math.floor(Math.min(h * 0.55, 190))) }) },
      code => { if (scanDone) return; scanDone = true; navigator.vibrate?.(70); handleCode(code); }, () => {});
    if (scanner !== s) { await s.stop().catch(() => {}); }
  } catch (e) {
    console.warn(e);
    msg(location.protocol === 'https:' || location.hostname === 'localhost' ? "Kamera ochilmadi. Brauzerda kameraga ruxsat bering yoki kodni qo'lda kiriting." : "Kamera faqat https:// saytda ishlaydi. Kodni qo'lda kiriting.");
  }
}
async function stopScanner() {
  const s = scanner; scanner = null; if (!s) return;
  try { if (s.isScanning) await s.stop(); s.clear(); } catch {}
}
async function handleCode(raw) {
  const code = String(raw).trim().replace(/\s+/g, ''); if (!code) return;
  await stopScanner();
  const p = S.products.find(x => x.barcode === code);
  if (p) { openProduct(p.id); toast('Mahsulot topildi — yangi muddat kiriting'); setTimeout(() => S.modal?.wrap.querySelector('[name=prod_date]')?.focus({ preventScroll: true }), 300); }
  else openNewProduct(code);
}

/* ====================== Excel ====================== */
const H_BATCH = ['№', 'Shtrix-kod', 'Mahsulot nomi', 'Ishlab chiqarilgan', 'Yaroqlilik muddati', 'Qolgan kun', 'Miqdor', "Qo'shilgan vaqti"];
const W_BATCH = [5, 16, 34, 18, 18, 18, 9, 18, 18];
function rowsOf(list, last) {
  return list.map((b, i) => {
    const p = b.products || productById(b.product_id) || {};
    return [i + 1, p.barcode || '', p.name || '', fmtDate(b.prod_date), fmtDate(b.expiry_date), daysLabel(b.expiry_date), b.qty ?? '', fmtDT(b.created_at), last(b)];
  });
}
function makeSheet(title, headers, rows, widths) {
  const X = window.XLSX;
  const ws = X.utils.aoa_to_sheet([[title], [`Yuklab olingan: ${fmtDT(new Date().toISOString())}  ·  Jami: ${rows.length} ta`], [], headers, ...(rows.length ? rows : [['', "Ma'lumot yo'q"]])]);
  ws['!cols'] = widths.map(w => ({ wch: w }));
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }];
  if (rows.length) ws['!autofilter'] = { ref: X.utils.encode_range({ s: { r: 3, c: 0 }, e: { r: 3 + rows.length, c: headers.length - 1 } }) };
  return ws;
}
const addedSheet = (list, title) => makeSheet(title, [...H_BATCH, 'Hozirgi holati'], rowsOf(list, b => b.deleted_at ? "O'chirilgan" : 'Bazada'), W_BATCH);
const deletedSheet = (list, title) => makeSheet(title, [...H_BATCH, "O'chirilgan vaqti"], rowsOf(list, b => fmtDT(b.deleted_at)), W_BATCH);
function baseSheets(wb) {
  const X = window.XLSX;
  const all = [...S.batches].filter(b => productById(b.product_id)).sort((a, b) => a.expiry_date.localeCompare(b.expiry_date));
  X.utils.book_append_sheet(wb, addedSheet(all, `Joriy baza — barcha muddatlar (${fmtDate(todayStr())})`), 'Joriy baza');
  X.utils.book_append_sheet(wb, addedSheet(alertList(), `Muddati yaqin va o'tganlar (${warnDays()} kun)`), 'Muddati yaqin');
  const prows = [...S.products].sort((a, b) => a.name.localeCompare(b.name)).map((p, i) => {
    const bs = batchesOf(p.id);
    return [i + 1, p.barcode, p.name, p.shelf_days || '', bs.length, bs[0] ? fmtDate(bs[0].expiry_date) : '—', fmtDT(p.created_at)];
  });
  X.utils.book_append_sheet(wb, makeSheet("Mahsulotlar ro'yxati", ['№', 'Shtrix-kod', 'Mahsulot nomi', 'Saqlash (kun)', 'Muddatlar soni', 'Eng yaqin muddat', "Bazaga qo'shilgan"], prows, [5, 16, 34, 13, 14, 17, 18]), 'Mahsulotlar');
}
async function exportExcel(kind) {
  if (!window.XLSX) return toast('Excel kutubxonasi yuklanmadi', 'err');
  const X = window.XLSX, d = S.repDate || todayStr(), wb = X.utils.book_new();
  loading(true);
  try {
    let name;
    if (kind === 'base') { baseSheets(wb); name = `Joriy_baza_${d}.xlsx`; }
    else if (kind === 'week') {
      const from = addDays(d, -6), [f] = dayRange(from), [, t] = dayRange(d);
      const [add, del] = await Promise.all([api.report('created_at', f, t), api.report('deleted_at', f, t)]);
      const days = []; for (let i = 0; i < 7; i++) {
        const day = addDays(from, i), [a, b] = dayRange(day);
        days.push([i + 1, fmtDate(day), WEEKDAYS[parseYmd(day).getDay()], add.filter(x => x.created_at >= a && x.created_at < b).length, del.filter(x => x.deleted_at >= a && x.deleted_at < b).length]);
      }
      X.utils.book_append_sheet(wb, makeSheet(`Haftalik xulosa: ${fmtDate(from)} – ${fmtDate(d)}`, ['№', 'Sana', 'Hafta kuni', "Qo'shilgan", "O'chirilgan"], days, [5, 14, 14, 13, 13]), 'Xulosa');
      X.utils.book_append_sheet(wb, addedSheet(add, `Qo'shilganlar: ${fmtDate(from)} – ${fmtDate(d)}`), "Qo'shilganlar");
      X.utils.book_append_sheet(wb, deletedSheet(del, `O'chirilganlar: ${fmtDate(from)} – ${fmtDate(d)}`), "O'chirilganlar");
      baseSheets(wb);
      name = `Haftalik_hisobot_${from}_${d}.xlsx`;
    } else {
      const [f, t] = dayRange(d);
      if (kind !== 'deleted') X.utils.book_append_sheet(wb, addedSheet(await api.report('created_at', f, t), `${fmtDate(d)} kuni qo'shilgan mahsulotlar`), "Qo'shilganlar");
      if (kind !== 'added') X.utils.book_append_sheet(wb, deletedSheet(await api.report('deleted_at', f, t), `${fmtDate(d)} kuni o'chirilgan mahsulotlar`), "O'chirilganlar");
      name = { added: `Qoshilganlar_${d}.xlsx`, deleted: `Ochirilganlar_${d}.xlsx`, day: `Kunlik_hisobot_${d}.xlsx` }[kind];
    }
    X.writeFile(wb, name, { compression: true });
    toast('Excel fayl yuklab olindi ✓');
  } catch (e) { console.error(e); toast(errMsg(e), 'err'); }
  loading(false);
}

/* ====================== Sozlamalar ====================== */
function openSettings() {
  openModal('settings', `<div class="sheet-head"><h2 class="grow">⚙️ Sozlamalar</h2><button class="icon-btn soft" data-act="closeModal" aria-label="Yopish">${ICON.x}</button></div>
    <form data-form="settings" class="form-box">
      <label>Necha kun qolganda ogohlantirsin?<input type="number" name="warn_days" min="0" max="60" inputmode="numeric" value="${warnDays()}" required></label>
      <button class="btn primary wide">Saqlash</button>
    </form>
    <div class="form-box">
      <div class="muted small">${demo ? "Demo rejim (ma'lumotlar faqat shu brauzerda)" : 'Hisob: ' + esc(user?.email || '')}</div>
      <button class="btn wide" data-act="refresh">${ICON.refresh} Ma'lumotlarni yangilash</button>
      ${demo ? `<button class="btn danger wide" data-act="resetDemo">${ICON.trash} Demo ma'lumotlarni tozalash</button>` : `<button class="btn danger wide" data-act="logout">${ICON.logout} Chiqish</button>`}
    </div>`);
}

/* ====================== Hodisalar ====================== */
const actions = {
  tab: el => { S.tab = el.dataset.tab; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
  scan: () => openScanner(),
  scanNext: () => openScanner(),
  bell: () => openAlerts(),
  settings: () => openSettings(),
  closeModal: () => closeModal(),
  openProduct: el => openProduct(el.dataset.id),
  editProduct: el => openEditProduct(el.dataset.id),
  filter: el => { S.filter = el.dataset.f; render(); },
  seg: el => { S.seg = el.dataset.s; render(); },
  export: el => exportExcel(el.dataset.k),
  async delBatch(el) {
    const b = S.batches.find(x => x.id === el.dataset.id); if (!b) return;
    const p = productById(b.product_id);
    if (!await confirmBox(`«${p?.name || ''}» — ${fmtDate(b.expiry_date)} muddatini o'chirasizmi?`)) return;
    await safe(async () => {
      await api.update('batches', b.id, { deleted_at: new Date().toISOString() });
      S.batches = S.batches.filter(x => x.id !== b.id);
      toast("O'chirildi ✓"); render();
      if (S.modal?.type === 'product') refreshProductModal();
      else if (S.modal?.type === 'alerts') setModalContent(alertsHTML());
    });
  },
  async delProduct(el) {
    const p = productById(el.dataset.id); if (!p) return;
    const n = batchesOf(p.id).length;
    if (!await confirmBox(`«${p.name}» mahsulotini${n ? ` va uning ${n} ta muddatini` : ''} o'chirasizmi?`)) return;
    await safe(async () => {
      await api.softDeleteProduct(p.id, new Date().toISOString());
      S.products = S.products.filter(x => x.id !== p.id); S.batches = S.batches.filter(x => x.product_id !== p.id);
      closeModal(); toast("Mahsulot o'chirildi ✓"); render();
    });
  },
  async toggleTask(el) {
    const id = el.dataset.id, day = todayStr();
    const was = isChecked(id);
    S.checks = was ? S.checks.filter(c => c.task_id !== id) : [...S.checks, { task_id: id, day }];
    render();
    try { if (was) await api.remove('task_checks', { task_id: id, day }); else await api.insert('task_checks', { task_id: id, day }); }
    catch (e) { if (e?.code !== '23505') { S.checks = was ? [...S.checks, { task_id: id, day }] : S.checks.filter(c => c.task_id !== id); render(); toast(errMsg(e), 'err'); } }
  },
  async delTask(el) {
    const t = S.tasks.find(x => x.id === el.dataset.id); if (!t) return;
    if (!await confirmBox(`«${t.title}» ishini ro'yxatdan o'chirasizmi?`)) return;
    await safe(async () => { await api.remove('tasks', { id: t.id }); S.tasks = S.tasks.filter(x => x.id !== t.id); S.checks = S.checks.filter(c => c.task_id !== t.id); render(); });
  },
  async toggleNote(el) {
    const n = S.notes.find(x => x.id === el.dataset.id); if (!n) return;
    await safe(async () => { Object.assign(n, await api.update('notes', n.id, { done: !n.done })); render(); });
  },
  async delNote(el) {
    if (!await confirmBox("Bu yozuvni o'chirasizmi?")) return;
    await safe(async () => { await api.remove('notes', { id: el.dataset.id }); S.notes = S.notes.filter(x => x.id !== el.dataset.id); render(); });
  },
  async refresh() { closeModal(); loading(true); await safe(reload); loading(false); render(); toast('Yangilandi ✓'); },
  async logout() { if (await confirmBox('Hisobdan chiqasizmi?', 'Chiqish')) { closeModal(); await sb.auth.signOut(); } },
  async resetDemo() { if (await confirmBox("Barcha demo ma'lumotlar o'chadi. Davom etasizmi?")) { api.reset(); closeModal(); await reload(); render(); } },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  e.preventDefault();
  actions[el.dataset.act]?.(el, e);
});

async function withBusy(f, fn) {
  const btn = f.querySelector('button:not([type=button])'); if (btn?.disabled) return;
  if (btn) btn.disabled = true;
  try { await fn(); } catch (e) { console.error(e); toast(errMsg(e), 'err'); }
  finally { if (btn && btn.isConnected) btn.disabled = false; }
}
function readDates(f) {
  const prod = f.prod_date.value || null, exp = f.expiry_date.value;
  let shelf = toInt(f.shelf_days.value);
  if (!exp) throw new Error('Yaroqlilik muddati tugash sanasini kiriting');
  if (prod && exp < prod) throw new Error("Tugash sanasi ishlab chiqarilgan sanadan oldin bo'lishi mumkin emas");
  if (!shelf && prod) shelf = diffDays(exp, prod) || null;
  return { prod_date: prod, expiry_date: exp, qty: toInt(f.qty.value), shelf };
}
const forms = {
  manualCode: f => handleCode(f.code.value),
  async newProduct(f) {
    const code = f.barcode.value.trim(), name = f.name.value.trim();
    if (!code || !name) return toast('Shtrix-kod va nomni kiriting', 'err');
    const ex = S.products.find(p => p.barcode === code);
    if (ex) { toast('Bu mahsulot bazada bor'); return openProduct(ex.id); }
    const d = readDates(f);
    const prod = await api.insert('products', { barcode: code, name, image: S.pendingImage || null, shelf_days: d.shelf });
    S.products.push(prod);
    const b = await api.insert('batches', { product_id: prod.id, prod_date: d.prod_date, expiry_date: d.expiry_date, qty: d.qty });
    S.batches.push(b); S.pendingImage = undefined;
    render(); openProduct(prod.id); toast('Bazaga saqlandi ✓');
  },
  async addBatch(f) {
    const p = productById(f.dataset.pid); if (!p) return;
    const d = readDates(f);
    if (batchesOf(p.id).some(b => b.expiry_date === d.expiry_date) && !await confirmBox(`${fmtDate(d.expiry_date)} sanasi bu mahsulotda allaqachon bor. Baribir qo'shilsinmi?`, "Qo'shish", false)) return;
    const b = await api.insert('batches', { product_id: p.id, prod_date: d.prod_date, expiry_date: d.expiry_date, qty: d.qty });
    S.batches.push(b);
    if (d.shelf && !p.shelf_days) Object.assign(p, await api.update('products', p.id, { shelf_days: d.shelf }));
    render(); setModalContent(productHTML(p)); toast("Yangi muddat qo'shildi ✓");
  },
  async editProduct(f) {
    const p = productById(f.dataset.id); if (!p) return;
    const code = f.barcode.value.trim();
    if (S.products.some(x => x.id !== p.id && x.barcode === code)) throw new Error('Bu shtrix-kod boshqa mahsulotda bor');
    const patch = { barcode: code, name: f.name.value.trim(), shelf_days: toInt(f.shelf_days.value) };
    if (S.pendingImage !== undefined) patch.image = S.pendingImage;
    Object.assign(p, await api.update('products', p.id, patch)); S.pendingImage = undefined;
    render(); openProduct(p.id); toast('Saqlandi ✓');
  },
  async addTask(f) {
    const title = f.title.value.trim(); if (!title) return;
    const pos = S.tasks.reduce((m, t) => Math.max(m, t.position || 0), 0) + 1;
    S.tasks.push(await api.insert('tasks', { title, position: pos })); render();
    $('form[data-form=addTask] input')?.focus();
  },
  async addNote(f) {
    const text = f.text.value.trim(); if (!text) return;
    S.notes.unshift(await api.insert('notes', { text })); render(); toast('Saqlandi ✓');
  },
  async settings(f) {
    const w = Math.max(0, Math.min(60, parseInt(f.warn_days.value, 10) || 0));
    S.settings = await api.saveSettings({ warn_days: w }); closeModal(); render(); toast('Saqlandi ✓');
  },
};
document.addEventListener('submit', e => {
  const f = e.target, fn = forms[f.dataset.form]; if (!fn) return;
  e.preventDefault(); withBusy(f, () => fn(f));
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') { S.q = t.value; const l = $('#plist'); if (l) l.innerHTML = productListHTML(); return; }
  if (t.matches('[data-calc]')) {
    const f = t.form, prod = f.prod_date.value, days = toInt(f.shelf_days.value);
    if (prod && days) f.expiry_date.value = addDays(prod, days);
  }
});
document.addEventListener('change', async e => {
  const t = e.target;
  if (t.id === 'repDate') { S.repDate = t.value || todayStr(); render(); return; }
  if (t.matches('[data-photo]') && t.files?.[0]) {
    await safe(async () => { S.pendingImage = await compressImage(t.files[0]); $('#photoPrev').innerHTML = `<img src="${S.pendingImage}" alt="">`; });
    t.value = '';
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && S.modal && !$('#confirmRoot').children.length) closeModal(); });

init().catch(e => { console.error(e); loading(false); toast(errMsg(e), 'err'); });
