import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppCard } from '../components/ui/AppCard';
import { FootprintChart } from '../components/dashboard/FootprintChart';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export default function Insights() {
  const rawState = useDashboardQuery();
  const dashboard = useDashboardSnapshot(rawState);

  if (!dashboard.isReady) {
    return <div>Loading...</div>;
  }

  const { footprint, narrative, footprintInsights } = dashboard;
  
  // Capitalize category name for display
  const displayCategory = footprintInsights?.highestCategory 
    ? footprintInsights.highestCategory.charAt(0).toUpperCase() + footprintInsights.highestCategory.slice(1)
    : 'Unknown';

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader 
        title="Intelligence & Insights" 
        description="Deep analysis of your footprint and behaviors." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AppCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">Behavioral Analysis</h3>
          </div>
          
          <div className="space-y-4">
            {narrative.insights.map((insight, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-800 font-medium">{insight.text}</p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">Footprint Distribution</h3>
          </div>
          
          <div className="h-[300px]">
            <FootprintChart breakdown={footprint.breakdown} />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Key Driver</h4>
            <p className="text-gray-600 text-sm">
              Your largest contributor is <b>{displayCategory}</b> ({footprintInsights?.highestPercentage || 0}% of footprint). 
              Focusing your reduction efforts here will yield the highest return on investment for your score.
            </p>
          </div>
        </AppCard>
      </div>

    </div>
  );
}
