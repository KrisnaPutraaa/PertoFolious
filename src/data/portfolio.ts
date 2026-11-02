// ============================================================
//  SEMUA ISI WEBSITE ADA DI FILE INI.
//  Ingin mengubah teks, menambah proyek, atau skill?
//  Cukup edit data di bawah — tampilan akan ikut berubah.
// ============================================================

export const profile = {
  name: 'Putu Satya Krisnaputra',
  shortName: 'Krisna',
  role: 'Full-Stack Developer & QA Engineer',
  location: 'Indonesia',
  tagline:
    'Final-year Informatics student at Telkom University — building reliable software from backend to pixel, and testing it until it holds.',
  about: [
    'I am a final-year Informatics student at Telkom University with internship experience in Service Quality Assurance at Telkomsel.',
    'I work hands-on across the whole software development life cycle: functional and non-functional testing, full-stack development with Spring Boot, React and FastAPI, and large-scale data processing with Apache Spark.',
  ],
  email: 'krisnaaa.putra2004@gmail.com',
  links: {
    github: 'https://github.com/krizpakez-beep',
    linkedin: 'https://linkedin.com/in/krisnaaaputra',
  },
  // Taruh file CV (PDF) di folder `public/` dengan nama ini agar tombol "Download CV" berfungsi.
  cvFile: 'cv.pdf',
}

export const stats = [
  { value: '5', label: 'Projects built' },
  { value: '70K', label: 'Records processed with Spark' },
  { value: '84.46%', label: 'Model accuracy (first-author paper)' },
]

export type Experience = {
  role: string
  company: string
  period: string
  points: string[]
}

export const experiences: Experience[] = [
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
]

export const education = {
  school: 'Telkom University',
  degree: 'Bachelor of Informatics (S1 Informatika)',
  period: '2022 – Present',
}

export type Project = {
  title: string
  subtitle: string
  year: string
  description: string
  highlights: string[]
  tech: string[]
  link?: string
  private?: boolean
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Crypto RSI Heatmap',
    subtitle: 'Real-time market analysis platform',
    year: '2026',
    featured: true,
    description:
      'A FastAPI + React platform that serves multi-timeframe RSI heatmaps from the Binance API, with a Gemini-powered analysis chatbot.',
    highlights: [
      'FastAPI REST layer serving RSI data from 15m to 1w timeframes',
      'Google Gemini chatbot endpoint with rate-limit handling',
      'pytest + Vitest test suites running on GitHub Actions CI',
    ],
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Gemini'],
  },
  {
    title: 'Cardiovascular Risk Prediction',
    subtitle: 'Big data pipeline',
    year: '2026',
    featured: true,
    description:
      'An end-to-end Apache Spark pipeline over 70,000 medical records, training a Random Forest classifier to predict cardiovascular risk.',
    highlights: [
      'Distributed cleaning, feature transformation and model training',
      'Random Forest classifier in Spark MLlib',
      'Feature-importance charts surfacing dominant clinical risk factors',
    ],
    tech: ['PySpark', 'Spark MLlib', 'Pandas', 'Matplotlib'],
  },
  {
    title: 'Full-Stack Web Application',
    subtitle: 'Object-oriented programming project',
    year: '2025',
    private: true,
    description:
      'A full-stack CRUD application with a Spring Boot backend, React + Tailwind frontend and MySQL storage.',
    highlights: ['Relational schema design', 'End-to-end CRUD from controller to UI'],
    tech: ['Java', 'Spring Boot', 'React', 'MySQL'],
  },
  {
    title: 'Autonomous Monitoring Bot',
    subtitle: 'IoT automation',
    year: '2025',
    private: true,
    description:
      'A Telegram bot connected to IoT devices for real-time status reporting and remote automation commands.',
    highlights: ['Message parsing & alert routing', 'Actionable notifications instead of raw sensor streams'],
    tech: ['Python', 'Telegram Bot API', 'IoT'],
  },
  {
    title: 'Hall of Fame Prototype',
    subtitle: 'GitHub workflow simulation',
    year: '2025',
    description:
      'A website prototype built as the assigned programmer in a simulated professional GitHub workflow — finished with a zero-violation audit.',
    highlights: ['4 issues, 4 pull requests, 4 merges', 'Theme restyle shipped through code review'],
    tech: ['HTML', 'CSS', 'GitHub Flow'],
  },
]

export const publication = {
  title:
    'Multimodal Cyberbullying Detection on Platform X Using VGG16 Features and Hybrid CNN-BiLSTM with GloVe Feature Expansion',
  authors: 'P. S. Krisnaputra et al.',
  status: 'Submitted for review, 2026',
  summary:
    'First author. A Hybrid CNN-BiLSTM text branch (TF-IDF + GloVe) fused with a VGG16 image branch over 45,404 labeled Indonesian posts. Late fusion raised accuracy to 84.46% (+0.82%), verified with McNemar’s test.',
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'SQL', 'HTML/CSS'] },
  { group: 'Backend & Data', items: ['Spring Boot', 'FastAPI', 'Apache Spark', 'Spark MLlib', 'MySQL', 'Pandas'] },
  { group: 'Frontend', items: ['React.js', 'Tailwind CSS', 'REST API integration'] },
  { group: 'QA & Testing', items: ['Functional Testing', 'Non-Functional Testing', 'SDLC', 'pytest', 'Vitest', 'GitHub Actions CI'] },
  { group: 'Tools', items: ['Git & GitHub', 'Google Colab', 'Jupyter', 'Figma', 'Postman'] },
]

export const certifications = [
  { name: 'IBM Big Data 101', issuer: 'Cognitive Class', year: '2026' },
  { name: 'Full-Stack Web Development', issuer: 'Udemy' },
  { name: 'Figma UI/UX Design Essentials', issuer: 'Udemy' },
  { name: 'Fundamentals of Digital Marketing', issuer: 'Google' },
  { name: 'Entrepreneurship International', issuer: 'Tel-U Career' },
]
