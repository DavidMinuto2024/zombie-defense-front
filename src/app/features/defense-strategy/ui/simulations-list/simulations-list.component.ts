import { Component, ChangeDetectionStrategy, input, signal, computed, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import type { Simulation } from '../../data/models';

const BOGOTA_TZ = 'America/Bogota';
const PAGE_SIZE = 10;

@Component({
  selector: 'app-simulations-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  templateUrl: './simulations-list.component.html',
  styleUrl: './simulations-list.component.css',
})
export class SimulationsListComponent {
  simulations = input.required<Simulation[]>();

  /** Date format for display in America/Bogota (UTC input). */
  readonly dateFormat = 'dd/MM/yyyy, HH:mm';
  readonly bogotaTz = BOGOTA_TZ;
  readonly pageSize = PAGE_SIZE;

  readonly currentPage = signal(1);
  readonly selectedSimulation = signal<Simulation | null>(null);

  readonly totalPages = computed(() => {
    const total = this.simulations().length;
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  });

  readonly paginatedSimulations = computed(() => {
    const list = this.simulations();
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  });

  constructor() {
    effect(() => {
      this.simulations().length;
      this.currentPage.set(1);
    });
  }

  setPage(page: number): void {
    const total = this.totalPages();
    const clamped = Math.max(1, Math.min(page, total));
    this.currentPage.set(clamped);
  }

  selectSimulation(sim: Simulation): void {
    this.selectedSimulation.update((current) => (current?.id === sim.id ? null : sim));
  }
}
