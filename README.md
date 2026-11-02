# PertoFolious — Portfolio Putu Satya Krisnaputra

Website portofolio pribadi, dibangun dengan **React + TypeScript + Tailwind CSS + Vite**,
dan di-deploy otomatis ke **GitHub Pages**.

🌐 Live: https://krisnaputraaa.github.io/PertoFolious/

---

## 🚀 Menjalankan di komputer sendiri

Prasyarat: [Node.js](https://nodejs.org) versi 20+ dan Git.

```bash
git clone https://github.com/KrisnaPutraaa/PertoFolious.git
cd PertoFolious
npm install      # pasang semua library (sekali saja)
npm run dev      # jalankan server lokal → buka http://localhost:5173/PertoFolious/
```

Perintah lain:

| Perintah          | Fungsi                                             |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Mode pengembangan — perubahan langsung terlihat     |
| `npm run build`   | Membuat versi final (siap online) ke folder `dist/` |
| `npm run preview` | Melihat hasil build secara lokal                   |

## 📁 Struktur folder

```
PertoFolious/
├── index.html                 ← kerangka HTML, font, judul tab
├── public/                    ← file statis (favicon, cv.pdf)
├── src/
│   ├── data/portfolio.ts      ← ⭐ SEMUA ISI WEBSITE (edit di sini!)
│   ├── components/            ← potongan tampilan (Navbar, Hero, Projects, ...)
│   ├── App.tsx                ← menyusun urutan section
│   ├── main.tsx               ← titik awal React
│   └── index.css              ← warna tema & animasi
├── vite.config.ts             ← konfigurasi build
└── .github/workflows/deploy.yml ← deploy otomatis ke GitHub Pages
```

**Mau ganti isi?** Edit `src/data/portfolio.ts` (tambah proyek, ubah teks, dll.).
**Mau ganti warna?** Edit variabel `--accent`, `--bg`, dst. di `src/index.css`.

## 🌍 Cara membuat website bisa diakses orang (sekali setup)

1. Buka repo di GitHub → **Settings** → **Pages**.
2. Di **Build and deployment → Source**, pilih **GitHub Actions**.
3. Merge perubahan ke branch `main`. Tab **Actions** akan menjalankan deploy.
4. Setelah selesai (±1–2 menit), website online di
   `https://krisnaputraaa.github.io/PertoFolious/`.

Setiap push ke `main` berikutnya akan otomatis memperbarui website.

---

## 🗺️ Roadmap belajar (Frontend → Backend)

Proyek ini sengaja dibuat bertahap supaya bisa sekalian belajar ulang:

- [x] **Tahap 1 — Frontend dasar**: React component, props, data terpisah, Tailwind CSS.
- [x] **Tahap 2 — Interaktivitas**: state (`useState`), efek (`useEffect`), tema gelap/terang, animasi scroll.
- [x] **Tahap 3 — Deploy**: build dengan Vite, CI/CD dengan GitHub Actions, hosting di GitHub Pages.
- [ ] **Tahap 4 — Backend**: API kecil dengan **FastAPI** (contoh: form kontak yang menyimpan pesan / mengirim notifikasi).
- [ ] **Tahap 5 — Database**: simpan pesan kontak di database (SQLite/PostgreSQL).
- [ ] **Tahap 6 — Hubungkan**: frontend memanggil API backend (`fetch`), deploy backend (Render/Railway).
- [ ] **Tahap 7 — Kualitas**: test dengan Vitest & pytest, dijalankan otomatis di GitHub Actions.
- [ ] **Bonus**: custom domain (mis. `krisnaputra.dev`), SEO, analytics.
