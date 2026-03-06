/**
 * Summary of zombies eliminated in a strategy (from optimal-strategy endpoint).
 */
export interface ZombieKillSummary {
  zombieTypeId: number;
  type: string;
  bulletsNeeded: number;
  shootingTime: number;
  score: number;
  threatLevel: string;
  killCount: number;
}
