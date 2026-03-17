import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectsService, Project } from '../../core/services/projects';
import { WpManagerService } from '../../core/services/wp-manager';
import { AuthService } from '../../core/services/auth';
import { StatusCountPipe } from '../../shared/pipes/status-count.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatMenuModule, MatDividerModule, MatTooltipModule,
    StatusCountPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  projects: Project[]               = [];
  metrics:  Record<number, any>     = {};
  loading                           = true;
  loadingAction: Record<number, boolean> = {};
  sidebarOpen                       = false;
  user = signal<any>(null);

  constructor(
    private projectsService: ProjectsService,
    private wpManager: WpManagerService,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.user.set(this.auth.currentUser());
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectsService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading  = false;
        data.filter(p => p.status === 'installed').forEach(p => this.loadMetrics(p.id));
      },
      error: () => { this.loading = false; }
    });
  }

  loadMetrics(projectId: number) {
    this.wpManager.getMetrics(projectId).subscribe({
      next: (data) => { this.metrics[projectId] = data; },
      error: ()     => {}
    });
  }

  toggleSidebar()       { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar()        { this.sidebarOpen = false; }
  goToPanel(id: number) { this.router.navigate(['/projects', id]); this.closeSidebar(); }
  goToInstall()         { this.router.navigate(['/projects/install']); this.closeSidebar(); }

  deleteProject(project: Project) {
    if (!confirm(`¿Eliminar "${project.name}"? Esta acción no se puede deshacer.`)) return;
    this.loadingAction[project.id] = true;
    this.projectsService.remove(project.id).subscribe({
      next: () => { this.notify('Proyecto eliminado'); this.loadProjects(); },
      error: (err) => {
        this.notify(err.error?.error || 'Error al eliminar', true);
        this.loadingAction[project.id] = false;
      }
    });
  }

  logout() { this.auth.logout(); }

  notify(msg: string, error = false) {
    this.snack.open(msg, '✕', {
      duration: 3000,
      panelClass: error ? ['snack-error'] : ['snack-ok']
    });
  }

  getStatusLabel(status: string) {
    const map: any = {
      installed:  'Instalado',
      installing: 'Instalando...',
      error:      'Error',
      pending:    'Pendiente'
    };
    return map[status] || status;
  }

  getStatusIcon(status: string) {
    const map: any = {
      installed:  'check_circle',
      installing: 'sync',
      error:      'error_outline',
      pending:    'schedule'
    };
    return map[status] || 'help';
  }
}
