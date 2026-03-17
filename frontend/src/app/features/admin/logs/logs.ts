import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { AdminService } from '../../../core/services/admin';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatIconModule, MatSelectModule,
    MatProgressSpinnerModule, MatTooltipModule, MatChipsModule
  ],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class Logs implements OnInit, OnDestroy {
  logs:      any[]    = [];
  loading    = true;
  logType    = 'combined';
  lines      = 100;
  total      = 0;
  autoRefresh = false;
  private interval: any;

  lineOptions = [50, 100, 200, 500];

  constructor(private adminService: AdminService) {}

  ngOnInit()    { this.loadLogs(); }
  ngOnDestroy() { this.stopAutoRefresh(); }

  loadLogs() {
    this.loading = true;
    this.adminService.getLogs(this.logType, this.lines).subscribe({
      next: (data) => {
        this.logs    = data.logs;
        this.total   = data.total;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.interval = setInterval(() => this.loadLogs(), 5000);
    } else {
      this.stopAutoRefresh();
    }
  }

  stopAutoRefresh() {
    if (this.interval) { clearInterval(this.interval); this.interval = null; }
  }

  getLevelClass(level: string) {
    const map: any = { error: 'error', warn: 'warn', info: 'info', debug: 'debug' };
    return map[level] || 'info';
  }

  getLevelIcon(level: string) {
    const map: any = { error: 'error', warn: 'warning', info: 'info', debug: 'bug_report' };
    return map[level] || 'info';
  }
}
