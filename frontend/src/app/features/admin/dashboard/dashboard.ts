import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminService } from '../../../core/services/admin';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatIconModule, MatButtonModule,
    MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  loading    = true;
  user       = signal<any>(null);

  constructor(
    private adminService: AdminService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.user.set(this.auth.currentUser());
    this.adminService.getStats().subscribe({
      next: (data) => { this.stats = data; this.loading = false; },
      error: ()    => { this.loading = false; }
    });
  }

  logout() { this.auth.logout(); }
}
