import type { Mission } from '../../types';

export function buildFatigueModel(
  activeMissions: Mission[],
  completedMissions: Mission[],
  archivedMissions: Mission[]
): Set<string> {
  const excludedBaseIds = new Set<string>();

  [...activeMissions, ...completedMissions, ...archivedMissions].forEach(m => {
    excludedBaseIds.add(m.id);
  });

  return excludedBaseIds;
}
