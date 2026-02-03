import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cars',
    loadComponent: () => import('./pages/cars/cars.page').then( m => m.CarsPage)
  },
  {
    path: 'edit-car',
    loadComponent: () => import('./pages/edit-car/edit-car.page').then( m => m.EditCarPage)
  },
  {
    path: 'add-car',
    loadComponent: () => import('./pages/add-car/add-car.page').then( m => m.AddCarPage)
  },
  {
    path: 'repair-request',
    loadComponent: () => import('./pages/repair-request/repair-request.page').then( m => m.RepairRequestPage)
  },
  {
    path: 'reparations',
    loadComponent: () => import('./pages/reparations/reparations.page').then( m => m.ReparationsPage)
  },
  {
    path: 'payment/:id',
    loadComponent: () => import('./pages/payment/payment.page').then( m => m.PaymentPage)
  }
];
