import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService, Project } from '../../core/services/projects';
import { AuthService } from '../../core/services/auth';
import { StatusCountPipe } from '../../shared/pipes/status-count.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatCardModule,
    MatChipsModule, MatProgressSpinnerModule,
    StatusCountPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  user = signal<any>(null);

  constructor(
    private projectsService: ProjectsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.user.set(this.auth.currentUser());
    this.projectsService.getAll().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: ()     => { this.loading = false; }
    });
  }

  logout() { this.auth.logout(); }

  getStatusLabel(status: string) {
    const map: any = { installed: 'Instalado', installing: 'Instalando...', error: 'Error', pending: 'Pendiente' };
    return map[status] || status;
  }

  getStatusIcon(status: string) {
    const map: any = { installed: 'check_circle', installing: 'sync', error: 'error', pending: 'schedule' };
    return map[status] || 'help';
  }
}
