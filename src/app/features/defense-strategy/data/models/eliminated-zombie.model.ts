/**
 * Zombie eliminated in a simulation (from GET /api/Simulations).
 */
export interface EliminatedZombie {
  zombieTypeId: number;
  type: string;
  bulletsNeeded: number;
  shootingTime?: number;
  score: number;
  threatLevel: string;
  killCount: number;
}
