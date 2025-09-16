import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent) 
  },
  { 
    path: 'todo', 
    loadComponent: () => import('./pages/todo/todo.component').then(c => c.TodoComponent) 
  },
  { 
    path: 'forms', 
    loadComponent: () => import('./pages/forms/forms.component').then(c => c.FormsComponent) 
  },
  { path: '**', redirectTo: '/home' }
];
