import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'CODIXY Technologies | Software Development Company Hyderabad' },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    title: 'Privacy Policy | CODIXY Technologies',
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./pages/legal/terms-of-service.component').then(m => m.TermsOfServiceComponent),
    title: 'Terms of Service | CODIXY Technologies',
  },
  { path: '**', redirectTo: '' },
];
