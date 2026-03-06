import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'defense-strategy',
    loadComponent: () =>
      import('./features/defense-strategy/ui/defense-strategy-page/defense-strategy-page.component').then(
        (m) => m.DefenseStrategyPageComponent,
      ),
  },
  { path: '', redirectTo: 'defense-strategy', pathMatch: 'full' },
];
