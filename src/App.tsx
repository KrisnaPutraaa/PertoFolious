import { useEffect } from 'react'
import NightBackground from './components/NightBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Research from './components/Research'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

// App = halaman utama. Urutan komponen di sini = urutan section di website.
export default function App() {
  // Jika link dibuka dengan #bagian (mis. /#projects), gulir ke bagian itu setelah halaman tampil
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <div className="grain min-h-screen overflow-x-clip">
      <NightBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
