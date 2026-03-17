import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private snack: MatSnackBar) {}

  success(msg: string) {
    this.snack.open(`✅ ${msg}`, '✕', {
      duration: 3500,
      panelClass: ['snack-ok'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  error(msg: string) {
    this.snack.open(`❌ ${msg}`, '✕', {
      duration: 5000,
      panelClass: ['snack-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  info(msg: string) {
    this.snack.open(`ℹ️ ${msg}`, '✕', {
      duration: 3000,
      panelClass: ['snack-info'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  confirm(msg: string): boolean {
    return window.confirm(msg);
  }
}
