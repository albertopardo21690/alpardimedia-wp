import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectsService } from '../../../core/services/projects';
import { WordpressService } from '../../../core/services/wordpress';
import { UiService } from '../../../core/services/ui';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

interface InstallStep {
  label: string;
  icon:  string;
  done:  boolean;
}

@Component({
  selector: 'app-install',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatStepperModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSelectModule,
    MatProgressSpinnerModule, MatProgressBarModule,
    MatCheckboxModule, MatTooltipModule, MatChipsModule,
    MatExpansionModule
  ],
  templateUrl: './install.html',
  styleUrl:    './install.scss'
})
export class InstallComponent implements OnInit, OnDestroy {
  private api     = environment.apiUrl + '/wordpress';
  private destroy = new Subject<void>();

  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  step4: FormGroup;
  step5: FormGroup;

  installing    = false;
  installed     = false;
  error         = '';
  result: any   = null;
  wpConfigPreview = '';
  showPreview   = false;

  // Validación BD
  dbValidating  = false;
  dbValid:      boolean | null = null;
  dbMessage     = '';

  // Progreso instalación
  installSteps: InstallStep[] = [
    { label: 'Creando proyecto',         icon: 'folder',        done: false },
    { label: 'Descargando WordPress',    icon: 'download',      done: false },
    { label: 'Extrayendo archivos',      icon: 'folder_zip',    done: false },
    { label: 'Generando wp-config.php',  icon: 'settings',      done: false },
    { label: 'Creando base de datos',    icon: 'storage',       done: false },
    { label: 'Instalando WordPress',     icon: 'language',      done: false },
    { label: 'Configuración inicial',    icon: 'tune',          done: false },
  ];
  currentStep   = -1;
  progressValue = 0;

  // Plugins populares
  popularPlugins = [
    { slug: 'woocommerce',          name: 'WooCommerce',        icon: 'shopping_cart' },
    { slug: 'contact-form-7',       name: 'Contact Form 7',     icon: 'mail' },
    { slug: 'yoast-seo',            name: 'Yoast SEO',          icon: 'search' },
    { slug: 'wordfence',            name: 'Wordfence Security',  icon: 'security' },
    { slug: 'wp-super-cache',       name: 'WP Super Cache',     icon: 'speed' },
    { slug: 'elementor',            name: 'Elementor',          icon: 'web' },
  ];
  selectedPlugins: string[] = [];

  languages = [
    { value: 'es_ES', label: '🇪🇸 Español' },
    { value: 'en_US', label: '🇺🇸 English' },
    { value: 'ca',    label: '🏴󠁥󠁳󠁣󠁴󠁿 Català' },
    { value: 'gl_ES', label: '🏴 Galego' },
    { value: 'fr_FR', label: '🇫🇷 Français' },
    { value: 'de_DE', label: '🇩🇪 Deutsch' },
  ];

  hideAdminPassword = true;
  hideDbPassword    = true;

  constructor(
    private fb:              FormBuilder,
    private projectsService: ProjectsService,
    private wpService:       WordpressService,
    private ui:              UiService,
    private http:            HttpClient,
    private router:          Router
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
      language:        ['es_ES', Validators.required]
    });

    this.step5 = this.fb.group({
      installPlugins: [false]
    });
  }

  ngOnInit() {
    this.loadDraft();

    // Auto-rellenar campos
    this.step1.get('name')?.valueChanges.pipe(
      takeUntil(this.destroy)
    ).subscribe(val => {
      if (val) {
        const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '_');
        this.step2.patchValue({ dbName: `wp_${slug}` });
        this.step4.patchValue({ siteName: val });
      }
    });

    // Validación BD en tiempo real
    this.step2.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      takeUntil(this.destroy)
    ).subscribe(() => {
      if (this.step2.get('dbHost')?.valid && this.step2.get('dbUser')?.valid) {
        this.validateDb();
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  // ============================================
  // DRAFT
  // ============================================
  saveDraft() {
    const draft = {
      step1: this.step1.value,
      step2: { ...this.step2.value, dbPassword: '' },
      step3: { ...this.step3.value, adminPassword: '' },
      step4: this.step4.value,
      plugins: this.selectedPlugins
    };
    localStorage.setItem('wp_install_draft', JSON.stringify(draft));
    this.ui.info('Borrador guardado');
  }

  loadDraft() {
    const raw = localStorage.getItem('wp_install_draft');
    if (!raw) return;
    try {
      const draft = JSON.parse(raw);
      if (draft.step1) this.step1.patchValue(draft.step1);
      if (draft.step2) this.step2.patchValue(draft.step2);
      if (draft.step3) this.step3.patchValue(draft.step3);
      if (draft.step4) this.step4.patchValue(draft.step4);
      if (draft.plugins) this.selectedPlugins = draft.plugins;
    } catch {}
  }

  clearDraft() {
    localStorage.removeItem('wp_install_draft');
  }

  // ============================================
  // VALIDACIÓN BD
  // ============================================
  validateDb() {
    this.dbValidating = true;
    this.dbValid      = null;
    this.http.post<any>(`${this.api}/validate-db`, this.step2.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (res) => {
        this.dbValidating = false;
        this.dbValid      = res.success;
        this.dbMessage    = res.message;
      },
      error: (err) => {
        this.dbValidating = false;
        this.dbValid      = false;
        this.dbMessage    = err.error?.message || 'Error de conexión';
      }
    });
  }

  // ============================================
  // GENERADOR DE CONTRASEÑA
  // ============================================
  generatePassword(field: 'adminPassword' | 'dbPassword') {
    const chars  = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    const length = 16;
    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (field === 'adminPassword') {
      this.step3.patchValue({ adminPassword: pass });
      this.hideAdminPassword = false;
    } else {
      this.step2.patchValue({ dbPassword: pass });
      this.hideDbPassword = false;
    }
    navigator.clipboard?.writeText(pass).then(() => this.ui.info('Contraseña copiada al portapapeles'));
  }

  // ============================================
  // PREVIEW WP-CONFIG
  // ============================================
  loadPreview() {
    this.showPreview = true;
    this.http.post<any>(`${this.api}/preview-config`, {
      ...this.step2.value,
      ...this.step4.value,
      ...this.step3.value,
      projectId: 'preview'
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next:  (res) => { this.wpConfigPreview = res.content; },
      error: ()    => { this.wpConfigPreview = '// Error al generar preview'; }
    });
  }

  // ============================================
  // PLUGINS
  // ============================================
  togglePlugin(slug: string) {
    const idx = this.selectedPlugins.indexOf(slug);
    if (idx > -1) this.selectedPlugins.splice(idx, 1);
    else          this.selectedPlugins.push(slug);
  }

  isPluginSelected(slug: string): boolean {
    return this.selectedPlugins.includes(slug);
  }

  // ============================================
  // INSTALACIÓN
  // ============================================
  advanceStep(index: number) {
    this.currentStep  = index;
    this.progressValue = Math.round(((index + 1) / this.installSteps.length) * 100);
    if (index > 0) this.installSteps[index - 1].done = true;
  }

  async install() {
    if ([this.step1, this.step2, this.step3, this.step4].some(s => s.invalid)) return;

    this.installing  = true;
    this.error       = '';
    this.currentStep = 0;
    this.progressValue = 0;
    this.installSteps.forEach(s => s.done = false);

    try {
      this.advanceStep(0);
      const project: any = await this.projectsService.create({
        name:        this.step1.value.name,
        description: this.step1.value.description
      }).toPromise();

      this.advanceStep(1);
      await new Promise(r => setTimeout(r, 400));
      this.advanceStep(2);
      await new Promise(r => setTimeout(r, 400));
      this.advanceStep(3);
      await new Promise(r => setTimeout(r, 300));
      this.advanceStep(4);

      const result: any = await this.wpService.install({
        projectId: project.id,
        config: {
          siteName:        this.step4.value.siteName,
          siteDescription: this.step4.value.siteDescription,
          dbName:          this.step2.value.dbName,
          dbUser:          this.step2.value.dbUser,
          dbPassword:      this.step2.value.dbPassword,
          dbHost:          this.step2.value.dbHost,
          dbPrefix:        this.step2.value.dbPrefix,
          adminUser:       this.step3.value.adminUser,
          adminPassword:   this.step3.value.adminPassword,
          adminEmail:      this.step3.value.adminEmail,
          language:        this.step4.value.language
        }
      }).toPromise();

      this.advanceStep(5);
      await new Promise(r => setTimeout(r, 300));
      this.advanceStep(6);

      this.installSteps[6].done = true;
      this.progressValue        = 100;
      this.result               = result;
      this.installed            = true;
      this.clearDraft();
      this.ui.success('WordPress instalado correctamente');

    } catch (err: any) {
      this.error = err.error?.error || 'Error durante la instalación';
      this.ui.error(this.error);
    } finally {
      this.installing = false;
    }
  }

  goToDashboard() { this.router.navigate(['/dashboard']); }
}
