import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title:   string;
  message: string;
  confirm: string;
  cancel:  string;
  type:    'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="confirm-icon" [class]="data.type">
        <mat-icon>{{ icons[data.type] }}</mat-icon>
      </div>
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
      <div class="confirm-actions">
        <button mat-stroked-button (click)="dialogRef.close(false)">
          {{ data.cancel }}
        </button>
        <button mat-flat-button [color]="data.type === 'danger' ? 'warn' : 'primary'"
                (click)="dialogRef.close(true)">
          {{ data.confirm }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      padding: 32px;
      text-align: center;
      max-width: 400px;
    }
    .confirm-icon {
      width: 64px; height: 64px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
      mat-icon { font-size: 2rem; width: 2rem; height: 2rem; color: white; }
      &.danger  { background: linear-gradient(135deg, #b91c1c, #dc2626); }
      &.warning { background: linear-gradient(135deg, #b45309, #d97706); }
      &.info    { background: linear-gradient(135deg, #1565c0, #1976d2); }
    }
    h2 { font-size: 1.25rem; font-weight: 600; color: #0f172a; margin: 0 0 8px; }
    p  { color: #64748b; margin: 0 0 28px; font-size: 0.9rem; line-height: 1.6; }
    .confirm-actions {
      display: flex; gap: 12px; justify-content: center;
      button { min-width: 100px; }
    }
  `]
})
export class ConfirmDialogComponent {
  icons = { danger: 'delete_forever', warning: 'warning', info: 'info' };
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}
