import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/projects/list/list').then(m => m.List)
      },
      {
        path: 'install',
        loadComponent: () => import('./features/projects/install/install').then(m => m.InstallComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/projects/detail/detail').then(m => m.Detail)
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
