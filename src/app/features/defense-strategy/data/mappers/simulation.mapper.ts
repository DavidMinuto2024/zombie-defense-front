import type { SimulationApi, EliminatedZombieRecordApi } from '../models/simulation-api.model';
import type { Simulation, EliminatedZombie } from '../models';

/** Ensures ISO date string is parsed as UTC (append Z if missing) for correct America/Bogota display. */
function ensureUtc(dateStr: string): string {
  if (!dateStr) return dateStr;
  return dateStr.endsWith('Z') ? dateStr : dateStr + 'Z';
}

/**
 * Maps API simulation response to app Simulation model.
 * Groups eliminatedZombies by zombieTypeId and builds one row per type with killCount.
 */
export function mapSimulationFromApi(api: SimulationApi): Simulation {
  return {
    id: api.id,
    date: ensureUtc(api.date),
    timeAvailable: api.timeAvailable,
    bulletsAvailable: api.bulletsAvailable,
    totalScore: api.totalScore,
    createdAt: ensureUtc(api.createdAt),
    eliminatedZombies: mapEliminatedZombiesFromApi(api.eliminatedZombies),
  };
}

function mapEliminatedZombiesFromApi(
  records: (EliminatedZombieRecordApi | null)[]
): EliminatedZombie[] {
  const valid = records.filter(
    (r): r is EliminatedZombieRecordApi => r != null && r.zombieTypeId != null
  );
  const byTypeId = new Map<number, EliminatedZombieRecordApi[]>();
  for (const r of valid) {
    const list = byTypeId.get(r.zombieTypeId) ?? [];
    list.push(r);
    byTypeId.set(r.zombieTypeId, list);
  }
  return Array.from(byTypeId.entries()).map(([zombieTypeId, group]) => {
    const first = group[0];
    const zt = first.zombieType;
    return {
      zombieTypeId,
      type: zt?.type ?? '—',
      bulletsNeeded: zt?.bulletsNeeded ?? 0,
      shootingTime: zt?.shootingTime,
      score: zt?.score ?? 0,
      threatLevel: zt?.threatLevel ?? '—',
      killCount: group.length,
    };
  });
}
