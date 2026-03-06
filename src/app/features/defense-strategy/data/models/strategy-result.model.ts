import type { ZombieKillSummary } from './zombie-kill-summary.model';

/**
 * Result from GET /api/Defense/optimal-strategy.
 */
export interface StrategyResult {
  totalScore: number;
  bulletsUsed: number;
  secondsUsed: number;
  eliminatedZombies: ZombieKillSummary[];
}
