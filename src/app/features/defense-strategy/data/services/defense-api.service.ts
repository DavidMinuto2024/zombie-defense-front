import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG, type ApiConfig } from '../../../../core/api/api-config';
import type { StrategyResult, Simulation } from '../models';
import type { SimulationApi } from '../models/simulation-api.model';
import { mapSimulationFromApi } from '../mappers/simulation.mapper';

/**
 * API client for defense strategy and simulations.
 */
@Injectable({ providedIn: 'root' })
export class DefenseApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject<ApiConfig>(API_CONFIG);

  getOptimalStrategy(bullets: number, secondsAvailable: number): Observable<StrategyResult> {
    const params = new HttpParams()
      .set('bullets', String(bullets))
      .set('secondsAvailable', String(secondsAvailable));
    return this.http.get<StrategyResult>(`${this.config.baseUrl}/api/Defense/optimal-strategy`, {
      params,
    });
  }

  getSimulations(): Observable<Simulation[]> {
    return this.http
      .get<SimulationApi[]>(`${this.config.baseUrl}/api/Simulations`)
      .pipe(
        map((list) =>
          list
            .map(mapSimulationFromApi)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        )
      );
  }
}
