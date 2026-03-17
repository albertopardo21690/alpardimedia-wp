import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from '../../../core/services/admin';
import { AuthService } from '../../../core/services/auth';
import { UiService } from '../../../core/services/ui';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule, MatSelectModule, MatDividerModule, MatDialogModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  users:   any[] = [];
  loading  = true;
  search   = '';
  cols     = ['name', 'email', 'role', 'plan', 'projects', 'status', 'created', 'actions'];

  plans = ['free', 'basic', 'pro', 'enterprise'];

  constructor(
    private adminService: AdminService,
    private auth: AuthService,
    private ui: UiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: ()    => { this.loading = false; }
    });
  }

  get filteredUsers() {
    if (!this.search) return this.users;
    const q = this.search.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  blockUser(user: any) {
    const action = user.blocked ? 'desbloquear' : 'bloquear';
    this.adminService.blockUser(user.id, !user.blocked).subscribe({
      next: () => { user.blocked = !user.blocked; this.ui.success(`Usuario ${action}ado`); },
      error: (err) => this.ui.error(err.error?.error || 'Error')
    });
  }

  updatePlan(user: any, plan: string) {
    this.adminService.updatePlan(user.id, plan).subscribe({
      next: () => { user.plan = plan; this.ui.success('Plan actualizado'); },
      error: (err) => this.ui.error(err.error?.error || 'Error')
    });
  }

  toggleRole(user: any) {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    this.adminService.makeAdmin(user.id, newRole).subscribe({
      next: () => { user.role = newRole; this.ui.success('Rol actualizado'); },
      error: (err) => this.ui.error(err.error?.error || 'Error')
    });
  }

  impersonate(user: any) {
    this.adminService.impersonate(user.id).subscribe({
      next: (res) => {
        const adminToken = localStorage.getItem('token');
        const adminUser  = localStorage.getItem('user');
        localStorage.setItem('admin_token', adminToken || '');
        localStorage.setItem('admin_user',  adminUser  || '');
        localStorage.setItem('token', res.token);
        localStorage.setItem('user',  JSON.stringify(res.user));
        this.ui.info(`Impersonando a ${user.name}`);
        window.location.href = '/dashboard';
      },
      error: (err) => this.ui.error(err.error?.error || 'Error')
    });
  }

  deleteUser(user: any) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:   `¿Eliminar a ${user.name}?`,
        message: `Se eliminarán todos sus proyectos y datos. Acción irreversible.`,
        confirm: 'Eliminar',
        cancel:  'Cancelar',
        type:    'danger'
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.adminService.deleteUser(user.id).subscribe({
        next: () => { this.ui.success('Usuario eliminado'); this.loadUsers(); },
        error: (err) => this.ui.error(err.error?.error || 'Error')
      });
    });
  }
}
