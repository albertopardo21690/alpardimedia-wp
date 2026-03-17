import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService, Project } from '../../core/services/projects';
import { WpManagerService } from '../../core/services/wp-manager';
import { AuthService } from '../../core/services/auth';
import { UiService } from '../../core/services/ui';
import { StatusCountPipe } from '../../shared/pipes/status-count.pipe';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    MatMenuModule, MatDividerModule, MatTooltipModule,
    MatSelectModule, MatDialogModule,
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

  // Búsqueda y filtros
  searchQuery  = '';
  filterStatus = 'all';
  statusOptions = [
    { value: 'all',       label: 'Todos' },
    { value: 'installed', label: 'Instalados' },
    { value: 'pending',   label: 'Pendientes' },
    { value: 'error',     label: 'Con error' },
  ];

  // Paginación
  pageSize    = 6;
  currentPage = 1;

  constructor(
    private projectsService: ProjectsService,
    private wpManager: WpManagerService,
    private auth: AuthService,
    private router: Router,
    private ui: UiService,
    private dialog: MatDialog
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
      next: (data) => { this.metrics[projectId] = data; }
    });
  }

  // Proyectos filtrados y paginados
  get filteredProjects(): Project[] {
    let result = this.projects;
    if (this.filterStatus !== 'all') {
      result = result.filter(p => p.status === this.filterStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }
    return result;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.pageSize);
  }

  get paginatedProjects(): Project[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProjects.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch()         { this.currentPage = 1; }
  onFilterChange()   { this.currentPage = 1; }
  goToPage(p: number){ this.currentPage = p; }

  toggleSidebar()        { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar()         { this.sidebarOpen = false; }
  goToPanel(id: number)  { this.router.navigate(['/projects', id]); this.closeSidebar(); }
  goToInstall()          { this.router.navigate(['/projects/install']); this.closeSidebar(); }

  deleteProject(project: Project) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:   '¿Eliminar proyecto?',
        message: `Se eliminará "${project.name}" y todos sus datos. Esta acción no se puede deshacer.`,
        confirm: 'Eliminar',
        cancel:  'Cancelar',
        type:    'danger'
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.loadingAction[project.id] = true;
      this.projectsService.remove(project.id).subscribe({
        next: () => { this.ui.success('Proyecto eliminado'); this.loadProjects(); },
        error: (err) => {
          this.ui.error(err.error?.error || 'Error al eliminar');
          this.loadingAction[project.id] = false;
        }
      });
    });
  }

  logout() { this.auth.logout(); }

  getStatusLabel(status: string) {
    const map: any = { installed: 'Instalado', installing: 'Instalando...', error: 'Error', pending: 'Pendiente' };
    return map[status] || status;
  }

  getStatusIcon(status: string) {
    const map: any = { installed: 'check_circle', installing: 'sync', error: 'error_outline', pending: 'schedule' };
    return map[status] || 'help';
  }
}
