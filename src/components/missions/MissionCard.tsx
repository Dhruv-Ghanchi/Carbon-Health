import { Target, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { completeMissionCommand, skipMissionCommand } from '../../application/commands/missionCommands';
import type { Mission } from '../../types';

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const handleComplete = () => {
    completeMissionCommand(mission.id);
  };

  const handleSkip = () => {
    skipMissionCommand(mission.id);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-carbon-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-carbon-50 text-carbon-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{mission.title}</h3>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{mission.missionType.replace('_', ' ')}</span>
          </div>
        </div>
        <StatusBadge variant={mission.difficulty === 'hard' ? 'warning' : mission.difficulty === 'medium' ? 'info' : 'success'}>
          {mission.difficulty}
        </StatusBadge>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{mission.description}</p>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-sm font-semibold text-carbon-700">
          Save ~{mission.targetReduction} kg CO₂
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleSkip} title="Skip Mission">
            <XCircle className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </Button>
          <Button variant="primary" size="sm" onClick={handleComplete}>
            <CheckCircle className="w-4 h-4 mr-2" /> Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
