const db      = require('../config/db');
const ai      = require('../services/ai.service');
const wpManager = require('../services/wordpress/wp-manager.service');
const fs      = require('fs');
const path    = require('path');

// Helper para obtener proyecto y verificar pertenencia
const getProject = async (projectId, userId) => {
  const [rows] = await db.query(
    'SELECT * FROM projects WHERE id = ? AND user_id = ?',
    [projectId, userId]
  );
  return rows[0] || null;
};

// ============================================
// GENERAR TEXTOS DEL SITIO
// ============================================
exports.generateSiteTexts = async (req, res) => {
  try {
    const { projectId, webType, language } = req.body;
    const project = await getProject(projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });

    const texts = await ai.generateSiteTexts(project.name, webType, language || 'es');
    res.json({ success: true, texts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GENERAR PÁGINAS WP
// ============================================
exports.generateAndCreatePages = async (req, res) => {
  try {
    const { projectId, webType, language } = req.body;
    const project = await getProject(projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (!project.wp_path) return res.status(400).json({ error: 'WordPress no instalado' });

    // Generar contenido con IA
    const { pages } = await ai.generateWpPages(project.name, webType, language || 'es');

    // Crear páginas en WordPress vía WP-CLI
    const created = [];
    for (const page of pages) {
      try {
        const contentEscaped = page.content.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        await wpManager.runWpCli(project.wp_path,
          `post create --post_type=page --post_status=publish --post_title="${page.title}" --post_content="${contentEscaped}" --post_name="${page.slug}"`
        );
        created.push(page.title);
      } catch (e) {
        console.error('Error creando página:', page.title, e.message);
      }
    }

    res.json({ success: true, created, total: created.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GENERAR POST / ARTÍCULO
// ============================================
exports.generatePost = async (req, res) => {
  try {
    const { projectId, webType, topic, language, publish } = req.body;
    const project = await getProject(projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (!project.wp_path) return res.status(400).json({ error: 'WordPress no instalado' });

    const post = await ai.generatePost(project.name, webType, topic, language || 'es');

    if (publish) {
      const contentEscaped = post.content.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      await wpManager.runWpCli(project.wp_path,
        `post create --post_type=post --post_status=publish --post_title="${post.title}" --post_content="${contentEscaped}" --post_name="${post.slug}" --post_excerpt="${post.excerpt}"`
      );
    }

    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// SUGERENCIAS SEO
// ============================================
exports.getSeoSuggestions = async (req, res) => {
  try {
    const { projectId, webType, keywords } = req.body;
    const project = await getProject(projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });

    const suggestions = await ai.generateSeoSuggestions(
      project.name, webType, keywords || []
    );
    res.json({ success: true, suggestions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// CHATBOT
// ============================================
exports.chat = async (req, res) => {
  try {
    const { messages, projectId } = req.body;
    if (!messages || !messages.length) return res.status(400).json({ error: 'Mensajes requeridos' });

    let projectContext = {};
    if (projectId) {
      const project = await getProject(projectId, req.user.id);
      if (project) projectContext = { name: project.name, status: project.status, url: project.wp_url };
    }

    const reply = await ai.chat(messages, projectContext);
    res.json({ success: true, reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GENERAR TEMA WORDPRESS
// ============================================
exports.generateTheme = async (req, res) => {
  try {
    const { projectId, webType, themeConfig } = req.body;
    const project = await getProject(projectId, req.user.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (!project.wp_path) return res.status(400).json({ error: 'WordPress no instalado' });

    const themeData = await ai.generateWpTheme(project.name, webType, themeConfig || {
      primary: '#1e40af', secondary: '#eff6ff',
      fontHeading: 'Inter', fontBody: 'Inter'
    });

    // Crear directorio del tema en WordPress
    const themePath = path.join(project.wp_path, 'wp-content', 'themes', themeData.theme_name);
    fs.mkdirSync(themePath, { recursive: true });

    // Escribir cada archivo del tema
    for (const [filename, content] of Object.entries(themeData.files)) {
      fs.writeFileSync(path.join(themePath, filename), content, 'utf8');
    }

    // Activar el tema
    await wpManager.activateTheme(project.id, themeData.theme_name);

    res.json({ success: true, themeName: themeData.theme_name, files: Object.keys(themeData.files) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================================
// GENERAR TEXTOS PARA EL INSTALADOR (sin proyecto)
// ============================================
exports.generateInstallerTexts = async (req, res) => {
  try {
    const { siteName, webType, language } = req.body;
    if (!siteName || !webType) return res.status(400).json({ error: 'siteName y webType requeridos' });

    const texts = await ai.generateSiteTexts(siteName, webType, language || 'es');
    res.json({ success: true, texts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
