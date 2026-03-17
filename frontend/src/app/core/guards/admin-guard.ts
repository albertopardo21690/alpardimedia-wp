import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const stored = localStorage.getItem('user');
  if (!stored) { router.navigate(['/login']); return false; }

  const user = JSON.parse(stored);
  if (user?.role !== 'admin') {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
