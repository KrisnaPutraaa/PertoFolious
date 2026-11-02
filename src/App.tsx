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
  return (
    <div className="grain min-h-screen overflow-x-clip">
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
