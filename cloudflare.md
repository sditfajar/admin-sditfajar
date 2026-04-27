# Task: Migrasi Deployment Next.js ke Cloudflare Pages

Proyek ini menggunakan Next.js (App Router), Firebase Auth, dan Firestore. Tolong siapkan proyek ini agar siap di-deploy ke Cloudflare Pages. Lakukan langkah-langkah berikut:

## 1. Setup & Instalasi Dependencies
- Jalankan perintah: `npm install -D @cloudflare/next-on-pages wrangler`
- Pastikan semua dependensi terinstal dengan baik.

## 2. Update `package.json`
Tambahkan script berikut di bagian `"scripts"` agar Cloudflare bisa mem-build Next.js dengan benar:
- `"pages:build": "npx @cloudflare/next-on-pages"`
- `"preview": "npm run pages:build && wrangler pages dev .vercel/output/static"`

## 3. Penyesuaian Edge Runtime (Sangat Penting)
Karena Cloudflare Pages menggunakan **Edge Workers**, Node.js standar (seperti `fs`, `path`, atau library backend tertentu) tidak akan berfungsi.
- Tolong periksa semua file API di dalam folder `app/api/` dan file `middleware.ts`.
- Tambahkan `export const runtime = 'edge';` di setiap file API / layout yang berjalan di server.
- Pastikan inisialisasi Firebase Admin (jika ada) sudah dikonfigurasi agar kompatibel dengan Edge Runtime (atau gunakan Firebase Client/REST API sebagai alternatif jika Firebase Admin gagal di Edge).

## 4. Buat File `.gitignore` & `wrangler.toml`
- Pastikan folder `.wrangler` dan `.vercel` masuk ke dalam `.gitignore`.
- Buat file `wrangler.toml` dasar di root directory dengan nama project `sdit-fajar-lms`, compatibility date terbaru, dan compatibility flag untuk `nodejs_compat`.

## 5. Panduan Deployment
Buat file `DEPLOYMENT_CLOUDFLARE.md` yang berisi panduan singkat untuk saya:
1. Cara commit dan push kode ke GitHub.
2. Cara menghubungkan repository GitHub ke Dashboard Cloudflare Pages (pilih framework Next.js).
3. Daftar **Environment Variables (.env)** apa saja dari Firebase yang wajib saya masukkan ke settings Cloudflare Pages nanti.