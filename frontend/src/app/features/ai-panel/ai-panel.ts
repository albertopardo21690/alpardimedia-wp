import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AiService } from '../../core/services/ai';
import { UiService } from '../../core/services/ui';
import { WEB_TYPES } from '../../core/constants/web-types';

interface ChatMessage {
  role:    'user' | 'assistant';
  content: string;
}

@Component({
  selector:    'app-ai-panel',
  standalone:  true,
  imports:     [CommonModule, FormsModule, RouterLink],
  templateUrl: './ai-panel.html',
  styleUrl:    './ai-panel.scss'
})
export class AiPanelComponent implements OnInit {
  projectId   = 0;
  projectName = '';
  activeTab   = 'chat';
  webType     = '';
  language    = 'es';

  chatMessages: ChatMessage[] = [];
  chatInput    = '';
  chatLoading  = false;

  pagesResult: any  = null;
  pagesLoading      = false;

  postTopic         = '';
  postPublish       = false;
  postResult: any   = null;
  postLoading       = false;

  seoKeywords       = '';
  seoResult: any    = null;
  seoLoading        = false;

  siteTexts: any    = null;
  textsLoading      = false;

  themeColors = { primary: '#1e40af', secondary: '#eff6ff', accent: '#3b82f6' };
  themeFonts  = { heading: 'Inter', body: 'Inter' };
  themeResult: any  = null;
  themeLoading      = false;

  textItems = [
    { key: 'tagline',       label: 'Tagline' },
    { key: 'hero_title',    label: 'Hero Title' },
    { key: 'hero_subtitle', label: 'Hero Subtitle' },
    { key: 'about_title',   label: 'About Title' },
    { key: 'about_text',    label: 'About Text' },
    { key: 'cta_text',      label: 'CTA Button' },
    { key: 'footer_text',   label: 'Footer Text' },
  ];
  fontOptions     = ['Inter','Poppins','Montserrat','Playfair Display','Raleway','Oswald','Merriweather','Lato','Nunito','Sora'];
  bodyFontOptions = ['Inter','Open Sans','Roboto','Lato','Source Sans Pro','Nunito','Plus Jakarta Sans'];
  webTypes  = WEB_TYPES;
  languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'ca', label: 'Català' },
    { value: 'gl', label: 'Galego' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ];

  tabs = [
    { id: 'chat',  label: 'Asistente', icon: 'chat-dots' },
    { id: 'pages', label: 'Páginas',   icon: 'layout-text-window' },
    { id: 'posts', label: 'Posts',     icon: 'pencil-square' },
    { id: 'seo',   label: 'SEO',       icon: 'graph-up-arrow' },
    { id: 'texts', label: 'Textos',    icon: 'type' },
    { id: 'theme', label: 'Tema IA',   icon: 'palette' },
  ];

  constructor(
    private aiService: AiService,
    private ui: UiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? Number(idParam) : 0;
    this.chatMessages = [{
      role:    'assistant',
      content: '¡Hola! 👋 Soy tu asistente de Alpardimedia WP. Puedo ayudarte con la gestión de WordPress, SEO, contenido y mucho más. ¿En qué te ayudo hoy?'
    }];
  }

  sendMessage() {
    if (!this.chatInput.trim() || this.chatLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: this.chatInput };
    this.chatMessages.push(userMsg);
    this.chatInput   = '';
    this.chatLoading = true;
    const msgs = this.chatMessages.map(m => ({ role: m.role, content: m.content }));
    this.aiService.chat(msgs, this.projectId).subscribe({
      next: (res) => {
        this.chatMessages.push({ role: 'assistant', content: res.reply });
        this.chatLoading = false;
        setTimeout(() => this.scrollChat(), 100);
      },
      error: (err) => {
        this.chatMessages.push({ role: 'assistant', content: '⚠️ ' + (err.error?.error || 'Error') });
        this.chatLoading = false;
      }
    });
  }

  scrollChat() {
    const el = document.getElementById('chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  onChatKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); }
  }

  clearChat() { this.chatMessages = [this.chatMessages[0]]; }

  generatePages() {
    if (!this.webType) { this.ui.error('Selecciona el tipo de web'); return; }
    this.pagesLoading = true;
    this.pagesResult  = null;
    this.aiService.generatePages(this.projectId, this.webType, this.language).subscribe({
      next: (res) => { this.pagesResult = res; this.pagesLoading = false; this.ui.success(res.created?.length + ' páginas creadas'); },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.pagesLoading = false; }
    });
  }

  generatePost() {
    if (!this.postTopic.trim()) { this.ui.error('Escribe un tema'); return; }
    if (!this.webType) { this.ui.error('Selecciona el tipo de web'); return; }
    this.postLoading = true;
    this.postResult  = null;
    this.aiService.generatePost(this.projectId, this.webType, this.postTopic, this.language, this.postPublish).subscribe({
      next: (res) => { this.postResult = res.post; this.postLoading = false; this.ui.success(this.postPublish ? 'Post publicado' : 'Post generado'); },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.postLoading = false; }
    });
  }

  getSeoSuggestions() {
    if (!this.webType) { this.ui.error('Selecciona el tipo de web'); return; }
    this.seoLoading = true;
    this.seoResult  = null;
    const keywords  = this.seoKeywords.split(',').map(k => k.trim()).filter(Boolean);
    this.aiService.getSeoSuggestions(this.projectId, this.webType, keywords).subscribe({
      next: (res) => { this.seoResult = res.suggestions; this.seoLoading = false; },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.seoLoading = false; }
    });
  }

  generateSiteTexts() {
    if (!this.webType) { this.ui.error('Selecciona el tipo de web'); return; }
    this.textsLoading = true;
    this.siteTexts    = null;
    this.aiService.generateSiteTexts(this.projectId, this.webType, this.language).subscribe({
      next: (res) => { this.siteTexts = res.texts; this.textsLoading = false; },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.textsLoading = false; }
    });
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text);
    this.ui.success('Copiado al portapapeles');
  }

  generateTheme() {
    if (!this.webType) { this.ui.error('Selecciona el tipo de web'); return; }
    this.themeLoading = true;
    this.themeResult  = null;
    this.aiService.generateTheme(this.projectId, this.webType, {
      primary:     this.themeColors.primary,
      secondary:   this.themeColors.secondary,
      accent:      this.themeColors.accent,
      fontHeading: this.themeFonts.heading,
      fontBody:    this.themeFonts.body
    }).subscribe({
      next: (res) => { this.themeResult = res; this.themeLoading = false; this.ui.success('Tema generado y activado'); },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.themeLoading = false; }
    });
  }
}
