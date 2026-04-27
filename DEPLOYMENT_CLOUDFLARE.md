# Panduan Deployment Cloudflare Pages

Ikuti langkah-langkah di bawah ini untuk mendeploy admin dashboard SDIT Fajar ke Cloudflare Pages.

## 1. Commit dan Push ke GitHub
Lakukan commit semua perubahan dan push ke repository GitHub:
```bash
git add .
git commit -m "feat: setup cloudflare pages deployment with edge runtime auth"
git push origin main
```

## 2. Hubungkan ke Cloudflare Pages
1. Login ke Dashboard Cloudflare.
2. Buka menu **Workers & Pages**.
3. Klik tombol **Create application**, lalu pilih tab **Pages** dan klik **Connect to Git**.
4. Pilih repository GitHub proyek ini.
5. Pada bagian "Set up builds and deployments":
   - **Framework preset**: Pilih `Next.js`
   - **Build command**: Akan otomatis terisi `npx @cloudflare/next-on-pages`
   - **Build output directory**: Akan otomatis terisi `.vercel/output/static`

## 3. Environment Variables (Sangat Penting!)
Agar aplikasi bisa berjalan, Anda **WAJIB** memasukkan semua variabel environment Firebase ke settings deployment Cloudflare Pages sebelum menyimpan konfigurasi.

Tambahkan key-value berikut di bagian **Environment variables**:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `COOKIE_SECRET` (Buat string acak, contoh: `super-secret-key-untuk-cookie-session-123456`)

*(Nilai-nilainya ambil dari file `.env.local` yang ada di komputer Anda. Khusus untuk `FIREBASE_PRIVATE_KEY`, copy secara penuh termasuk `-----BEGIN PRIVATE KEY-----...`)*

## 4. Compatibility Flags
Agar runtime Edge kompatibel dengan modul Node.js, pastikan untuk mengaktifkan flag compatibility `nodejs_compat`. (Sebenarnya sudah diset via `wrangler.toml`, tetapi bisa diverifikasi di dashboard Cloudflare).
- Buka **Settings** -> **Functions** -> **Compatibility flags**.
- Tambahkan `nodejs_compat`.

## 5. Deploy
Klik **Save and Deploy**. Cloudflare akan secara otomatis membangun (build) aplikasi Anda menggunakan `@cloudflare/next-on-pages` dan mempublikasikannya. Setiap kali Anda push ke branch `main`, Cloudflare akan otomatis mendeploy versi terbarunya.
