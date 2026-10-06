export const site = {
  name: 'Beauty Store',
  tagline: 'Belleza coreana en tu rutina',
  description:
    'Maquillaje y skincare coreano de importación directa. Productos originales, asesoría personalizada y envío a todo el país.',
  formEndpoint: 'https://formspree.io/f/xyezqapa',
  heroImage: '/productos/hero-fondo.jpg',
  freeShippingFrom: 199,
  email: 'hola@beautystore.com',
  phone: '+51 987 654 321',
  address: 'Av. Arequipa 1234, Of. 502, Lince, Lima',
  hours: 'Lunes a viernes de 9 a 19 h (GMT-5)',
  social: [
    { label: 'Instagram', href: 'https://instagram.com', handle: '@beautystore' },
    { label: 'TikTok', href: 'https://tiktok.com', handle: '@beautystore' },
    { label: 'WhatsApp', href: 'https://wa.me/51987654321', handle: '+51 987 654 321' },
  ],
}

export const navLinks = [
  { label: 'Productos', href: '#productos' },
  { label: 'Rutina', href: '#rutina' },
  { label: 'Tipos de piel', href: '#tipos-de-piel' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
]

export const benefits = [
  {
    title: 'Importación directa',
    text: 'Compramos a distribuidores oficiales en Seúl, así que cada producto llega original y con su sello intacto.',
    icon: 'globe',
  },
  {
    title: 'Envío a todo el país',
    text: 'Despachamos en 24 h hábiles. Gratis en compras superiores a S/ 199.',
    icon: 'truck',
  },
  {
    title: 'Formulación transparente',
    text: 'Filtros, ceramidas y ácidos coreanos con concentraciones claras y fichas honestas.',
    icon: 'sparkle',
  },
  {
    title: 'Asesoría real',
    text: 'Te ayudamos a armar tu rutina según tu tipo de piel. Escribinos y te respondemos en persona.',
    icon: 'chat',
  },
]

export const products = [
  {
    id: 'serum-niacinamida',
    image: '/productos/serum-niacinamida.jpg',
    name: 'Sérum Niacinamida 12%',
    brand: 'Beauty Store Lab',
    category: 'skincare',
    price: 89,
    badge: 'Más vendido',
    text: 'Aclara marcas, regula el sebo y fortalece la barrera. Textura acuosa, absorción inmediata.',
  },
  {
    id: 'tonico-centella',
    image: '/productos/tonico-centella.jpg',
    name: 'Tónico Centella Asiática',
    brand: 'Beauty Store Lab',
    category: 'skincare',
    price: 79,
    badge: null,
    text: 'Calma la irritación y prepara la piel para todo lo que venga después.',
  },
  {
    id: 'crema-barrera',
    image: '/productos/crema-barrera.jpg',
    name: 'Crema Barrera Ceramidas',
    brand: 'Beauty Store Lab',
    category: 'skincare',
    price: 119,
    badge: null,
    text: 'Ceramidas, escualano y colesterol. Para piel reactiva o reseca.',
  },
  {
    id: 'lip-tint-rosa',
    image: '/productos/lip-tint-rosa.jpg',
    name: 'Lip Tint Hipoalérgenico',
    brand: 'Beauty Store Lab',
    category: 'maquillaje',
    price: 69,
    badge: 'Nuevo',
    text: 'Color rosado que se difumina con un toque. No reseca los labios.',
  },
  {
    id: 'protector-solar',
    image: '/productos/protector-solar.jpg',
    name: 'Protector Solar SPF 50+',
    brand: 'Beauty Store Lab',
    category: 'skincare',
    price: 139,
    badge: null,
    text: 'Acabado satinado invisible, sin marca blanca. El paso que nadie se saltea.',
  },
  {
    id: 'mascara-arcilla',
    image: '/productos/mascara-arcilla.jpg',
    name: 'Mascarilla de Arcilla Rosa',
    brand: 'Beauty Store Lab',
    category: 'skincare',
    price: 79,
    badge: null,
    text: 'Limpia poros sin resecar la piel. Cinco minutos y listo.',
  },
]

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'maquillaje', label: 'Maquillaje' },
]

export const routine = [
  {
    step: '01',
    period: 'AM',
    title: 'Doble limpieza',
    text: 'Aceite de limpieza primero, luego gel. Elimina el protector solar del día anterior.',
  },
  {
    step: '02',
    period: 'AM / PM',
    title: 'Tónico',
    text: 'Sobre piel húmeda y con las manos. Hidrata y prepara el resto de los pasos.',
  },
  {
    step: '03',
    period: 'AM / PM',
    title: 'Esencia o sérum',
    text: 'Niacinamida, ácido hialurónico o vitamina C. Dos o tres gotas son suficientes.',
  },
  {
    step: '04',
    period: 'AM / PM',
    title: 'Crema humectante',
    text: 'Ceramidas para sellar la hidratación. Poco producto y bien extendido.',
  },
  {
    step: '05',
    period: 'AM',
    title: 'Protector solar',
    text: 'Dos dedos de producto como mínimo. Reaplicá cada 3 horas si hay sol directo.',
  },
]

export const testimonials = [
  {
    name: 'Camila R.',
    location: 'Buenos Aires',
    rating: 5,
    avatar: '/productos/resena-camila.jpg',
    text: 'Pedí el sérum y la crema de barrera. En tres semanas se me fue el enrojecimiento que tenía hace años. Es real, no es humo.',
  },
  {
    name: 'Florencia M.',
    location: 'Córdoba',
    rating: 5,
    avatar: '/productos/resena-florencia.jpg',
    text: 'La primera tienda que me explicó qué me convenía sin querer venderme de más. Volví dos veces.',
  },
  {
    name: 'Julieta S.',
    location: 'Rosario',
    rating: 5,
    avatar: '/productos/avatar-julieta.webp',
    text: 'Llegó en tres días y con el sello puesto. El lip tint es rosado suave, no el labial rouge de siempre.',
  },
]

export const about = {
  eyebrow: 'Sobre nosotros',
  title: 'De Seúl a tu espejo',
  text: 'Empezamos en 2021 con una valija, dos valijas al año y una lista de clientes que creció sola. Hoy trabajamos directo con distribuidores autorizados en Corea del Sur y despachamos desde Lima: el mismo producto, sin la cadena de intermediarios que encarece todo.',
  points: [
    {
      icon: 'globe',
      title: 'Importación directa',
      text: 'Compramos a distribuidores oficiales en Seúl, con factura y sello de lote.',
    },
    {
      icon: 'truck',
      title: 'Envío propio desde Lima',
      text: 'Despachamos en 24 h hábiles y llegamos a todo el país en 2 a 5 días.',
    },
    {
      icon: 'chat',
      title: 'Asesoría de personas reales',
      text: 'No hay bot detrás del formulario: una asesora lee tu caso y te responde.',
    },
  ],
  stats: [
    { value: '2021', label: 'empezamos en Lima' },
    { value: '3.400+', label: 'pedidos entregados' },
    { value: '12', label: 'marcas coreanas' },
  ],
}

export const skinTypes = [
  {
    id: 'grasa',
    icon: 'drop',
    title: 'Piel grasa',
    text: 'Exceso de sebo, poros visibles y brillo que aparece a media tarde, sobre todo en la zona T.',
    hint: 'Niacinamida y tónicos con AHA/BHA. Texturas en gel, nada de aceites pesados.',
  },
  {
    id: 'seca',
    icon: 'sun',
    title: 'Piel seca',
    text: 'Tirantez justo después de lavarte, descamación fina y aspecto apagado sin humectación.',
    hint: 'Ceramidas, escualano y ácido hialurónico. Aplicá sobre piel aún húmeda.',
  },
  {
    id: 'mixta',
    icon: 'moon',
    title: 'Piel mixta',
    text: 'Zona T grasa con poros abiertos y mejillas normales o secas que se resecan en invierno.',
    hint: 'Tratala por zonas: control de sebo en la T, hidratación en las mejillas.',
  },
  {
    id: 'sensible',
    icon: 'leaf',
    title: 'Piel sensible',
    text: 'Enrojecimiento, picazón o reacción rápida cuando probás un producto nuevo.',
    hint: 'Centella asiática y pantenol. Sin fragancia, sin alcohol y con prueba de tolerancia.',
  },
  {
    id: 'acneica',
    icon: 'sparkle',
    title: 'Tendencia acneica',
    text: 'Granitos recurrentes, puntos negros y marcas oscuras que se quedan después de cada brote.',
    hint: 'BHA para desobstruir y niacinamida para las marcas. Todo no comedogénico.',
  },
]

export const priceFormat = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  maximumFractionDigits: 0,
})

export const marqueeImages = [
  {
    src: '/productos/galeria-apaisado-1.webp',
    alt: 'Maquillaje y skincare coreano de la colección Beauty Store',
  },
  {
    src: '/productos/galeria-apaisado-2.jpg',
    alt: 'Productos de belleza coreana sobre una superficie rosa',
  },
  {
    src: '/productos/galeria-cuadrado-1.jpg',
    alt: 'Detalle de un producto de skincare importado de Corea del Sur',
  },
]

export const galleryImages = [
  {
    src: '/productos/galeria-vertical-1.jpg',
    alt: 'Rutina de skincare coreano paso a paso',
  },
  {
    src: '/productos/galeria-vertical-2.jpg',
    alt: 'Texturas y acabados de productos de belleza coreana',
  },
  {
    src: '/productos/galeria-cuadrado-2.webp',
    alt: 'Frasco de sérum de la línea Beauty Store Lab',
  },
]

export const faqs = [
  {
    q: '¿Los productos son originales?',
    a: 'Sí. Importamos de distribuidores autorizados en Corea del Sur. Cada unidad llega con su empaque original y número de lote. Si algo no fuera original, te devolvemos el doble.',
  },
  {
    q: '¿Cuánto tarda el envío?',
    a: 'Despachamos dentro de las 24 h hábiles y normalmente entregamos entre 2 y 5 días según la zona. El envío es gratis en compras superiores a S/ 199.',
  },
  {
    q: '¿Puedo cambiar un producto?',
    a: 'Tenés 30 días desde que recibiste el pedido. Escribinos con tu número de orden y lo resolvemos.',
  },
  {
    q: '¿Me asesoran según mi tipo de piel?',
    a: 'Sí, es la parte que más nos gusta. Contanos tu tipo de piel, qué te preocupa y con qué estás usando hoy, y te armamos una rutina ordenada.',
  },
  {
    q: '¿Hacen ventas por mayor?',
    a: 'Sí. Si comprás para un salón o para revender, escribinos eligiendo el motivo "Mayorista" en el formulario y te armamos una lista mayorista.',
  },
]

export const contactReasons = [
  { id: 'consulta', label: 'Consulta de productos' },
  { id: 'pedido', label: 'Seguimiento de pedido' },
  { id: 'mayorista', label: 'Venta por mayor' },
  { id: 'otro', label: 'Otro motivo' },
]
