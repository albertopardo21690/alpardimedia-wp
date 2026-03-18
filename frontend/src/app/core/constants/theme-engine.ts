// ============================================
// THEME ENGINE — Alpardimedia WP
// Temas WordPress por tipo de web
// ============================================

export interface ThemeConfig {
  slug:        string;
  name:        string;
  description: string;
  colors: {
    primary:    string;
    secondary:  string;
    accent:     string;
    background: string;
    text:       string;
  };
  fonts: {
    heading: string;
    body:    string;
  };
  layout: 'fullwidth' | 'boxed' | 'sidebar-left' | 'sidebar-right';
  style:  'minimal' | 'bold' | 'elegant' | 'modern' | 'classic' | 'dark';
}

export const THEME_CATALOG: Record<string, ThemeConfig> = {

  shop: {
    slug: 'storefront', name: 'Storefront',
    description: 'Tema oficial de WooCommerce, limpio y optimizado para tiendas',
    colors: { primary: '#7f54b3', secondary: '#c9b8ea', accent: '#f90', background: '#f8f8f8', text: '#333' },
    fonts: { heading: 'Playfair Display', body: 'Source Sans Pro' },
    layout: 'fullwidth', style: 'modern'
  },
  digital: {
    slug: 'neve', name: 'Neve',
    description: 'Tema ligero y rápido para productos digitales',
    colors: { primary: '#0366d6', secondary: '#e8f0fe', accent: '#6366f1', background: '#fff', text: '#222' },
    fonts: { heading: 'Inter', body: 'Inter' },
    layout: 'fullwidth', style: 'minimal'
  },
  education: {
    slug: 'astra', name: 'Astra',
    description: 'Tema multipropósito ideal para educación y cursos',
    colors: { primary: '#4f46e5', secondary: '#e0e7ff', accent: '#f59e0b', background: '#f9fafb', text: '#1f2937' },
    fonts: { heading: 'Poppins', body: 'Poppins' },
    layout: 'boxed', style: 'modern'
  },
  membership: {
    slug: 'oceanwp', name: 'OceanWP',
    description: 'Versátil y personalizable para membresías y comunidades',
    colors: { primary: '#8b5cf6', secondary: '#f5f3ff', accent: '#d97706', background: '#fff', text: '#374151' },
    fonts: { heading: 'Montserrat', body: 'Open Sans' },
    layout: 'boxed', style: 'elegant'
  },
  marketplace: {
    slug: 'storefront', name: 'Storefront',
    description: 'Optimizado para marketplaces con múltiples vendedores',
    colors: { primary: '#f97316', secondary: '#fff7ed', accent: '#1e293b', background: '#f8fafc', text: '#0f172a' },
    fonts: { heading: 'Roboto', body: 'Roboto' },
    layout: 'fullwidth', style: 'bold'
  },
  blog: {
    slug: 'twentytwentyfour', name: 'Twenty Twenty-Four',
    description: 'Tema oficial WordPress para blogs modernos y elegantes',
    colors: { primary: '#1a1a1a', secondary: '#f5f5f5', accent: '#3b82f6', background: '#fff', text: '#1a1a1a' },
    fonts: { heading: 'Cardo', body: 'System UI' },
    layout: 'sidebar-right', style: 'minimal'
  },
  magazine: {
    slug: 'neve', name: 'Neve',
    description: 'Diseño de revista con múltiples layouts y tipografías',
    colors: { primary: '#dc2626', secondary: '#fef2f2', accent: '#1e293b', background: '#f8fafc', text: '#0f172a' },
    fonts: { heading: 'Playfair Display', body: 'Lora' },
    layout: 'sidebar-right', style: 'classic'
  },
  news: {
    slug: 'neve', name: 'Neve',
    description: 'Portal de noticias con grid de artículos y breaking news',
    colors: { primary: '#dc2626', secondary: '#fef2f2', accent: '#1e293b', background: '#f1f5f9', text: '#0f172a' },
    fonts: { heading: 'Roboto Condensed', body: 'Roboto' },
    layout: 'sidebar-left', style: 'bold'
  },
  corporate: {
    slug: 'astra', name: 'Astra',
    description: 'Profesional y limpio para webs corporativas',
    colors: { primary: '#1e40af', secondary: '#eff6ff', accent: '#0ea5e9', background: '#fff', text: '#0f172a' },
    fonts: { heading: 'Inter', body: 'Inter' },
    layout: 'fullwidth', style: 'modern'
  },
  landing: {
    slug: 'kadence', name: 'Kadence',
    description: 'Landing pages de alta conversión con bloques visuales',
    colors: { primary: '#7c3aed', secondary: '#f5f3ff', accent: '#f59e0b', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Poppins', body: 'Nunito' },
    layout: 'fullwidth', style: 'bold'
  },
  portfolio: {
    slug: 'twentytwentytwo', name: 'Twenty Twenty-Two',
    description: 'Minimalista y visual para portfolios creativos',
    colors: { primary: '#ec4899', secondary: '#fdf2f8', accent: '#0f172a', background: '#fff', text: '#1a1a1a' },
    fonts: { heading: 'DM Serif Display', body: 'Jost' },
    layout: 'fullwidth', style: 'minimal'
  },
  personal: {
    slug: 'neve', name: 'Neve',
    description: 'Cálido y personal para marcas personales e influencers',
    colors: { primary: '#d97706', secondary: '#fffbeb', accent: '#7c3aed', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Playfair Display', body: 'Lato' },
    layout: 'fullwidth', style: 'elegant'
  },
  agency: {
    slug: 'kadence', name: 'Kadence',
    description: 'Impactante y creativo para agencias digitales',
    colors: { primary: '#0f172a', secondary: '#f8fafc', accent: '#3b82f6', background: '#fff', text: '#0f172a' },
    fonts: { heading: 'Sora', body: 'Plus Jakarta Sans' },
    layout: 'fullwidth', style: 'dark'
  },
  community: {
    slug: 'oceanwp', name: 'OceanWP',
    description: 'Dinámico para foros y comunidades activas',
    colors: { primary: '#10b981', secondary: '#ecfdf5', accent: '#3b82f6', background: '#f8fafc', text: '#1f2937' },
    fonts: { heading: 'Nunito', body: 'Nunito' },
    layout: 'sidebar-right', style: 'modern'
  },
  realestate: {
    slug: 'astra', name: 'Astra',
    description: 'Listados de propiedades y búsqueda avanzada',
    colors: { primary: '#0891b2', secondary: '#ecfeff', accent: '#0f172a', background: '#f8fafc', text: '#1e293b' },
    fonts: { heading: 'Raleway', body: 'Open Sans' },
    layout: 'fullwidth', style: 'modern'
  },
  restaurant: {
    slug: 'neve', name: 'Neve',
    description: 'Apetecible y visual para restaurantes y hostelería',
    colors: { primary: '#dc2626', secondary: '#fef2f2', accent: '#d97706', background: '#1a0a00', text: '#fff' },
    fonts: { heading: 'Playfair Display', body: 'Lato' },
    layout: 'fullwidth', style: 'dark'
  },
  hotel: {
    slug: 'kadence', name: 'Kadence',
    description: 'Lujoso y elegante para hoteles y alojamientos',
    colors: { primary: '#0284c7', secondary: '#f0f9ff', accent: '#d97706', background: '#fff', text: '#0f172a' },
    fonts: { heading: 'Cormorant Garamond', body: 'Raleway' },
    layout: 'fullwidth', style: 'elegant'
  },
  events: {
    slug: 'oceanwp', name: 'OceanWP',
    description: 'Festivo y visual para eventos, bodas y conciertos',
    colors: { primary: '#ec4899', secondary: '#fdf2f8', accent: '#7c3aed', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Dancing Script', body: 'Lato' },
    layout: 'fullwidth', style: 'elegant'
  },
  health: {
    slug: 'astra', name: 'Astra',
    description: 'Limpio y de confianza para clínicas y centros de salud',
    colors: { primary: '#10b981', secondary: '#ecfdf5', accent: '#0284c7', background: '#f8fafc', text: '#1f2937' },
    fonts: { heading: 'Nunito', body: 'Nunito' },
    layout: 'sidebar-right', style: 'minimal'
  },
  fitness: {
    slug: 'neve', name: 'Neve',
    description: 'Energético y motivador para gimnasios y fitness',
    colors: { primary: '#f97316', secondary: '#fff7ed', accent: '#0f172a', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Oswald', body: 'Source Sans Pro' },
    layout: 'fullwidth', style: 'bold'
  },
  spiritual: {
    slug: 'neve', name: 'Neve',
    description: 'Sereno y místico para terapias y espiritualidad',
    colors: { primary: '#7c3aed', secondary: '#f5f3ff', accent: '#d97706', background: '#faf5ff', text: '#1f2937' },
    fonts: { heading: 'Cormorant Garamond', body: 'Lato' },
    layout: 'fullwidth', style: 'elegant'
  },
  saas: {
    slug: 'astra', name: 'Astra',
    description: 'Moderno y tecnológico para SaaS y dashboards',
    colors: { primary: '#1e40af', secondary: '#eff6ff', accent: '#6366f1', background: '#f8fafc', text: '#0f172a' },
    fonts: { heading: 'Inter', body: 'Inter' },
    layout: 'fullwidth', style: 'modern'
  },
  startup: {
    slug: 'kadence', name: 'Kadence',
    description: 'Disruptivo y dinámico para startups tecnológicas',
    colors: { primary: '#6366f1', secondary: '#eef2ff', accent: '#10b981', background: '#fff', text: '#0f172a' },
    fonts: { heading: 'Sora', body: 'Inter' },
    layout: 'fullwidth', style: 'bold'
  },
  gaming: {
    slug: 'neve', name: 'Neve',
    description: 'Oscuro y potente para comunidades gaming y eSports',
    colors: { primary: '#7c3aed', secondary: '#1a1a2e', accent: '#10b981', background: '#0d0d1a', text: '#e2e8f0' },
    fonts: { heading: 'Rajdhani', body: 'Exo 2' },
    layout: 'fullwidth', style: 'dark'
  },
  podcast: {
    slug: 'neve', name: 'Neve',
    description: 'Moderno y audaz para podcasts y contenido de audio',
    colors: { primary: '#f59e0b', secondary: '#fffbeb', accent: '#1f2937', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Montserrat', body: 'Open Sans' },
    layout: 'fullwidth', style: 'bold'
  },
  ngo: {
    slug: 'astra', name: 'Astra',
    description: 'Empático y humano para ONGs y fundaciones',
    colors: { primary: '#65a30d', secondary: '#f7fee7', accent: '#0284c7', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Merriweather', body: 'Source Sans Pro' },
    layout: 'sidebar-right', style: 'classic'
  },
  photography: {
    slug: 'twentytwentyone', name: 'Twenty Twenty-One',
    description: 'Minimalista y visual para fotógrafos y videógrafos',
    colors: { primary: '#000', secondary: '#f5f5f5', accent: '#3b82f6', background: '#fff', text: '#1a1a1a' },
    fonts: { heading: 'DM Serif Display', body: 'DM Sans' },
    layout: 'fullwidth', style: 'minimal'
  },
  cv: {
    slug: 'neve', name: 'Neve',
    description: 'Limpio y profesional para CVs y portfolios personales',
    colors: { primary: '#6366f1', secondary: '#eef2ff', accent: '#0f172a', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Raleway', body: 'Open Sans' },
    layout: 'boxed', style: 'minimal'
  },
  wiki: {
    slug: 'astra', name: 'Astra',
    description: 'Estructurado y navegable para wikis y documentación',
    colors: { primary: '#0891b2', secondary: '#ecfeff', accent: '#1e293b', background: '#f8fafc', text: '#1e293b' },
    fonts: { heading: 'Inter', body: 'Inter' },
    layout: 'sidebar-left', style: 'minimal'
  },
  beauty: {
    slug: 'neve', name: 'Neve',
    description: 'Elegante y femenino para salones de belleza y spas',
    colors: { primary: '#ec4899', secondary: '#fdf2f8', accent: '#d97706', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Cormorant Garamond', body: 'Lato' },
    layout: 'fullwidth', style: 'elegant'
  },
  travel: {
    slug: 'oceanwp', name: 'OceanWP',
    description: 'Aventurero y visual para agencias de viajes',
    colors: { primary: '#0891b2', secondary: '#ecfeff', accent: '#f59e0b', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Raleway', body: 'Open Sans' },
    layout: 'fullwidth', style: 'bold'
  },
  coaching: {
    slug: 'astra', name: 'Astra',
    description: 'Motivador y profesional para coaches y mentores',
    colors: { primary: '#f59e0b', secondary: '#fffbeb', accent: '#7c3aed', background: '#fff', text: '#1f2937' },
    fonts: { heading: 'Montserrat', body: 'Nunito' },
    layout: 'fullwidth', style: 'modern'
  },
};

export function getThemeForWebType(themeId: string): ThemeConfig {
  return THEME_CATALOG[themeId] || THEME_CATALOG['corporate'];
}

export const POPULAR_THEMES = ['astra', 'neve', 'kadence', 'oceanwp', 'storefront',
  'twentytwentyfour', 'twentytwentythree', 'twentytwentytwo', 'twentytwentyone'];
