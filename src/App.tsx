import React, { useState, useMemo } from 'react';
import { NavTab, Header } from './components/layout/Header';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { Footer } from './components/layout/Footer';
import { StarfieldBackground } from './components/common/StarfieldBackground';

import { HeroSection } from './components/hero/HeroSection';
import { ResearchScope } from './components/research/ResearchScope';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { TelemetryExplorer } from './components/telemetry/TelemetryExplorer';
import { RFHealthPanel } from './components/rf/RFHealthPanel';
import { PassSchedule } from './components/passes/PassSchedule';
import { AnomalyDetectionPanel } from './components/anomalies/AnomalyDetectionPanel';
import { EventTimeline } from './components/events/EventTimeline';
import { DatasetExplorer } from './components/datasets/DatasetExplorer';
import { DocViewer } from './components/docs/DocViewer';

import { generateSyntheticDataset } from './data/generateTelemetry';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [seed, setSeed] = useState<number>(42);

  // Memorized synthetic dataset based on current seed
  const dataset = useMemo(() => {
    return generateSyntheticDataset(seed);
  }, [seed]);

  const handleRegenerate = (newSeed?: number) => {
    setSeed(prev => (newSeed !== undefined ? newSeed : prev + 1));
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col relative selection:bg-zinc-800 selection:text-white">
      {/* Background Subtle Starfield & Grid Canvas */}
      <StarfieldBackground />

      {/* Top Persistent Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRegenerate={() => handleRegenerate()}
        seed={seed}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* TAB 1: RESEARCH OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <HeroSection setActiveTab={setActiveTab} />
            <ResearchScope setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 2: MISSION DASHBOARD */}
        {activeTab === 'dashboard' && (
          <OverviewDashboard
            dataset={dataset}
            onRegenerate={handleRegenerate}
            setActiveTab={setActiveTab}
          />
        )}

        {/* TAB 3: TELEMETRY EXPLORER */}
        {activeTab === 'telemetry' && (
          <TelemetryExplorer telemetry={dataset.telemetry} />
        )}

        {/* TAB 4: RF HEALTH */}
        {activeTab === 'rf' && (
          <RFHealthPanel dataset={dataset} />
        )}

        {/* TAB 5: PASS SCHEDULE */}
        {activeTab === 'passes' && (
          <PassSchedule passes={dataset.passes} />
        )}

        {/* TAB 6: ANOMALY ENGINE */}
        {activeTab === 'anomalies' && (
          <AnomalyDetectionPanel
            dataset={dataset}
            onRegenerate={handleRegenerate}
          />
        )}

        {/* TAB 7: EVENTS & TIMELINE */}
        {activeTab === 'events' && (
          <EventTimeline dataset={dataset} />
        )}

        {/* TAB 8: DATASET REPOSITORY */}
        {activeTab === 'datasets' && (
          <DatasetExplorer />
        )}

        {/* TAB 9: DOCS & LICENSES */}
        {activeTab === 'docs' && (
          <DocViewer />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
