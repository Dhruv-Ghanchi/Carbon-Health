import type { ScoreExplanation } from '../../engines/score/types';

interface ScoreExplanationProps {
  explanation: ScoreExplanation;
}

export function ScoreExplanationTooltipContent({ explanation }: ScoreExplanationProps) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-bold text-gray-900 mb-1 border-b border-gray-100 pb-1">Score Breakdown</h4>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Baseline Foundation</span>
        <span className="font-bold text-carbon-700">+{explanation.baselineContribution} pts</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Historical Trend</span>
        <span className="font-bold text-carbon-700">+{explanation.trendContribution} pts</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Active Completion</span>
        <span className="font-bold text-carbon-700">+{explanation.actionContribution} pts</span>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-900">Total Score</span>
        <span className="font-bold text-gray-900">
          {explanation.baselineContribution + explanation.trendContribution + explanation.actionContribution}
        </span>
      </div>
    </div>
  );
}
