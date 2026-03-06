/**
 * API response types for GET /api/Simulations.
 * Backend returns nested zombieType and one record per kill; we map to Simulation + EliminatedZombie for the UI.
 */

export interface ZombieTypeApi {
  id: number;
  type: string;
  shootingTime: number;
  bulletsNeeded: number;
  score: number;
  threatLevel: string;
}

/** Single eliminated-zombie record from API (one kill; type details in zombieType). */
export interface EliminatedZombieRecordApi {
  id: number;
  zombieTypeId: number;
  simulationId: number;
  pointsEarned: number;
  zombieType?: ZombieTypeApi | null;
}

export interface SimulationApi {
  id: number;
  date: string;
  timeAvailable: number;
  bulletsAvailable: number;
  totalScore: number;
  createdAt: string;
  eliminatedZombies: (EliminatedZombieRecordApi | null)[];
}
