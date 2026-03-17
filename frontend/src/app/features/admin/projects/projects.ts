import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from '../../../core/services/admin';
import { UiService } from '../../../core/services/ui';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  projects: any[] = [];
  loading   = true;
  search    = '';
  cols      = ['name', 'user', 'status', 'url', 'created', 'actions'];

  constructor(
    private adminService: AdminService,
    private ui: UiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.loadProjects(); }

  loadProjects() {
    this.loading = true;
    this.adminService.getAllProjects().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: ()    => { this.loading = false; }
    });
  }

  get filteredProjects() {
    if (!this.search) return this.projects;
    const q = this.search.toLowerCase();
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.user_name.toLowerCase().includes(q) ||
      p.user_email.toLowerCase().includes(q)
    );
  }

  deleteProject(project: any) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:   `¿Eliminar "${project.name}"?`,
        message: 'Se eliminará el proyecto y todos sus datos.',
        confirm: 'Eliminar',
        cancel:  'Cancelar',
        type:    'danger'
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.adminService.deleteProject(project.id).subscribe({
        next: () => { this.ui.success('Proyecto eliminado'); this.loadProjects(); },
        error: (err) => this.ui.error(err.error?.error || 'Error')
      });
    });
  }

  getStatusLabel(status: string) {
    const map: any = { installed: 'Instalado', pending: 'Pendiente', error: 'Error', installing: 'Instalando' };
    return map[status] || status;
  }
}
