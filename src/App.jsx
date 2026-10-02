import Beneficios from './components/Beneficios'
import Contacto from './components/Contacto'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Galeria from './components/Galeria'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Productos from './components/Productos'
import RutinaKBeauty from './components/RutinaKBeauty'
import Testimonios from './components/Testimonios'

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <Beneficios />
        <Productos />
        <Galeria />
        <RutinaKBeauty />
        <Testimonios />
        <Faq />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}

export default App
