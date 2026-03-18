import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WpManagerService } from '../../../core/services/wp-manager';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatTabsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatChipsModule,
    MatProgressSpinnerModule, MatSlideToggleModule, MatSelectModule,
    MatTableModule, MatDividerModule, MatSnackBarModule, MatTooltipModule
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  projectId!: number;
  project: any = null;
  status: any   = null;
  metrics: any  = null;
  plugins: any[] = [];
  themes: any[]  = [];
  users: any[]   = [];
  pages: any[]   = [];
  posts: any[]   = [];

  loading        = true;
  loadingPlugins = false;
  loadingThemes  = false;
  loadingUsers   = false;
  loadingPages   = false;

  newPluginForm: FormGroup;
  newThemeForm: FormGroup;
  newUserForm: FormGroup;
  newPageForm: FormGroup;
  showNewPlugin = false;
  showNewTheme  = false;
  showNewUser   = false;
  showNewPage   = false;

  pluginCols = ['name', 'status', 'version', 'actions'];
  themeCols  = ['name', 'status', 'version', 'actions'];
  userCols   = ['login', 'email', 'roles', 'actions'];
  pageCols   = ['title', 'status', 'date', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private wpManager: WpManagerService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.newPluginForm = this.fb.group({ plugin: ['', Validators.required] });
    this.newThemeForm  = this.fb.group({ theme:  ['', Validators.required] });
    this.newUserForm   = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role:     ['subscriber', Validators.required]
    });
    this.newPageForm   = this.fb.group({
      title:   ['', Validators.required],
      content: [''],
      status:  ['publish']
    });
  }

  ngOnInit() {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStatus();
  }

  loadStatus() {
    this.loading = true;
    this.wpManager.getStatus(this.projectId).subscribe({
      next: (data) => {
        this.project = data.project;
        this.status  = data.status;
        this.loading = false;
        if (this.status?.installed) this.loadMetrics();
      },
      error: () => { this.loading = false; }
    });
  }

  loadMetrics() {
    this.wpManager.getMetrics(this.projectId).subscribe({
      next: (data) => this.metrics = data
    });
  }

  loadPlugins() {
    this.loadingPlugins = true;
    this.wpManager.getPlugins(this.projectId).subscribe({
      next: (data) => { this.plugins = data; this.loadingPlugins = false; },
      error: ()     => { this.loadingPlugins = false; }
    });
  }

  loadThemes() {
    this.loadingThemes = true;
    this.wpManager.getThemes(this.projectId).subscribe({
      next: (data) => { this.themes = data; this.loadingThemes = false; },
      error: ()     => { this.loadingThemes = false; }
    });
  }

  loadUsers() {
    this.loadingUsers = true;
    this.wpManager.getUsers(this.projectId).subscribe({
      next: (data) => { this.users = data; this.loadingUsers = false; },
      error: ()     => { this.loadingUsers = false; }
    });
  }

  loadPages() {
    this.loadingPages = true;
    const pass = this.project?.admin_password || '';
    this.wpManager.getPages(this.projectId, pass).subscribe({
      next: (data) => { this.pages = data; this.loadingPages = false; },
      error: ()     => { this.loadingPages = false; }
    });
  }

  onTabChange(index: number) {
    if (index === 1 && !this.plugins.length) this.loadPlugins();
    if (index === 2 && !this.themes.length)  this.loadThemes();
    if (index === 3 && !this.users.length)   this.loadUsers();
    if (index === 4 && !this.pages.length)   this.loadPages();
  }

  togglePlugin(plugin: any) {
    const activate = plugin.status !== 'active';
    this.wpManager.togglePlugin(this.projectId, plugin.name, activate).subscribe({
      next: () => {
        plugin.status = activate ? 'active' : 'inactive';
        this.notify(`Plugin ${activate ? 'activado' : 'desactivado'}`);
      },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  installPlugin() {
    if (this.newPluginForm.invalid) return;
    this.wpManager.installPlugin(this.projectId, this.newPluginForm.value.plugin).subscribe({
      next: () => {
        this.notify('Plugin instalado');
        this.newPluginForm.reset();
        this.showNewPlugin = false;
        this.loadPlugins();
      },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  deletePlugin(plugin: string) {
    this.wpManager.deletePlugin(this.projectId, plugin).subscribe({
      next: () => { this.notify('Plugin eliminado'); this.loadPlugins(); },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  activateTheme(theme: string) {
    this.wpManager.activateTheme(this.projectId, theme).subscribe({
      next: () => { this.notify('Tema activado'); this.loadThemes(); },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  installTheme() {
    if (this.newThemeForm.invalid) return;
    this.wpManager.installTheme(this.projectId, this.newThemeForm.value.theme).subscribe({
      next: () => {
        this.notify('Tema instalado');
        this.newThemeForm.reset();
        this.showNewTheme = false;
        this.loadThemes();
      },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  createUser() {
    if (this.newUserForm.invalid) return;
    this.wpManager.createUser(this.projectId, this.newUserForm.value).subscribe({
      next: () => {
        this.notify('Usuario creado');
        this.newUserForm.reset({ role: 'subscriber' });
        this.showNewUser = false;
        this.loadUsers();
      },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  deleteUser(userId: number) {
    this.wpManager.deleteUser(this.projectId, userId).subscribe({
      next: () => { this.notify('Usuario eliminado'); this.loadUsers(); },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  createPage() {
    if (this.newPageForm.invalid) return;
    this.wpManager.createPage(this.projectId, {
      ...this.newPageForm.value,
      pass: this.project?.admin_password || ''
    }).subscribe({
      next: () => {
        this.notify('Página creada');
        this.newPageForm.reset({ status: 'publish' });
        this.showNewPage = false;
        this.loadPages();
      },
      error: (err) => this.notify(err.error?.error || 'Error', true)
    });
  }

  notify(msg: string, error = false) {
    this.snack.open(msg, '✕', {
      duration: 3000,
      panelClass: error ? ['snack-error'] : ['snack-ok']
    });
  }

  getAdminUrl() {
    return this.project?.wp_admin_url || this.project?.wp_url + '/wp-admin';
  }
}
