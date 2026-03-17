import { Routes } from '@angular/router';
import { authGuard }  from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

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
      { path: '',        loadComponent: () => import('./features/projects/list/list').then(m => m.List) },
      { path: 'install', loadComponent: () => import('./features/projects/install/install').then(m => m.InstallComponent) },
      { path: ':id',     loadComponent: () => import('./features/projects/detail/detail').then(m => m.Detail) },
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'users',     loadComponent: () => import('./features/admin/users/users').then(m => m.Users) },
      { path: 'projects',  loadComponent: () => import('./features/admin/projects/projects').then(m => m.Projects) },
      { path: 'logs',      loadComponent: () => import('./features/admin/logs/logs').then(m => m.Logs) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
