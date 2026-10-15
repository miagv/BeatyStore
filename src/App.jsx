import { useEffect, useState } from 'react'
import AuthModal from './components/AuthModal'
import Beneficios from './components/Beneficios'
import CartDrawer from './components/CartDrawer'
import Contacto from './components/Contacto'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Galeria from './components/Galeria'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Productos from './components/Productos'
import RutinaKBeauty from './components/RutinaKBeauty'
import SobreNosotros from './components/SobreNosotros'
import Testimonios from './components/Testimonios'
import TiposDePiel from './components/TiposDePiel'
import { useAuth } from './hooks/useAuth'
const whatsappFloatingUrl = 'https://wa.me/51963051045'

function App() {
  const { user, register, login, logout } = useAuth()
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return undefined

    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const item = currentCart.find((cartItem) => cartItem.id === product.id)
      if (!item) return [...currentCart, { ...product, quantity: 1 }]

      return currentCart.map((cartItem) =>
        cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      )
    })
  }

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        user={user}
        onAuthOpen={() => setAuthOpen(true)}
        onLogout={logout}
      />
      <main>
        <Hero />
        <Beneficios />
        <Productos onAddToCart={addToCart} />
        <Galeria />
        <RutinaKBeauty />
        <TiposDePiel />
        <Testimonios />
        <SobreNosotros />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        user={user}
        whatsappUrl={whatsappFloatingUrl}
      />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={login}
        onRegister={register}
      />
      {!footerVisible && (
        <a
          href={`${whatsappFloatingUrl}?text=${encodeURIComponent('Hola, quisiera más información')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.5 0 .14 5.35.14 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.94-5.36 11.94-11.94a11.85 11.85 0 0 0-3.5-8.42ZM12.08 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.85 9.85 0 0 1-1.51-5.25c0-5.46 4.44-9.9 9.9-9.9a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.94 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.48 1.7.61.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.13-.27-.2-.57-.35Z" />
          </svg>
          <span>Escríbenos</span>
        </a>
      )}
    </div>
  )
}

export default App
