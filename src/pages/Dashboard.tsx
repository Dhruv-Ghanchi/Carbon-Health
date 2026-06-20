import PageContainer from '../layouts/PageContainer';
import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';

export default function Dashboard() {
  const rawState = useDashboardQuery();
  const dashboard = useDashboardSnapshot(rawState);

  const { isReady, footprint, scoreOutput, progressSummary, topRecommendations, activeMissions, narrative } = dashboard;

  if (!isReady) {
    return <PageContainer><p>Loading...</p></PageContainer>;
  }

  const quickestWin = topRecommendations[0];
  const otherRecommendations = topRecommendations.slice(1);

  return (
    <PageContainer>
      <header className="py-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-carbon-900 mb-1">{narrative.headline}</h1>
        <p className="text-carbon-600 mb-3">{narrative.subheadline}</p>
        <div className="flex flex-wrap gap-2">
          {narrative.insights.map((insight, idx) => (
            <div key={idx} className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
              ✨ {insight.text}
            </div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 border-2 border-carbon-100 rounded-xl bg-white shadow-soft">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Carbon Health Score</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-carbon-900">{scoreOutput.carbonHealthScore}</span>
            <span className="text-lg text-carbon-400">/ 100</span>
          </div>
          <p className="mt-2 font-medium text-carbon-700">Status: {scoreOutput.statusLevel}</p>
        </div>
        
        <div className="p-5 border-2 border-carbon-100 rounded-xl bg-white shadow-soft">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Footprint</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-carbon-900">{footprint.totalFootprint}</span>
            <span className="text-sm text-carbon-500 font-medium">kg CO₂/month</span>
          </div>
          <p className="mt-2 text-sm text-carbon-600">
            Biggest Contributor: <span className="font-semibold capitalize text-carbon-800">{footprint.biggestContributor}</span>
          </p>
        </div>

        <div className="p-5 border-2 border-carbon-100 rounded-xl bg-white shadow-soft md:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Streak</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-carbon-900">{progressSummary.currentStreak}</span>
            <span className="text-sm text-carbon-500 font-medium">days</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-carbon-900 mb-4">Your Action Plan</h2>
        
        {quickestWin && (
          <div className="mb-4 p-5 rounded-xl border-2 border-green-100 bg-green-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
              Quickest Win
            </div>
            <h3 className="font-bold text-lg text-green-900 mt-1">{quickestWin.title}</h3>
            <p className="text-green-800 mt-1">{quickestWin.description}</p>
            <div className="mt-3 flex gap-4 text-sm font-semibold text-green-700">
              <span className="bg-white px-2 py-1 rounded bg-opacity-50">Impact Score: {quickestWin.impactScore}</span>
              <span className="bg-white px-2 py-1 rounded bg-opacity-50">Save ~{quickestWin.estimatedReduction} kg CO₂</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {otherRecommendations.map(rec => (
            <div key={rec.id} className="p-4 border border-gray-200 rounded-xl bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-carbon-300 transition-colors">
              <div>
                <h3 className="font-bold text-carbon-900">{rec.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-bold text-carbon-700">Save {rec.estimatedReduction} kg</span>
                <span className="text-xs text-gray-500 uppercase font-semibold mt-1">{rec.difficulty} • Score {rec.impactScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeMissions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-carbon-900 mb-4">Active Missions</h2>
          <div className="grid grid-cols-1 gap-3">
            {activeMissions.map(m => (
              <div key={m.id} className="p-4 border-2 border-carbon-200 rounded-xl bg-white shadow-soft">
                <h3 className="font-bold text-carbon-900">{m.title || m.id}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

    </PageContainer>
  );
}
