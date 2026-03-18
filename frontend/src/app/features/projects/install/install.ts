import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects';
import { WordpressService } from '../../../core/services/wordpress';
import { UiService } from '../../../core/services/ui';
import { Subject } from 'rxjs';
import { WEB_TYPES, WEB_TYPE_CATEGORIES, WebType, getPluginsForType } from '../../../core/constants/web-types';
import { getThemeForWebType, ThemeConfig } from '../../../core/constants/theme-engine';

@Component({
  selector: 'app-install',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './install.html',
  styleUrl:    './install.scss'
})
export class InstallComponent implements OnDestroy {
  private destroy = new Subject<void>();

  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  step4: FormGroup;

  currentStep = 0;
  selectedTypeId  = '';
  selectedTheme: ThemeConfig | null = null;
  typeSearchQuery = '';
  typeCategory    = 'Todos';
  webTypes        = WEB_TYPES;
  typeCategories  = ['Todos', ...WEB_TYPE_CATEGORIES];
  totalSteps  = 7;
  stepLabels  = ['Tipo de web', 'Proyecto', 'Base de datos', 'Administrador', 'Configuración', 'Plugins', 'Instalar'];

  installing      = false;
  installed       = false;
  error           = '';
  result: any     = null;
  wpConfigPreview = '';

  hideDbPassword    = true;
  hideAdminPassword = true;

  dbValidating        = false;
  dbValid: boolean | null = null;
  dbMessage           = '';

  progressValue      = 0;
  currentInstallStep = 0;

  selectedPlugins: string[] = [];

  installSteps = [
    { label: 'Descargando WordPress',      icon: 'download',     done: false },
    { label: 'Extrayendo archivos',         icon: 'archive',      done: false },
    { label: 'Configurando base de datos',  icon: 'database',     done: false },
    { label: 'Instalando WordPress',        icon: 'globe',        done: false },
    { label: 'Instalando plugins',          icon: 'puzzle',       done: false },
    { label: 'Finalizando instalación',     icon: 'check-circle', done: false },
  ];

  popularPlugins = [
    { slug: 'woocommerce',            name: 'WooCommerce',    icon: 'cart3' },
    { slug: 'yoast-seo',              name: 'Yoast SEO',      icon: 'search' },
    { slug: 'elementor',              name: 'Elementor',      icon: 'columns-gap' },
    { slug: 'contact-form-7',         name: 'Contact Form 7', icon: 'envelope' },
    { slug: 'wordfence',              name: 'Wordfence Security', icon: 'shield-check' },
    { slug: 'wp-super-cache',         name: 'WP Super Cache', icon: 'lightning-charge' },
    { slug: 'classic-editor',         name: 'Classic Editor', icon: 'pencil-square' },
    { slug: 'advanced-custom-fields', name: 'Advanced Custom Fields', icon: 'list-ul' },
    { slug: 'wp-migrate-db',          name: 'WP Migrate DB',  icon: 'arrow-repeat' },
  ];

  wpVersions = [
    { value: 'latest',  label: 'Última versión (recomendado)' },
    { value: '6.7.2',   label: 'WordPress 6.7.2' },
    { value: '6.6.2',   label: 'WordPress 6.6.2' },
    { value: '6.5.5',   label: 'WordPress 6.5.5' },
    { value: '6.4.3',   label: 'WordPress 6.4.3' },
    { value: '6.3.4',   label: 'WordPress 6.3.4' },
  ];

  languages = [
    { value: 'es_ES', label: 'Español' },
    { value: 'en_US', label: 'English' },
    { value: 'ca',    label: 'Català' },
    { value: 'gl_ES', label: 'Galego' },
    { value: 'fr_FR', label: 'Français' },
    { value: 'de_DE', label: 'Deutsch' },
    { value: 'pt_PT', label: 'Português' },
    { value: 'it_IT', label: 'Italiano' },
  ];

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private wordpressService: WordpressService,
    private ui: UiService,
    private router: Router
  ) {
    this.step1 = this.fb.group({
      name:        ['', Validators.required],
      description: ['']
    });
    this.step2 = this.fb.group({
      dbName:     ['', Validators.required],
      dbUser:     ['root', Validators.required],
      dbPassword: [''],
      dbHost:     ['localhost', Validators.required],
      dbPrefix:   ['wp_', [Validators.required, Validators.pattern(/^[a-zA-Z_]+$/)]]
    });
    this.step3 = this.fb.group({
      adminUser:     ['admin', Validators.required],
      adminPassword: ['', [Validators.required, Validators.minLength(8)]],
      adminEmail:    ['', [Validators.required, Validators.email]]
    });
    this.step4 = this.fb.group({
      siteName:        ['', Validators.required],
      siteDescription: [''],
      language:        ['es_ES'],
      version:         ['latest']
    });
  }

  ngOnDestroy() { this.destroy.next(); this.destroy.complete(); }

  get filteredTypes(): WebType[] {
    let types = this.webTypes;
    if (this.typeCategory !== 'Todos') types = types.filter(t => t.category === this.typeCategory);
    if (this.typeSearchQuery.trim()) {
      const q = this.typeSearchQuery.toLowerCase();
      types = types.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return types;
  }

  selectWebType(type: WebType) {
    this.selectedTypeId = type.id;
    this.selectedPlugins = [...type.plugins];
    this.selectedTheme   = getThemeForWebType(type.theme);
    if (!this.step1.value.name) {
      this.step1.patchValue({ name: type.name });
    }
  }

  prevStep() { if (this.currentStep > 0) this.currentStep--; }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) this.currentStep++;
    if (this.currentStep === 6) this.loadPreview();
  }

  canNext(): boolean {
    if (this.currentStep === 0) return !!this.selectedTypeId;
    const forms: Record<number, FormGroup> = {
      1: this.step1, 2: this.step2, 3: this.step3, 4: this.step4
    };
    const form = forms[this.currentStep];
    return form ? form.valid : true;
  }

  togglePlugin(slug: string) {
    const idx = this.selectedPlugins.indexOf(slug);
    if (idx > -1) this.selectedPlugins.splice(idx, 1);
    else this.selectedPlugins.push(slug);
  }

  isPluginSelected(slug: string): boolean {
    return this.selectedPlugins.includes(slug);
  }

  generatePassword(field: string) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    const pwd   = Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    if (field === 'dbPassword')    this.step2.patchValue({ dbPassword: pwd });
    if (field === 'adminPassword') this.step3.patchValue({ adminPassword: pwd });
  }

  loadPreview() {
    const v2 = this.step2.value;
    this.wpConfigPreview = `<?php
define( 'DB_NAME',     '${v2.dbName}' );
define( 'DB_USER',     '${v2.dbUser}' );
define( 'DB_PASSWORD', '**********' );
define( 'DB_HOST',     '${v2.dbHost}' );
define( 'DB_CHARSET',  'utf8mb4' );
$table_prefix = '${v2.dbPrefix}';`;
  }

  saveDraft() {
    localStorage.setItem('install_draft', JSON.stringify({
      step1: this.step1.value, step2: this.step2.value,
      step3: this.step3.value, step4: this.step4.value
    }));
    this.ui.success('Borrador guardado');
  }

  install() {
    if (this.installing) return;
    this.installing = true;
    this.error      = '';
    this.progressValue      = 0;
    this.currentInstallStep = 0;
    this.installSteps.forEach(s => s.done = false);

    const v1 = this.step1.value;
    const v2 = this.step2.value;
    const v3 = this.step3.value;
    const v4 = this.step4.value;

    this.projectsService.create({ name: v1.name, description: v1.description }).subscribe({
      next: (project: any) => {
        const interval = setInterval(() => {
          if (this.currentInstallStep < this.installSteps.length) {
            this.installSteps[this.currentInstallStep].done = true;
            this.currentInstallStep++;
            this.progressValue = Math.round((this.currentInstallStep / this.installSteps.length) * 90);
          }
        }, 1200);

        this.wordpressService.install({
          projectId: project.id,
          config: {
            siteName:        v4.siteName,
            siteDescription: v4.siteDescription,
            dbName:          v2.dbName,
            dbUser:          v2.dbUser,
            dbPassword:      v2.dbPassword,
            dbHost:          v2.dbHost,
            dbPrefix:        v2.dbPrefix,
            adminUser:       v3.adminUser,
            adminPassword:   v3.adminPassword,
            adminEmail:      v3.adminEmail,
            language:        v4.language
          },
          plugins: this.selectedPlugins,
          theme:   this.selectedTheme?.slug || 'astra'
        }).subscribe({
          next: (res: any) => {
            clearInterval(interval);
            this.installSteps.forEach(s => s.done = true);
            this.progressValue = 100;
            this.result        = res;
            this.installed     = true;
            this.installing    = false;
            localStorage.removeItem('install_draft');
          },
          error: (err: any) => {
            clearInterval(interval);
            this.error      = err.error?.error || 'Error durante la instalación';
            this.installing = false;
          }
        });
      },
      error: (err: any) => {
        this.error      = err.error?.error || 'Error al crear el proyecto';
        this.installing = false;
      }
    });
  }

  goToDashboard() { this.router.navigate(['/dashboard']); }
}
