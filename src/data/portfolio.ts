// ============================================================
//  SEMUA ISI WEBSITE ADA DI FILE INI.
//  - `profile`  : data yang sama di semua bahasa (nama, kontak, link)
//  - `content`  : teks per bahasa → `en` (English) dan `id` (Indonesia)
//  Ingin mengubah teks? Ubah di KEDUA bahasa supaya tetap sinkron.
// ============================================================

export type Lang = 'en' | 'id'

export const profile = {
  name: 'Putu Satya Krisnaputra',
  shortName: 'Krisna',
  email: 'krisnaaa.putra2004@gmail.com',
  // Nomor WhatsApp format internasional (62 = Indonesia, tanpa 0 di depan)
  whatsapp: '6287851970064',
  links: {
    github: 'https://github.com/krizpakez-beep',
    linkedin: 'https://linkedin.com/in/krisnaaaputra',
  },
  // File di folder `public/`
  cvFile: 'cv.pdf',
  photo: { real: 'photos/real.jpg', blocky: 'photos/steve.jpg' },
}

// Ikon pixel yang tersedia (lihat src/components/PixelIcon.tsx)
export type IconName = 'chart' | 'heart' | 'window' | 'bot' | 'trophy' | 'scroll' | 'database' | 'check' | 'pickaxe' | 'star'

export type Project = {
  title: string
  subtitle: string
  year: string
  icon: IconName
  description: string
  highlights: string[]
  tech: string[]
  link?: string
  private?: boolean
  featured?: boolean
}

export type Content = {
  nav: { about: string; experience: string; projects: string; research: string; skills: string; contact: string; cta: string }
  hero: { status: string; role: string; tagline: string; primary: string; secondary: string; scroll: string }
  about: { label: string; title: string; titleMuted: string; paragraphs: string[]; photoHintMouse: string; photoHintTouch: string; photoAlt: string }
  stats: { value: string; label: string }[]
  education: { label: string; school: string; degree: string; period: string }
  experience: { label: string; title: string; items: { role: string; company: string; period: string; points: string[] }[] }
  projects: { label: string; title: string; subtitle: string; privateRepo: string; items: Project[] }
  research: { label: string; title: string; status: string; authors: string; paperTitle: string; summary: string }
  skills: { label: string; title: string; subtitle: string; groups: { name: string; icon: IconName; items: string[] }[]; achievementsTitle: string; achievementTag: string }
  certifications: { name: string; issuer: string; year?: string }[]
  contact: { label: string; title: string; titleMuted: string; text: string; email: string; copied: string }
}

// ---------- data yang tidak perlu diterjemahkan ----------
const tech = {
  crypto: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Gemini'],
  cardio: ['PySpark', 'Spark MLlib', 'Pandas', 'Matplotlib'],
  fullstack: ['Java', 'Spring Boot', 'React', 'MySQL'],
  bot: ['Python', 'Telegram Bot API', 'IoT'],
  hof: ['HTML', 'CSS', 'GitHub Flow'],
}
const skillItems = {
  languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'SQL', 'HTML/CSS'],
  backend: ['Spring Boot', 'FastAPI', 'Apache Spark', 'Spark MLlib', 'MySQL', 'Pandas'],
  frontend: ['React.js', 'Tailwind CSS', 'REST API'],
  tools: ['Git & GitHub', 'Google Colab', 'Jupyter', 'Figma', 'Postman'],
}
const certifications = [
  { name: 'IBM Big Data 101', issuer: 'Cognitive Class', year: '2026' },
  { name: 'Full-Stack Web Development', issuer: 'Udemy' },
  { name: 'Figma UI/UX Design Essentials', issuer: 'Udemy' },
  { name: 'Fundamentals of Digital Marketing', issuer: 'Google' },
  { name: 'Entrepreneurship International', issuer: 'Tel-U Career' },
]
const paperTitle =
  'Multimodal Cyberbullying Detection on Platform X Using VGG16 Features and Hybrid CNN-BiLSTM with GloVe Feature Expansion'

// ======================= ENGLISH =======================
const en: Content = {
  nav: { about: 'About', experience: 'Experience', projects: 'Projects', research: 'Research', skills: 'Skills', contact: 'Contact', cta: 'Let’s talk' },
  hero: {
    status: 'Open to opportunities · Indonesia',
    role: 'Full-Stack Developer & QA Engineer',
    tagline: 'Final-year Informatics student at Telkom University — building reliable software from backend to pixel, and testing it until it holds.',
    primary: 'View my work',
    secondary: 'Download CV',
    scroll: 'Scroll',
  },
  about: {
    label: '01 · About',
    title: 'Quality-minded engineer,',
    titleMuted: 'curious builder.',
    paragraphs: [
      'I am a final-year Informatics student at Telkom University with internship experience in Service Quality Assurance at Telkomsel.',
      'I work hands-on across the whole software development life cycle — functional and non-functional testing, full-stack development with Spring Boot, React and FastAPI, and large-scale data processing with Apache Spark.',
    ],
    photoHintMouse: 'Move your cursor over the photo',
    photoHintTouch: 'Touch & drag the photo',
    photoAlt: 'Photo of Putu Satya Krisnaputra',
  },
  stats: [
    { value: '5', label: 'Projects built' },
    { value: '70K', label: 'Records processed' },
    { value: '84.46%', label: 'Paper model accuracy' },
  ],
  education: { label: 'Education', school: 'Telkom University', degree: 'Bachelor of Informatics', period: '2022 – Present' },
  experience: {
    label: '02 · Experience',
    title: 'Where I’ve worked.',
    items: [
      {
        role: 'Service Quality Assurance Intern',
        company: 'Telkomsel',
        period: '2025',
        points: [
          'Executed functional and non-functional testing on digital applications and IT services, validating behaviour against technical and business requirements.',
          'Supported QA activities across the SDLC, from requirement review through release verification.',
          'Partnered with product and engineering teams to triage defects and confirm fixes, contributing to smoother, lower-defect releases.',
        ],
      },
    ],
  },
  projects: {
    label: '03 · Projects',
    title: 'Things I’ve crafted.',
    subtitle: 'Hover a card to inspect it.',
    privateRepo: 'Private repo',
    items: [
      {
        title: 'Crypto RSI Heatmap', subtitle: 'Real-time market analysis platform', year: '2026', icon: 'chart', featured: true,
        description: 'A FastAPI + React platform that serves multi-timeframe RSI heatmaps from the Binance API, with a Gemini-powered analysis chatbot.',
        highlights: ['FastAPI REST layer serving RSI data from 15m to 1w', 'Gemini chatbot endpoint with rate-limit handling', 'pytest + Vitest suites running on GitHub Actions CI'],
        tech: tech.crypto,
      },
      {
        title: 'Cardiovascular Risk Prediction', subtitle: 'Big data pipeline', year: '2026', icon: 'heart', featured: true,
        description: 'An end-to-end Apache Spark pipeline over 70,000 medical records, training a Random Forest classifier to predict cardiovascular risk.',
        highlights: ['Distributed cleaning, feature transformation and training', 'Random Forest classifier in Spark MLlib', 'Feature-importance charts of key clinical risk factors'],
        tech: tech.cardio,
      },
      {
        title: 'Full-Stack Web App', subtitle: 'Object-oriented programming project', year: '2025', icon: 'window', private: true,
        description: 'A full-stack CRUD application with a Spring Boot backend, React + Tailwind frontend and MySQL storage.',
        highlights: [], tech: tech.fullstack,
      },
      {
        title: 'Autonomous Monitoring Bot', subtitle: 'IoT automation', year: '2025', icon: 'bot', private: true,
        description: 'A Telegram bot connected to IoT devices for real-time status reporting and remote automation commands.',
        highlights: [], tech: tech.bot,
      },
      {
        title: 'Hall of Fame Prototype', subtitle: 'GitHub workflow simulation', year: '2025', icon: 'trophy',
        description: 'A website prototype built in a simulated professional GitHub workflow — finished with a zero-violation audit.',
        highlights: [], tech: tech.hof,
      },
    ],
  },
  research: {
    label: '04 · Research',
    title: 'Publication.',
    status: 'Submitted for review · 2026',
    authors: 'P. S. Krisnaputra et al.',
    paperTitle,
    summary: 'First author. A Hybrid CNN-BiLSTM text branch (TF-IDF + GloVe) fused with a VGG16 image branch over 45,404 labeled Indonesian posts. Late fusion raised accuracy to 84.46% (+0.82%), verified with McNemar’s test.',
  },
  skills: {
    label: '05 · Skills',
    title: 'Tools of the trade.',
    subtitle: 'My inventory, sorted by category.',
    groups: [
      { name: 'Languages', icon: 'scroll', items: skillItems.languages },
      { name: 'Backend & Data', icon: 'database', items: skillItems.backend },
      { name: 'Frontend', icon: 'window', items: skillItems.frontend },
      { name: 'QA & Testing', icon: 'check', items: ['Functional testing', 'Non-functional testing', 'SDLC', 'pytest', 'Vitest', 'GitHub Actions CI'] },
      { name: 'Tools', icon: 'pickaxe', items: skillItems.tools },
    ],
    achievementsTitle: 'Certifications',
    achievementTag: 'Unlocked',
  },
  certifications,
  contact: {
    label: '06 · Contact',
    title: 'Let’s build something',
    titleMuted: 'reliable together.',
    text: 'Open to internships, full-time roles and collaborations in software engineering, QA and data.',
    email: 'Send an email',
    copied: 'Copied ✓',
  },
}

// ======================= BAHASA INDONESIA =======================
const id: Content = {
  nav: { about: 'Tentang', experience: 'Pengalaman', projects: 'Proyek', research: 'Riset', skills: 'Keahlian', contact: 'Kontak', cta: 'Hubungi saya' },
  hero: {
    status: 'Terbuka untuk peluang · Indonesia',
    role: 'Full-Stack Developer & QA Engineer',
    tagline: 'Mahasiswa tingkat akhir Informatika di Telkom University — membangun perangkat lunak yang andal dari backend hingga tampilan, dan mengujinya sampai benar-benar kokoh.',
    primary: 'Lihat karya saya',
    secondary: 'Unduh CV',
    scroll: 'Gulir',
  },
  about: {
    label: '01 · Tentang',
    title: 'Engineer yang peduli kualitas,',
    titleMuted: 'builder yang selalu penasaran.',
    paragraphs: [
      'Saya mahasiswa tingkat akhir Informatika di Telkom University dengan pengalaman magang sebagai Service Quality Assurance di Telkomsel.',
      'Saya terbiasa bekerja di seluruh siklus pengembangan perangkat lunak — pengujian fungsional dan non-fungsional, pengembangan full-stack dengan Spring Boot, React, dan FastAPI, serta pengolahan data skala besar dengan Apache Spark.',
    ],
    photoHintMouse: 'Arahkan kursor ke foto',
    photoHintTouch: 'Sentuh & geser foto',
    photoAlt: 'Foto Putu Satya Krisnaputra',
  },
  stats: [
    { value: '5', label: 'Proyek dibuat' },
    { value: '70K', label: 'Data diolah' },
    { value: '84.46%', label: 'Akurasi model paper' },
  ],
  education: { label: 'Pendidikan', school: 'Telkom University', degree: 'S1 Informatika', period: '2022 – Sekarang' },
  experience: {
    label: '02 · Pengalaman',
    title: 'Tempat saya berkarya.',
    items: [
      {
        role: 'Service Quality Assurance Intern',
        company: 'Telkomsel',
        period: '2025',
        points: [
          'Melakukan pengujian fungsional dan non-fungsional pada aplikasi digital dan layanan TI, memastikan perilakunya sesuai kebutuhan teknis dan bisnis.',
          'Mendukung aktivitas QA di seluruh SDLC, mulai dari peninjauan kebutuhan hingga verifikasi rilis.',
          'Bekerja sama dengan tim produk dan engineering untuk memilah bug dan memastikan perbaikannya, sehingga rilis lebih lancar dan minim cacat.',
        ],
      },
    ],
  },
  projects: {
    label: '03 · Proyek',
    title: 'Hasil racikan saya.',
    subtitle: 'Arahkan kursor ke kartu untuk melihat lebih dekat.',
    privateRepo: 'Repo privat',
    items: [
      {
        title: 'Crypto RSI Heatmap', subtitle: 'Platform analisis pasar real-time', year: '2026', icon: 'chart', featured: true,
        description: 'Platform FastAPI + React yang menyajikan heatmap RSI multi-timeframe dari Binance API, dilengkapi chatbot analisis berbasis Gemini.',
        highlights: ['REST API FastAPI untuk data RSI dari 15m hingga 1w', 'Endpoint chatbot Gemini dengan penanganan rate-limit', 'Test pytest + Vitest otomatis di GitHub Actions CI'],
        tech: tech.crypto,
      },
      {
        title: 'Cardiovascular Risk Prediction', subtitle: 'Pipeline big data', year: '2026', icon: 'heart', featured: true,
        description: 'Pipeline Apache Spark end-to-end atas 70.000 data medis, melatih model Random Forest untuk memprediksi risiko penyakit jantung.',
        highlights: ['Pembersihan, transformasi fitur, dan training terdistribusi', 'Model Random Forest di Spark MLlib', 'Grafik feature importance faktor risiko klinis utama'],
        tech: tech.cardio,
      },
      {
        title: 'Full-Stack Web App', subtitle: 'Proyek pemrograman berorientasi objek', year: '2025', icon: 'window', private: true,
        description: 'Aplikasi CRUD full-stack dengan backend Spring Boot, frontend React + Tailwind, dan database MySQL.',
        highlights: [], tech: tech.fullstack,
      },
      {
        title: 'Autonomous Monitoring Bot', subtitle: 'Otomasi IoT', year: '2025', icon: 'bot', private: true,
        description: 'Bot Telegram yang terhubung ke perangkat IoT untuk laporan status real-time dan perintah otomasi jarak jauh.',
        highlights: [], tech: tech.bot,
      },
      {
        title: 'Hall of Fame Prototype', subtitle: 'Simulasi alur kerja GitHub', year: '2025', icon: 'trophy',
        description: 'Prototipe website yang dibangun dalam simulasi alur kerja GitHub profesional — selesai dengan audit tanpa pelanggaran.',
        highlights: [], tech: tech.hof,
      },
    ],
  },
  research: {
    label: '04 · Riset',
    title: 'Publikasi.',
    status: 'Dalam proses review · 2026',
    authors: 'P. S. Krisnaputra et al.',
    paperTitle,
    summary: 'Penulis pertama. Cabang teks Hybrid CNN-BiLSTM (TF-IDF + GloVe) digabung dengan cabang gambar VGG16 pada 45.404 unggahan berbahasa Indonesia. Late fusion menaikkan akurasi menjadi 84,46% (+0,82%), diverifikasi dengan uji McNemar.',
  },
  skills: {
    label: '05 · Keahlian',
    title: 'Perlengkapan saya.',
    subtitle: 'Isi inventaris saya, dikelompokkan per kategori.',
    groups: [
      { name: 'Bahasa Pemrograman', icon: 'scroll', items: skillItems.languages },
      { name: 'Backend & Data', icon: 'database', items: skillItems.backend },
      { name: 'Frontend', icon: 'window', items: skillItems.frontend },
      { name: 'QA & Testing', icon: 'check', items: ['Pengujian fungsional', 'Pengujian non-fungsional', 'SDLC', 'pytest', 'Vitest', 'GitHub Actions CI'] },
      { name: 'Tools', icon: 'pickaxe', items: skillItems.tools },
    ],
    achievementsTitle: 'Sertifikasi',
    achievementTag: 'Terbuka',
  },
  certifications,
  contact: {
    label: '06 · Kontak',
    title: 'Mari membangun sesuatu',
    titleMuted: 'yang andal bersama.',
    text: 'Terbuka untuk magang, posisi full-time, dan kolaborasi di bidang software engineering, QA, dan data.',
    email: 'Kirim email',
    copied: 'Tersalin ✓',
  },
}

export const content: Record<Lang, Content> = { en, id }
