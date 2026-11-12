# Sut bo'limi: mahsulotlar va muddatlar bazasi

Shtrix-kod skaneri, muddat ogohlantirishlari, kunlik ishlar, muhim ishlar va Excel hisobotlar.
Ma'lumotlar Supabase'da saqlanadi (telefon va kompyuterda bir xil). Sayt GitHub Pages'da tekin turadi.

## 1. Supabase (tekin ma'lumotlar bazasi), taxminan 10 daqiqa
1. https://supabase.com saytiga kiring va **Start your project** bosing (GitHub orqali kirsa bo'ladi).
2. **New project** bosing: nom bering (masalan `sut-bazasi`), parol o'ylab toping, Region: **Frankfurt (eu-central-1)**. So'ng **Create**.
3. Chap menyuda **SQL Editor** bo'limini oching. `supabase.sql` faylining hammasini nusxalab joylang va **Run** bosing. "Success" chiqishi kerak.
4. **Authentication → Users → Add user → Create new user**: email va parolingizni yozing, **Auto Confirm User** belgilang.
5. **Authentication → Sign In / Providers** (yoki Settings) bo'limida **Allow new users to sign up** ni **o'chiring**. Shunda saytdan faqat siz kira olasiz.
6. **Project Settings → API** (yoki **API Keys**) bo'limidan ikkita narsani nusxalang:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public** yoki **publishable** kalit
7. `config.js` faylini oching va ikkalasini qo'shtirnoq ichiga yozing.

## 2. GitHub Pages (tekin hosting), taxminan 5 daqiqa
1. GitHub'da **New repository** oching, nomi masalan `sut-bazasi`, **Public**, so'ng **Create**.
2. **uploading an existing file** havolasini bosing va papkadagi barcha fayllarni (shu jumladan `lib` papkasini) sudrab tashlang. So'ng **Commit changes**.
3. **Settings → Pages → Branch: main / (root) → Save**.
4. 1–2 daqiqadan keyin sayt shu manzilda ochiladi: `https://FOYDALANUVCHI-NOMI.github.io/sut-bazasi/`

## 3. Telefonga o'rnatish
- **iPhone (Safari):** Ulashish tugmasi → **Ekranga qo'shish (Add to Home Screen)**
- **Android (Chrome):** ⋮ menyu → **Bosh ekranga qo'shish / Ilovani o'rnatish**

## Eslatmalar
- Kamera faqat `https://` manzilda ishlaydi (GitHub Pages shunday). Birinchi marta kameraga ruxsat bering.
- `config.js` dagi kalit ochiq bo'lishi xavfsiz: ma'lumotlarni faqat sizning email/parolingiz bilan ko'rish mumkin.
- Supabase'ning tekin loyihasi **1 hafta umuman ishlatilmasa** uxlab qoladi. Shunda supabase.com dagi **Restore** tugmasini bosish kifoya, ma'lumotlar o'chmaydi.
- `config.js` bo'sh bo'lsa, sayt **demo rejimda** ishlaydi (ma'lumotlar faqat o'sha brauzerda saqlanadi).
