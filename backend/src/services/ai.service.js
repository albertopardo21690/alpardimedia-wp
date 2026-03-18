const https = require('https');

const ask = async (system, prompt, maxTokens = 2000) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages:   [{ role: 'user', content: prompt }]
    });
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
        'content-length':    Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content[0].text);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

// ============================================
// GENERADOR DE TEXTOS PARA EL INSTALADOR
// ============================================
exports.generateSiteTexts = async (siteName, webType, language = 'es') => {
  const system = `Eres un experto en copywriting y marketing digital.
Genera textos profesionales para webs en ${language === 'es' ? 'español' : 'inglés'}.
Responde SOLO con un objeto JSON válido, sin markdown, sin explicaciones.`;

  const prompt = `Genera textos para una web de tipo "${webType}" llamada "${siteName}".
Devuelve EXACTAMENTE este JSON:
{
  "tagline": "frase corta impactante (máx 8 palabras)",
  "hero_title": "título principal del hero (máx 10 palabras)",
  "hero_subtitle": "subtítulo descriptivo (máx 20 palabras)",
  "about_title": "título sección sobre nosotros",
  "about_text": "párrafo sobre nosotros (50-80 palabras)",
  "services_title": "título sección servicios",
  "services": [
    {"title": "servicio 1", "description": "descripción breve"},
    {"title": "servicio 2", "description": "descripción breve"},
    {"title": "servicio 3", "description": "descripción breve"}
  ],
  "cta_text": "texto del botón principal",
  "footer_text": "texto breve del footer"
}`;

  const raw = await ask(system, prompt, 1500);
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
};

// ============================================
// GENERADOR DE PÁGINAS WP
// ============================================
exports.generateWpPages = async (siteName, webType, language = 'es') => {
  const system = `Eres un experto en WordPress y creación de contenido web.
Genera contenido HTML semántico y profesional para páginas WordPress.
Responde SOLO con un objeto JSON válido, sin markdown, sin explicaciones.`;

  const prompt = `Genera las páginas principales para una web de tipo "${webType}" llamada "${siteName}".
Devuelve EXACTAMENTE este JSON con páginas en ${language === 'es' ? 'español' : 'inglés'}:
{
  "pages": [
    {
      "title": "Inicio",
      "slug": "inicio",
      "content": "contenido HTML completo de la página de inicio",
      "meta_description": "descripción SEO de 155 caracteres"
    },
    {
      "title": "Sobre nosotros",
      "slug": "sobre-nosotros",
      "content": "contenido HTML completo",
      "meta_description": "descripción SEO"
    },
    {
      "title": "Servicios",
      "slug": "servicios",
      "content": "contenido HTML completo",
      "meta_description": "descripción SEO"
    },
    {
      "title": "Contacto",
      "slug": "contacto",
      "content": "contenido HTML con formulario de contacto",
      "meta_description": "descripción SEO"
    }
  ]
}`;

  const raw = await ask(system, prompt, 3000);
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
};

// ============================================
// GENERADOR DE POSTS / ARTÍCULOS
// ============================================
exports.generatePost = async (siteName, webType, topic, language = 'es') => {
  const system = `Eres un experto en content marketing y SEO.
Genera artículos de blog optimizados para SEO con estructura HTML.
Responde SOLO con un objeto JSON válido, sin markdown, sin explicaciones.`;

  const prompt = `Genera un artículo de blog para "${siteName}" (${webType}) sobre: "${topic}".
Idioma: ${language === 'es' ? 'español' : 'inglés'}.
Devuelve EXACTAMENTE este JSON:
{
  "title": "título SEO optimizado",
  "slug": "slug-url-amigable",
  "excerpt": "resumen de 155 caracteres",
  "content": "contenido HTML completo del artículo (mínimo 500 palabras) con h2, h3, párrafos, listas",
  "meta_title": "meta title SEO (60 chars)",
  "meta_description": "meta description (155 chars)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "categories": ["categoría principal"]
}`;

  const raw = await ask(system, prompt, 3000);
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
};

// ============================================
// SUGERENCIAS SEO
// ============================================
exports.generateSeoSuggestions = async (siteName, webType, targetKeywords = []) => {
  const system = `Eres un experto en SEO técnico y estrategia de contenidos.
Responde SOLO con un objeto JSON válido, sin markdown, sin explicaciones.`;

  const prompt = `Genera sugerencias SEO para "${siteName}" (${webType}).
Keywords objetivo: ${targetKeywords.join(', ') || 'auto-detectar'}.
Devuelve EXACTAMENTE este JSON:
{
  "primary_keyword": "keyword principal",
  "secondary_keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
  "meta_title": "meta title optimizado (60 chars)",
  "meta_description": "meta description (155 chars)",
  "h1": "H1 principal recomendado",
  "content_ideas": [
    {"title": "idea artículo 1", "keyword": "keyword"},
    {"title": "idea artículo 2", "keyword": "keyword"},
    {"title": "idea artículo 3", "keyword": "keyword"},
    {"title": "idea artículo 4", "keyword": "keyword"},
    {"title": "idea artículo 5", "keyword": "keyword"}
  ],
  "technical_tips": ["tip técnico 1", "tip técnico 2", "tip técnico 3"]
}`;

  const raw = await ask(system, prompt, 1500);
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
};

// ============================================
// CHATBOT ASISTENTE
// ============================================
exports.chat = async (messages, projectContext = {}) => {
  const system = `Eres el asistente de Alpardimedia WP, una plataforma de gestión WordPress.
Ayudas a los usuarios con:
- Gestión de WordPress (plugins, temas, páginas, usuarios)
- SEO y optimización web
- Resolución de problemas técnicos
- Sugerencias de contenido y diseño

Contexto del proyecto actual: ${JSON.stringify(projectContext)}

Responde siempre en español de forma concisa y práctica.
Si no sabes algo, dilo claramente.`;

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 1000,
      system,
      messages
    });
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
        'content-length':    Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content[0].text);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

// ============================================
// GENERADOR DE THEMES WORDPRESS
// Según WordPress Developer Documentation
// ============================================
exports.generateWpTheme = async (siteName, webType, themeConfig) => {
  const system = `Eres un experto desarrollador de temas WordPress.
Conoces perfectamente la WordPress Theme Developer Handbook (https://developer.wordpress.org/themes/).
Generas temas WordPress profesionales y válidos.
Responde SOLO con un objeto JSON válido, sin markdown adicional.`;

  const prompt = `Genera un tema WordPress completo para "${siteName}" (${webType}).
Config: colores primario=${themeConfig.primary}, secundario=${themeConfig.secondary}, fuente heading=${themeConfig.fontHeading}, fuente body=${themeConfig.fontBody}.

Devuelve EXACTAMENTE este JSON con el código de cada archivo:
{
  "theme_name": "nombre-slug-del-tema",
  "files": {
    "style.css": "/* Theme Name: ${siteName}\\nTheme URI: https://alpardimedia.es\\nDescription: Tema generado por IA\\nVersion: 1.0.0\\nAuthor: Alpardimedia\\n*/\\n\\n/* CSS variables y estilos completos */",
    "functions.php": "<?php\\n// functions.php completo con enqueue scripts, theme support, menus, widgets",
    "index.php": "<?php get_header(); ?>\\n<!-- index.php completo -->\\n<?php get_footer(); ?>",
    "header.php": "<!DOCTYPE html>\\n<!-- header.php completo con wp_head() -->",
    "footer.php": "<!-- footer.php completo con wp_footer() -->",
    "sidebar.php": "<!-- sidebar.php con dynamic_sidebar() -->",
    "single.php": "<?php get_header(); ?>\\n<!-- single.php para posts -->\\n<?php get_footer(); ?>",
    "page.php": "<?php get_header(); ?>\\n<!-- page.php para páginas estáticas -->\\n<?php get_footer(); ?>",
    "archive.php": "<?php get_header(); ?>\\n<!-- archive.php -->\\n<?php get_footer(); ?>",
    "404.php": "<?php get_header(); ?>\\n<!-- 404.php -->\\n<?php get_footer(); ?>",
    "theme.json": "{ \\"version\\": 2, \\"settings\\": { \\"color\\": { \\"palette\\": [] }, \\"typography\\": {} } }"
  }
}`;

  const raw = await ask(system, prompt, 4000);
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
};
