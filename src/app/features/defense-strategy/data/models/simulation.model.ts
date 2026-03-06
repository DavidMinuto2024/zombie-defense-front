import type { EliminatedZombie } from './eliminated-zombie.model';

/**
 * Single simulation from GET /api/Simulations.
 */
export interface Simulation {
  id: number;
  date: string;
  timeAvailable: number;
  bulletsAvailable: number;
  totalScore: number;
  createdAt: string;
  eliminatedZombies: EliminatedZombie[];
}
