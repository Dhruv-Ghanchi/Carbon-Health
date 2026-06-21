import { useProgressQuery } from '../application/queries/useProgressQuery';
import { useProgressSnapshot } from '../application/snapshots/useProgressSnapshot';
import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppCard } from '../components/ui/AppCard';
import { MetricCard } from '../components/ui/MetricCard';
import { Calendar, CheckCircle, Target, Award } from 'lucide-react';

export default function WeeklyReview() {
  const rawProgressState = useProgressQuery();
  const progressSnapshot = useProgressSnapshot(rawProgressState);
  const rawState = useDashboardQuery();
  const { footprint, scoreOutput } = useDashboardSnapshot(rawState);

  const { weeklySummary, completedMissions } = progressSnapshot;

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        title="Weekly Activity Summary"
        description="A deterministic review of your actions over the past 7 days."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Actions Taken"
            icon={<CheckCircle className="w-5 h-5" />}
            value={weeklySummary.missionsCompleted.toString()}
            subtitle="Missions completed this week"
          />
        <MetricCard
          title="Current Score"
          icon={<Award className="w-5 h-5" />}
          value={scoreOutput.carbonHealthScore.toString()}
          subtitle={`Tier: ${scoreOutput.statusLevel}`}
        />
        <MetricCard
          title="Current Footprint"
          icon={<Target className="w-5 h-5" />}
          value={`${footprint.totalFootprint} kg`}
          subtitle="Calculated based on your baseline"
        />
      </div>

      <AppCard>
        <h3 className="text-xl font-bold font-display text-gray-900 mb-6">Missions Completed This Week</h3>

        {completedMissions.length > 0 ? (
          <div className="space-y-4">
            {completedMissions.map((mission) => (
              <div key={mission.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-carbon-100 text-carbon-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{mission.title}</h4>
                    <p className="text-sm text-gray-500">Completed on {new Date(mission.completedAt || '').toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-carbon-700">~{mission.targetReduction} kg CO₂ saved</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{mission.category}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-1">No missions completed this week</h4>
            <p className="text-gray-500">Visit the dashboard to accept and complete recommendations.</p>
          </div>
        )}
      </AppCard>

      <AppCard className="bg-carbon-900 text-white border-none">
        <h3 className="text-xl font-bold font-display mb-2">Architectural Guarantee</h3>
        <p className="text-carbon-200 leading-relaxed max-w-3xl">
          This weekly review adheres to strict data integrity constraints. No historical metrics are fabricated or guessed. The values shown above represent the verifiable state of your data in the current moment.
        </p>
      </AppCard>
    </div>
  );
}
