import React from 'react';
import { Cpu, Radio, Calendar, Layers, Activity, FileText, CheckCircle2, Clock, GitBranch } from 'lucide-react';
import { NavTab } from '../layout/Header';

interface ResearchScopeProps {
  setActiveTab: (tab: NavTab) => void;
}

export interface DomainItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  status: 'Baseline Implemented' | 'Experimental' | 'Research in Progress' | 'Planned';
  dataType: string;
  repositoryModule: string;
  targetTab: NavTab;
}

export const RESEARCH_DOMAINS: DomainItem[] = [
  {
    id: 'telemetry',
    title: 'Telemetry Intelligence',
    icon: <Cpu className="w-4 h-4 text-zinc-300" />,
    description: 'Ingestion and statistical modeling of satellite ground-station telemetry frames, tracking power consumption, component temperatures, and operational modem states.',
    status: 'Baseline Implemented',
    dataType: 'CSV / TelemetryFrame',
    repositoryModule: 'generator/generate_telemetry.py',
    targetTab: 'telemetry',
  },
  {
    id: 'rf',
    title: 'RF Signal Analysis',
    icon: <Radio className="w-4 h-4 text-zinc-300" />,
    description: 'Monitoring Signal-to-Noise Ratio (SNR), Energy per Bit to Noise Ratio (Eb/No), center frequency offsets, and carrier Doppler shifts under simulated atmospheric fading.',
    status: 'Baseline Implemented',
    dataType: 'CSV / RFMetricFrame',
    repositoryModule: 'notebooks/02_rf_signal_analysis.ipynb',
    targetTab: 'rf',
  },
  {
    id: 'pass',
    title: 'Pass-Quality Evaluation',
    icon: <Calendar className="w-4 h-4 text-zinc-300" />,
    description: 'Automated pass duration verification, parabolic elevation curve fitting, and signal quality scoring across LEO, MEO, and GEO synthetic orbits.',
    status: 'Baseline Implemented',
    dataType: 'CSV / SyntheticPass',
    repositoryModule: 'schemas/pass.schema.json',
    targetTab: 'passes',
  },
  {
    id: 'anomaly_gen',
    title: 'Synthetic Anomaly Generation',
    icon: <Layers className="w-4 h-4 text-zinc-300" />,
    description: 'Injecting controlled, reproducible anomaly scenarios including rain-fade attenuation, LNA thermal runaway, modem PLL slip, and servo offset drift.',
    status: 'Baseline Implemented',
    dataType: 'YAML / Scenario Config',
    repositoryModule: 'generator/inject_anomalies.py',
    targetTab: 'anomalies',
  },
  {
    id: 'baseline_detection',
    title: 'Baseline Anomaly Detection',
    icon: <Activity className="w-4 h-4 text-zinc-300" />,
    description: 'Benchmarking static threshold rules vs rolling mean Z-score envelopes (w=10, k=2.5σ) and multivariate Isolation Forest algorithms.',
    status: 'Experimental',
    dataType: 'Python / NumPy & SciPy',
    repositoryModule: 'notebooks/03_baseline_anomaly_detection.ipynb',
    targetTab: 'anomalies',
  },
  {
    id: 'event_correlation',
    title: 'Station Event Correlation',
    icon: <Activity className="w-4 h-4 text-zinc-300" />,
    description: 'Cross-referencing hardware telemetry spikes against ground station equipment logs (antenna slewing, modem resets, weather triggers).',
    status: 'Baseline Implemented',
    dataType: 'CSV / StationEvent',
    repositoryModule: 'datasets/samples/station_events.csv',
    targetTab: 'events',
  },
  {
    id: 'incident_reconstruction',
    title: 'Incident Reconstruction',
    icon: <FileText className="w-4 h-4 text-zinc-300" />,
    description: 'Synthesizing timeline event sequences and probable cause descriptions for ground-station equipment faults and link outages.',
    status: 'Research in Progress',
    dataType: 'JSON / IncidentRecord',
    repositoryModule: 'schemas/incident.schema.json',
    targetTab: 'events',
  },
  {
    id: 'mission_copilot',
    title: 'AI Operational Copilots',
    icon: <GitBranch className="w-4 h-4 text-zinc-300" />,
    description: 'Evaluating future RAG retrieval architectures and LLM reasoning over ground-segment incident manuals and telemetry logs.',
    status: 'Planned',
    dataType: 'Markdown & AWS Bedrock',
    repositoryModule: 'docs/aws_quickstart.md',
    targetTab: 'datasets',
  },
];

export const ResearchScope: React.FC<ResearchScopeProps> = ({ setActiveTab }) => {
  return (
    <section className="py-12 bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>Ground Segment Research Taxonomy</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              Research Domains & Public Repository Scope
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-md">
            Each research domain links directly to standardized public datasets, baseline scripts, and schema validation specifications.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESEARCH_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              onClick={() => setActiveTab(domain.targetTab)}
              className="p-5 bg-zinc-950 border border-zinc-800 hover:border-zinc-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-zinc-900 border border-zinc-700 text-white group-hover:border-white transition-colors">
                    {domain.icon}
                  </div>

                  {/* Monochrome Status Badge */}
                  <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                    domain.status === 'Baseline Implemented'
                      ? 'border-white text-white bg-zinc-900 font-semibold'
                      : domain.status === 'Experimental'
                      ? 'border-zinc-500 text-zinc-300 bg-zinc-950'
                      : domain.status === 'Research in Progress'
                      ? 'border-zinc-700 text-zinc-400 bg-zinc-950'
                      : 'border-zinc-800 text-zinc-500 bg-black'
                  }`}>
                    {domain.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-mono group-hover:text-zinc-200 transition-colors">
                  {domain.title}
                </h3>

                <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="pt-3 border-t border-zinc-900 font-mono text-[10px] space-y-1 text-zinc-500">
                <div className="flex justify-between">
                  <span>Data Format:</span>
                  <span className="text-zinc-300">{domain.dataType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Repository File:</span>
                  <span className="text-zinc-400 font-mono truncate max-w-[140px]" title={domain.repositoryModule}>
                    {domain.repositoryModule}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
