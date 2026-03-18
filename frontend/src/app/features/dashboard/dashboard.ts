import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectsService, Project } from '../../core/services/projects';
import { WpManagerService } from '../../core/services/wp-manager';
import { AuthService } from '../../core/services/auth';
import { ProfileService } from '../../core/services/profile';
import { UiService } from '../../core/services/ui';
import { StatusCountPipe } from '../../shared/pipes/status-count.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StatusCountPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  projects: Project[]           = [];
  metrics:  Record<number, any> = {};
  stats: any                    = null;
  loading                       = true;
  sidebarOpen                   = false;
  confirmDelete: Project | null = null;
  user = signal<any>(null);

  searchQuery  = '';
  filterStatus = 'all';
  statusOptions = [
    { value: 'all',       label: 'Todos' },
    { value: 'installed', label: 'Instalados' },
    { value: 'pending',   label: 'Pendientes' },
    { value: 'error',     label: 'Con error' },
  ];

  pageSize    = 6;
  currentPage = 1;

  constructor(
    private projectsService: ProjectsService,
    private wpManager: WpManagerService,
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.user.set(this.auth.currentUser());
    this.loadProjects();
    this.loadStats();
    const seen = localStorage.getItem('onboarding_done');
    if (!seen) setTimeout(() => this.router.navigate(['/onboarding']), 500);
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

  loadStats() {
    this.profileService.getStats().subscribe({ next: (d) => { this.stats = d; } });
  }

  loadMetrics(id: number) {
    this.wpManager.getMetrics(id).subscribe({ next: (d) => { this.metrics[id] = d; } });
  }

  get filteredProjects(): Project[] {
    let r = this.projects;
    if (this.filterStatus !== 'all') r = r.filter(p => p.status === this.filterStatus);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q));
    }
    return r;
  }

  get totalPages()        { return Math.ceil(this.filteredProjects.length / this.pageSize); }
  get paginatedProjects() { const s = (this.currentPage-1)*this.pageSize; return this.filteredProjects.slice(s, s+this.pageSize); }
  get pages()             { return Array.from({ length: this.totalPages }, (_,i) => i+1); }

  onSearch()          { this.currentPage = 1; }
  onFilter()          { this.currentPage = 1; }
  goToPage(p: number) { this.currentPage = p; }
  toggleSidebar()     { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar()      { this.sidebarOpen = false; }
  goToPanel(id: number)  { this.router.navigate(['/projects', id]); this.closeSidebar(); }

  goToInstall() {
    if (this.stats && !this.stats.canCreate) {
      this.ui.error(`Límite del plan ${this.stats.plan} alcanzado (${this.stats.limit} proyectos)`);
      return;
    }
    this.router.navigate(['/projects/install']);
    this.closeSidebar();
  }

  deleteProject(project: Project) { this.confirmDelete = project; }

  confirmDeleteProject() {
    if (!this.confirmDelete) return;
    this.projectsService.remove(this.confirmDelete.id).subscribe({
      next: () => { this.ui.success('Proyecto eliminado'); this.confirmDelete = null; this.loadProjects(); this.loadStats(); },
      error: (err) => { this.ui.error(err.error?.error || 'Error'); this.confirmDelete = null; }
    });
  }

  logout() { this.auth.logout(); }

  statusLabel(s: string) {
    return { installed:'Instalado', installing:'Instalando...', error:'Error', pending:'Pendiente' }[s] || s;
  }

  statusDot(s: string) {
    return { installed:'bg-emerald-500', installing:'bg-blue-500 animate-pulse', error:'bg-red-500', pending:'bg-amber-500' }[s] || 'bg-slate-400';
  }

  statusBadge(s: string) {
    return {
      installed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      installing:'bg-blue-50 text-blue-700 border border-blue-200',
      error:     'bg-red-50 text-red-700 border border-red-200',
      pending:   'bg-amber-50 text-amber-700 border border-amber-200'
    }[s] || 'bg-slate-100 text-slate-600';
  }

  cardBorder(s: string) {
    return { installed:'border-l-emerald-500', installing:'border-l-blue-500', error:'border-l-red-500', pending:'border-l-amber-500' }[s] || 'border-l-slate-300';
  }
}
