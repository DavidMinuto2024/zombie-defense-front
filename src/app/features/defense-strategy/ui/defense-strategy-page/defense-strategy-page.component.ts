import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { OptimalStrategyFormComponent } from '../optimal-strategy-form/optimal-strategy-form.component';
import { OptimalStrategyResultComponent } from '../optimal-strategy-result/optimal-strategy-result.component';
import { SimulationsListComponent } from '../simulations-list/simulations-list.component';
import { DefenseApiService } from '../../data/services/defense-api.service';
import type { StrategyResult, Simulation } from '../../data/models';

@Component({
  selector: 'app-defense-strategy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OptimalStrategyFormComponent,
    OptimalStrategyResultComponent,
    SimulationsListComponent,
  ],
  templateUrl: './defense-strategy-page.component.html',
  styleUrl: './defense-strategy-page.component.css',
})
export class DefenseStrategyPageComponent {
  private readonly api = inject(DefenseApiService);

  protected readonly strategyResult = signal<StrategyResult | null>(null);
  protected readonly simulations = signal<Simulation[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.loadSimulations();
  }

  protected onStrategyRequest(payload: { bullets: number; secondsAvailable: number }): void {
    this.error.set(null);
    this.loading.set(true);
    this.api.getOptimalStrategy(payload.bullets, payload.secondsAvailable).subscribe({
      next: (res) => {
        this.strategyResult.set(res);
        this.loading.set(false);
        this.loadSimulations();
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load strategy');
        this.loading.set(false);
      },
    });
  }

  private loadSimulations(): void {
    this.api.getSimulations().subscribe({
      next: (list) => this.simulations.set(list),
      error: () => {},
    });
  }
}
