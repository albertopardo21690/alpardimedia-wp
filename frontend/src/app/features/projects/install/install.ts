import { Component } from '@angular/core';
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
import { MatChipsModule } from '@angular/material/chips';
import { ProjectsService } from '../../../core/services/projects';
import { WordpressService } from '../../../core/services/wordpress';

@Component({
  selector: 'app-install',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatStepperModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSelectModule,
    MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule
  ],
  templateUrl: './install.html',
  styleUrl: './install.scss'
})
export class InstallComponent {

  // PASO 1 — Datos del proyecto
  step1: FormGroup;
  // PASO 2 — Base de datos
  step2: FormGroup;
  // PASO 3 — Cuenta administrador
  step3: FormGroup;
  // PASO 4 — Configuración inicial
  step4: FormGroup;

  installing  = false;
  installed   = false;
  error       = '';
  installLog: string[] = [];
  result: any = null;
  hideAdminPassword = true;
  hideDbPassword    = true;

  languages = [
    { value: 'es_ES', label: 'Español' },
    { value: 'en_US', label: 'English' },
    { value: 'ca',    label: 'Català' },
    { value: 'gl_ES', label: 'Galego' },
    { value: 'fr_FR', label: 'Français' },
    { value: 'de_DE', label: 'Deutsch' },
  ];

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private wpService: WordpressService,
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
      language:        ['es_ES', Validators.required]
    });

    // Auto-rellenar dbName cuando escriben el nombre del proyecto
    this.step1.get('name')?.valueChanges.subscribe(val => {
      if (val) {
        const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '_');
        this.step2.patchValue({ dbName: `wp_${slug}` });
        this.step4.patchValue({ siteName: val });
      }
    });
  }

  addLog(msg: string) {
    this.installLog.push(msg);
  }

  async install() {
    if (this.step1.invalid || this.step2.invalid || this.step3.invalid || this.step4.invalid) return;

    this.installing  = true;
    this.error       = '';
    this.installLog  = [];

    try {
      // PASO A — Crear proyecto en nuestra BD
      this.addLog('📁 Creando proyecto...');
      const project: any = await this.projectsService.create({
        name:        this.step1.value.name,
        description: this.step1.value.description
      }).toPromise();

      this.addLog(`✅ Proyecto creado (ID: ${project.id})`);
      this.addLog('⬇️  Descargando WordPress...');
      this.addLog('📦 Extrayendo archivos...');
      this.addLog('⚙️  Generando wp-config.php...');
      this.addLog('🗄️  Creando base de datos...');
      this.addLog('🏗️  Instalando WordPress...');

      // PASO B — Instalar WordPress
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

      this.addLog('🔧 Configuración inicial...');
      this.addLog('✅ ¡WordPress instalado correctamente!');

      this.result    = result;
      this.installed = true;

    } catch (err: any) {
      this.error = err.error?.error || 'Error durante la instalación';
      this.addLog(`❌ Error: ${this.error}`);
    } finally {
      this.installing = false;
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
