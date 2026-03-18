
// ============================================
// WEB TYPES CATALOG — Alpardimedia WP
// Sistema de tipos de web con plugins automáticos
// ============================================

export interface WebType {
  id:          string;
  name:        string;
  description: string;
  icon:        string;
  category:    string;
  plugins:     string[];
  theme:       string;
  color:       string;
}

export const WEB_TYPES: WebType[] = [

  // 🛒 ECOMMERCE
  {
    id: 'ecommerce-general', name: 'Tienda online general', category: 'Ecommerce',
    description: 'Tienda completa con carrito, pagos y gestión de productos',
    icon: 'cart3', color: '#10B981',
    theme: 'shop', plugins: ['woocommerce', 'woocommerce-gateway-stripe', 'wordpress-seo', 'wp-super-cache', 'wordfence']
  },
  {
    id: 'ecommerce-digital', name: 'Venta de productos digitales', category: 'Ecommerce',
    description: 'Descargas digitales, ebooks, música, software',
    icon: 'cloud-download', color: '#6366F1',
    theme: 'digital', plugins: ['woocommerce', 'easy-digital-downloads', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'ecommerce-courses', name: 'Venta de cursos online', category: 'Ecommerce',
    description: 'LMS con cursos, lecciones, quizzes y certificados',
    icon: 'mortarboard', color: '#F59E0B',
    theme: 'education', plugins: ['learnpress', 'woocommerce', 'wordpress-seo', 'buddypress']
  },
  {
    id: 'ecommerce-membership', name: 'Membresías / Suscripciones', category: 'Ecommerce',
    description: 'Contenido de pago con acceso por niveles',
    icon: 'star', color: '#8B5CF6',
    theme: 'membership', plugins: ['woocommerce', 'woocommerce-subscriptions', 'memberpress', 'wordpress-seo']
  },
  {
    id: 'ecommerce-dropshipping', name: 'Dropshipping', category: 'Ecommerce',
    description: 'Tienda sin stock propio con proveedores externos',
    icon: 'truck', color: '#EF4444',
    theme: 'shop', plugins: ['woocommerce', 'alidropship', 'wordpress-seo', 'wp-super-cache']
  },
  {
    id: 'ecommerce-marketplace', name: 'Marketplace multi-vendedor', category: 'Ecommerce',
    description: 'Plataforma tipo Amazon con múltiples vendedores',
    icon: 'shop', color: '#F97316',
    theme: 'marketplace', plugins: ['woocommerce', 'dokan', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'ecommerce-services', name: 'Venta de servicios', category: 'Ecommerce',
    description: 'Reservas, presupuestos y venta de servicios profesionales',
    icon: 'briefcase', color: '#0EA5E9',
    theme: 'services', plugins: ['woocommerce', 'bookly', 'contact-form-7', 'wordpress-seo']
  },
  {
    id: 'ecommerce-local', name: 'Tienda local (física + online)', category: 'Ecommerce',
    description: 'Negocio físico con presencia digital y ventas online',
    icon: 'geo-alt', color: '#14B8A6',
    theme: 'local', plugins: ['woocommerce', 'wp-google-maps', 'contact-form-7', 'wordpress-seo']
  },
  {
    id: 'ecommerce-print', name: 'Print-on-demand', category: 'Ecommerce',
    description: 'Productos personalizados impresos bajo demanda',
    icon: 'printer', color: '#EC4899',
    theme: 'shop', plugins: ['woocommerce', 'printful-for-woocommerce', 'wordpress-seo']
  },
  {
    id: 'ecommerce-niche', name: 'Tienda de nicho', category: 'Ecommerce',
    description: 'Tienda especializada en un nicho (tarot, fitness, etc.)',
    icon: 'heart', color: '#7C3AED',
    theme: 'niche', plugins: ['woocommerce', 'wordpress-seo', 'mailchimp-for-woocommerce', 'wordfence']
  },

  // 📰 CONTENIDO / MEDIOS
  {
    id: 'blog-personal', name: 'Blog personal', category: 'Contenido',
    description: 'Blog personal con artículos, categorías y comentarios',
    icon: 'pencil-square', color: '#3B82F6',
    theme: 'blog', plugins: ['classic-editor', 'wordpress-seo', 'akismet', 'wp-super-cache']
  },
  {
    id: 'magazine', name: 'Revista digital', category: 'Contenido',
    description: 'Portal editorial con secciones, autores y categorías',
    icon: 'newspaper', color: '#1E293B',
    theme: 'magazine', plugins: ['classic-editor', 'wordpress-seo', 'advanced-custom-fields', 'wp-super-cache']
  },
  {
    id: 'news-portal', name: 'Portal de noticias', category: 'Contenido',
    description: 'Sitio de noticias con breaking news y categorías',
    icon: 'broadcast', color: '#DC2626',
    theme: 'news', plugins: ['classic-editor', 'wordpress-seo', 'advanced-custom-fields', 'wp-super-cache', 'wordfence']
  },
  {
    id: 'niche-seo', name: 'Web de nicho SEO', category: 'Contenido',
    description: 'Web optimizada para posicionamiento en buscadores',
    icon: 'search', color: '#65A30D',
    theme: 'blog', plugins: ['wordpress-seo', 'advanced-custom-fields', 'wp-super-cache', 'akismet']
  },
  {
    id: 'affiliate-blog', name: 'Blog de afiliación', category: 'Contenido',
    description: 'Blog monetizado con links de afiliados y reseñas',
    icon: 'link-45deg', color: '#D97706',
    theme: 'blog', plugins: ['wordpress-seo', 'thirstyaffiliates', 'wp-super-cache', 'classic-editor']
  },
  {
    id: 'review-site', name: 'Web de reseñas', category: 'Contenido',
    description: 'Comparativas y reseñas de productos con valoraciones',
    icon: 'star-half', color: '#F59E0B',
    theme: 'reviews', plugins: ['wordpress-seo', 'wp-product-review', 'advanced-custom-fields', 'wp-super-cache']
  },
  {
    id: 'wiki', name: 'Wiki / Documentación', category: 'Contenido',
    description: 'Base de conocimiento estructurada y searchable',
    icon: 'book', color: '#0891B2',
    theme: 'wiki', plugins: ['advanced-custom-fields', 'wordpress-seo', 'wp-super-cache', 'searchwp']
  },

  // 🧑‍💼 CORPORATIVO / PROFESIONAL
  {
    id: 'corporate', name: 'Web corporativa', category: 'Corporativo',
    description: 'Presencia profesional de empresa con servicios y contacto',
    icon: 'building', color: '#1E40AF',
    theme: 'corporate', plugins: ['contact-form-7', 'wordpress-seo', 'advanced-custom-fields', 'wp-super-cache']
  },
  {
    id: 'landing-page', name: 'Landing page', category: 'Corporativo',
    description: 'Página de aterrizaje optimizada para conversión',
    icon: 'lightning-charge', color: '#7C3AED',
    theme: 'landing', plugins: ['contact-form-7', 'wordpress-seo', 'elementor', 'mailchimp-for-wordpress']
  },
  {
    id: 'portfolio', name: 'Portfolio personal', category: 'Corporativo',
    description: 'Showcase de trabajos y proyectos creativos',
    icon: 'images', color: '#EC4899',
    theme: 'portfolio', plugins: ['advanced-custom-fields', 'wordpress-seo', 'contact-form-7']
  },
  {
    id: 'agency', name: 'Agencia digital', category: 'Corporativo',
    description: 'Web de agencia con servicios, casos de éxito y equipo',
    icon: 'people', color: '#0F172A',
    theme: 'agency', plugins: ['advanced-custom-fields', 'wordpress-seo', 'contact-form-7', 'wp-super-cache']
  },
  {
    id: 'consulting', name: 'Consultoría', category: 'Corporativo',
    description: 'Web para consultores con servicios y agenda',
    icon: 'chat-square-text', color: '#0284C7',
    theme: 'corporate', plugins: ['contact-form-7', 'bookly', 'wordpress-seo', 'advanced-custom-fields']
  },
  {
    id: 'personal-brand', name: 'Marca personal', category: 'Corporativo',
    description: 'Web de marca personal con blog, servicios y contacto',
    icon: 'person-badge', color: '#D97706',
    theme: 'personal', plugins: ['wordpress-seo', 'contact-form-7', 'mailchimp-for-wordpress', 'classic-editor']
  },
  {
    id: 'cv-online', name: 'CV online', category: 'Corporativo',
    description: 'Currículum vitae interactivo y descargable',
    icon: 'file-person', color: '#6366F1',
    theme: 'cv', plugins: ['advanced-custom-fields', 'wordpress-seo']
  },

  // 🧠 EDUCACIÓN / COMUNIDAD
  {
    id: 'lms', name: 'LMS — Plataforma educativa', category: 'Educación',
    description: 'Cursos online con lecciones, quizzes y certificados',
    icon: 'mortarboard', color: '#7C3AED',
    theme: 'education', plugins: ['learnpress', 'wordpress-seo', 'buddypress', 'woocommerce']
  },
  {
    id: 'academy', name: 'Academia online', category: 'Educación',
    description: 'Escuela virtual con múltiples cursos y profesores',
    icon: 'building', color: '#0891B2',
    theme: 'education', plugins: ['learnpress', 'woocommerce', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'forum', name: 'Foro / Comunidad', category: 'Educación',
    description: 'Foro de discusión con categorías y usuarios registrados',
    icon: 'chat-left-dots', color: '#10B981',
    theme: 'community', plugins: ['bbpress', 'buddypress', 'wordpress-seo', 'akismet']
  },
  {
    id: 'social-network', name: 'Red social privada', category: 'Educación',
    description: 'Mini red social con perfiles, grupos y mensajes',
    icon: 'diagram-3', color: '#3B82F6',
    theme: 'social', plugins: ['buddypress', 'bbpress', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'coaching', name: 'Coaching / Mentoring', category: 'Educación',
    description: 'Web de coach con sesiones, recursos y comunidad',
    icon: 'person-raised-hand', color: '#F59E0B',
    theme: 'coaching', plugins: ['bookly', 'contact-form-7', 'wordpress-seo', 'mailchimp-for-wordpress']
  },

  // 🏡 SECTORIALES
  {
    id: 'real-estate', name: 'Inmobiliaria', category: 'Sectorial',
    description: 'Portal inmobiliario con propiedades, búsqueda y contacto',
    icon: 'house', color: '#0891B2',
    theme: 'realestate', plugins: ['advanced-custom-fields', 'wp-google-maps', 'contact-form-7', 'wordpress-seo']
  },
  {
    id: 'restaurant', name: 'Restaurante', category: 'Sectorial',
    description: 'Web de restaurante con menú, reservas y galería',
    icon: 'cup-hot', color: '#DC2626',
    theme: 'restaurant', plugins: ['contact-form-7', 'bookly', 'wp-google-maps', 'wordpress-seo']
  },
  {
    id: 'hotel', name: 'Hotel / Alojamiento', category: 'Sectorial',
    description: 'Web hotelera con habitaciones, reservas y galería',
    icon: 'building-check', color: '#0284C7',
    theme: 'hotel', plugins: ['woocommerce', 'woocommerce-bookings', 'advanced-custom-fields', 'wordpress-seo']
  },
  {
    id: 'events', name: 'Eventos / Bodas', category: 'Sectorial',
    description: 'Gestión de eventos con tickets y registro de asistentes',
    icon: 'calendar-event', color: '#EC4899',
    theme: 'events', plugins: ['the-events-calendar', 'contact-form-7', 'wordpress-seo', 'advanced-custom-fields']
  },
  {
    id: 'clinic', name: 'Clínica / Salud', category: 'Sectorial',
    description: 'Centro médico con servicios, equipo y citas online',
    icon: 'heart-pulse', color: '#10B981',
    theme: 'health', plugins: ['bookly', 'contact-form-7', 'advanced-custom-fields', 'wordpress-seo']
  },
  {
    id: 'gym', name: 'Gimnasio / Fitness', category: 'Sectorial',
    description: 'Centro deportivo con clases, horarios y membresías',
    icon: 'bicycle', color: '#F97316',
    theme: 'fitness', plugins: ['woocommerce', 'bookly', 'advanced-custom-fields', 'wordpress-seo']
  },
  {
    id: 'ngo', name: 'ONG / Fundación', category: 'Sectorial',
    description: 'Organización sin ánimo de lucro con donaciones y proyectos',
    icon: 'globe', color: '#65A30D',
    theme: 'ngo', plugins: ['give', 'contact-form-7', 'wordpress-seo', 'mailchimp-for-wordpress']
  },
  {
    id: 'spirituality', name: 'Espiritualidad / Terapias', category: 'Sectorial',
    description: 'Centro de terapias, tarot, meditación y bienestar',
    icon: 'stars', color: '#7C3AED',
    theme: 'spiritual', plugins: ['bookly', 'woocommerce', 'contact-form-7', 'wordpress-seo', 'mailchimp-for-wordpress']
  },
  {
    id: 'beauty', name: 'Centro de belleza / Spa', category: 'Sectorial',
    description: 'Salón de belleza con reservas, servicios y galería',
    icon: 'scissors', color: '#EC4899',
    theme: 'beauty', plugins: ['bookly', 'contact-form-7', 'advanced-custom-fields', 'wordpress-seo']
  },
  {
    id: 'legal', name: 'Despacho legal / Abogados', category: 'Sectorial',
    description: 'Bufete de abogados con servicios y consultas online',
    icon: 'bank', color: '#1E293B',
    theme: 'legal', plugins: ['contact-form-7', 'advanced-custom-fields', 'wordpress-seo', 'bookly']
  },
  {
    id: 'photography', name: 'Fotografía / Videografía', category: 'Sectorial',
    description: 'Portfolio fotográfico con galerías y servicios',
    icon: 'camera', color: '#0F172A',
    theme: 'photography', plugins: ['advanced-custom-fields', 'contact-form-7', 'wordpress-seo']
  },
  {
    id: 'music', name: 'Músico / Artista', category: 'Sectorial',
    description: 'Web de artista con discografía, fechas y tienda',
    icon: 'music-note-beamed', color: '#7C3AED',
    theme: 'artist', plugins: ['woocommerce', 'advanced-custom-fields', 'the-events-calendar', 'wordpress-seo']
  },
  {
    id: 'travel', name: 'Agencia de viajes', category: 'Sectorial',
    description: 'Viajes, destinos, paquetes y reservas online',
    icon: 'airplane', color: '#0891B2',
    theme: 'travel', plugins: ['woocommerce', 'advanced-custom-fields', 'wp-google-maps', 'wordpress-seo']
  },
  {
    id: 'pets', name: 'Veterinaria / Mascotas', category: 'Sectorial',
    description: 'Clínica veterinaria o tienda de mascotas',
    icon: 'heart', color: '#F97316',
    theme: 'pets', plugins: ['bookly', 'woocommerce', 'contact-form-7', 'wordpress-seo']
  },
  {
    id: 'architecture', name: 'Arquitectura / Diseño de interiores', category: 'Sectorial',
    description: 'Estudio de arquitectura con proyectos y servicios',
    icon: 'buildings', color: '#475569',
    theme: 'architecture', plugins: ['advanced-custom-fields', 'contact-form-7', 'wordpress-seo']
  },

  // ⚙️ APPS / SAAS / TECNOLOGÍA
  {
    id: 'saas-dashboard', name: 'Dashboard SaaS', category: 'SaaS',
    description: 'Panel de control para aplicación SaaS',
    icon: 'speedometer2', color: '#1E40AF',
    theme: 'saas', plugins: ['advanced-custom-fields', 'wordpress-seo', 'wordfence', 'wp-super-cache']
  },
  {
    id: 'crm', name: 'CRM', category: 'SaaS',
    description: 'Gestión de clientes y relaciones comerciales',
    icon: 'people-fill', color: '#0891B2',
    theme: 'saas', plugins: ['advanced-custom-fields', 'gravityforms', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'ai-content', name: 'Generador de contenido IA', category: 'SaaS',
    description: 'Plataforma de generación de contenido con inteligencia artificial',
    icon: 'robot', color: '#7C3AED',
    theme: 'saas', plugins: ['advanced-custom-fields', 'wordpress-seo', 'wordfence', 'wp-super-cache']
  },
  {
    id: 'automation', name: 'Plataforma de automatización', category: 'SaaS',
    description: 'Herramienta de automatización de flujos de trabajo',
    icon: 'gear', color: '#475569',
    theme: 'saas', plugins: ['advanced-custom-fields', 'gravityforms', 'wordpress-seo', 'wordfence']
  },
  {
    id: 'tech-startup', name: 'Startup tecnológica', category: 'SaaS',
    description: 'Web de startup con producto, pricing y blog',
    icon: 'rocket', color: '#6366F1',
    theme: 'startup', plugins: ['advanced-custom-fields', 'wordpress-seo', 'contact-form-7', 'mailchimp-for-wordpress']
  },
  {
    id: 'app-landing', name: 'Landing de aplicación móvil', category: 'SaaS',
    description: 'Página de presentación de app con descarga y features',
    icon: 'phone', color: '#10B981',
    theme: 'app-landing', plugins: ['advanced-custom-fields', 'wordpress-seo', 'contact-form-7']
  },

  // 🎮 ENTRETENIMIENTO / GAMING
  {
    id: 'gaming', name: 'Web de gaming / eSports', category: 'Entretenimiento',
    description: 'Portal gaming con noticias, torneos y comunidad',
    icon: 'controller', color: '#7C3AED',
    theme: 'gaming', plugins: ['bbpress', 'advanced-custom-fields', 'wordpress-seo', 'the-events-calendar']
  },
  {
    id: 'podcast', name: 'Podcast', category: 'Entretenimiento',
    description: 'Web de podcast con episodios, suscripción y player',
    icon: 'mic', color: '#F59E0B',
    theme: 'podcast', plugins: ['advanced-custom-fields', 'wordpress-seo', 'mailchimp-for-wordpress']
  },
  {
    id: 'streaming', name: 'Streaming / Vídeo', category: 'Entretenimiento',
    description: 'Plataforma de contenido en vídeo tipo YouTube',
    icon: 'play-circle', color: '#DC2626',
    theme: 'video', plugins: ['advanced-custom-fields', 'wordpress-seo', 'woocommerce', 'memberpress']
  },
  {
    id: 'influencer', name: 'Influencer / Creator', category: 'Entretenimiento',
    description: 'Web personal de creador de contenido con tienda y blog',
    icon: 'stars', color: '#EC4899',
    theme: 'personal', plugins: ['woocommerce', 'wordpress-seo', 'mailchimp-for-wordpress', 'classic-editor']
  },

  // 🌍 OTROS
  {
    id: 'directory', name: 'Directorio de negocios', category: 'Otros',
    description: 'Listado de empresas o profesionales con búsqueda avanzada',
    icon: 'list-ul', color: '#0891B2',
    theme: 'directory', plugins: ['advanced-custom-fields', 'gravity-forms', 'wordpress-seo', 'wp-google-maps']
  },
  {
    id: 'job-board', name: 'Bolsa de trabajo', category: 'Otros',
    description: 'Portal de empleos con publicación y búsqueda de ofertas',
    icon: 'briefcase', color: '#1E40AF',
    theme: 'jobs', plugins: ['wp-job-manager', 'advanced-custom-fields', 'wordpress-seo', 'contact-form-7']
  },
  {
    id: 'charity', name: 'Donaciones / Crowdfunding', category: 'Otros',
    description: 'Plataforma de recaudación de fondos y donaciones',
    icon: 'gift', color: '#DC2626',
    theme: 'charity', plugins: ['give', 'woocommerce', 'wordpress-seo', 'mailchimp-for-wordpress']
  },
  {
    id: 'multilingual', name: 'Web multiidioma', category: 'Otros',
    description: 'Web disponible en múltiples idiomas',
    icon: 'translate', color: '#0284C7',
    theme: 'corporate', plugins: ['polylang', 'wordpress-seo', 'advanced-custom-fields', 'contact-form-7']
  },
];

export const WEB_TYPE_CATEGORIES = [...new Set(WEB_TYPES.map(t => t.category))];

export function getWebType(id: string): WebType | undefined {
  return WEB_TYPES.find(t => t.id === id);
}

export function getPluginsForType(typeId: string): string[] {
  const type = getWebType(typeId);
  return type?.plugins || [];
}
