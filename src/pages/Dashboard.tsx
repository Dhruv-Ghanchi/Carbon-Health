import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';
import { MetricCard } from '../components/ui/MetricCard';
import { AppCard } from '../components/ui/AppCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SkeletonDashboard } from '../components/ui/SkeletonLoader';
import { FootprintChart } from '../components/dashboard/FootprintChart';
import { ScoreExplanationTooltipContent } from '../components/dashboard/ScoreExplanationTooltip';
import { TooltipCard } from '../components/ui/TooltipCard';
import { MissionCard } from '../components/missions/MissionCard';
import { DidYouKnowCarousel } from '../components/awareness/DidYouKnowCarousel';
import { acceptRecommendationCommand } from '../application/commands/missionCommands';
import { Leaf, Flame, Activity, Zap, Info, PlusCircle, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const rawState = useDashboardQuery();
  const dashboard = useDashboardSnapshot(rawState);

  if (!dashboard.isReady) {
    return <SkeletonDashboard />;
  }

  const { footprint, scoreOutput, topRecommendations, activeMissions, narrative, benchmark, forecast } = dashboard;

  const handleAcceptRecommendation = (rec: any) => {
    acceptRecommendationCommand(rec);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Narrative Row */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">{narrative.headline}</h1>
        <p className="text-lg text-gray-600 max-w-3xl">{narrative.subheadline}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {narrative.insights.map((insight, idx) => (
            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
              ✨ {insight.text}
            </span>
          ))}
        </div>
      </div>

      {/* 4 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Carbon Score"
          icon={<Leaf className="w-5 h-5" />}
          value={
            <div className="flex items-center gap-2">
              {scoreOutput.carbonHealthScore} <span className="text-xl text-gray-400 font-normal">/ 100</span>
              <TooltipCard content={<ScoreExplanationTooltipContent explanation={scoreOutput.explanation} />} />
            </div>
          }
          subtitle={
            scoreOutput.nextTier 
              ? `${scoreOutput.pointsToNextTier} points to ${scoreOutput.nextTier}` 
              : "Max Tier Reached"
          }
          trend={{ value: scoreOutput.statusLevel, isPositive: scoreOutput.carbonHealthScore >= 65 }}
        />

        <MetricCard
          title="Total Footprint"
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          value={
            <div className="flex items-baseline gap-1">
              {footprint.totalFootprint} <span className="text-base text-gray-500 font-medium">kg CO₂</span>
            </div>
          }
          subtitle={
            <span className="flex gap-2">
              <span>Personal: <b className="text-gray-900">{footprint.personalEmissions}</b></span>
              <span>Shared: <b className="text-gray-900">{footprint.sharedEmissions}</b></span>
            </span>
          }
        />

        <MetricCard
          title="Forecast"
          icon={<Activity className="w-5 h-5 text-purple-500" />}
          value={
            <div className="flex items-baseline gap-1">
              {forecast.projectedFootprint} <span className="text-base text-gray-500 font-medium">kg CO₂</span>
            </div>
          }
          subtitle={forecast.explanation}
          trend={forecast.projectedReduction > 0 ? { value: `-${forecast.projectedReduction} kg`, isPositive: true } : undefined}
        />

        <MetricCard
          title="Benchmark"
          icon={<Zap className="w-5 h-5 text-yellow-500" />}
          value={<div className="text-3xl">{benchmark.percentileText}</div>}
          subtitle={benchmark.explanation}
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AppCard className="flex flex-col">
              <h3 className="font-bold text-gray-900 mb-4">Footprint Breakdown</h3>
              <div className="flex-1 min-h-[250px]">
                <FootprintChart breakdown={footprint.breakdown} />
              </div>
            </AppCard>
            
            <div className="flex flex-col justify-center">
              <DidYouKnowCarousel />
            </div>
          </div>

          <div>
            <SectionHeader 
              title="Active Missions" 
              description="Your current commitments to reduce emissions." 
            />
            {activeMissions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeMissions.map(m => (
                  <MissionCard key={m.id} mission={m} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
                <Target className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">No active missions</h3>
                <p className="text-gray-500 mt-1 mb-4">Accept a recommendation to start making an impact.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Recommendations) */}
        <div className="space-y-6">
          <SectionHeader title="Recommendations" description="Prioritized based on your lifestyle." />
          
          <div className="space-y-4">
            {topRecommendations.map((rec, idx) => (
              <AppCard key={rec.id} className="relative overflow-hidden group hover:border-carbon-300 transition-all">
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Highest Impact
                  </div>
                )}
                <h3 className="font-bold text-gray-900 mb-1 pr-16">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                
                <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-carbon-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-700 font-medium leading-relaxed">
                      Recommended because <span className="capitalize">{rec.category}</span> is a major contributor to your footprint. 
                      Priority Score: {rec.priorityScore}.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-sm font-bold text-carbon-700">Save ~{rec.estimatedReduction} kg</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{rec.difficulty}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAcceptRecommendation(rec)}>
                    <PlusCircle className="w-4 h-4 mr-1.5" /> Accept
                  </Button>
                </div>
              </AppCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
