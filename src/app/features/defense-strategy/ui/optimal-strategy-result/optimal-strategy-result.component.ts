import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import type { StrategyResult } from '../../data/models';

@Component({
  selector: 'app-optimal-strategy-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './optimal-strategy-result.component.html',
  styleUrl: './optimal-strategy-result.component.css',
})
export class OptimalStrategyResultComponent {
  strategy = input<StrategyResult | null>(null);
  loading = input<boolean>(false);
}
