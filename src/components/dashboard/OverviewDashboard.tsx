import React, { useState } from 'react';
import { GeneratedDataset } from '../../data/generateTelemetry';
import { SYNTHETIC_STATIONS } from '../../data/stationProfiles';
import { Activity, Radio, Cpu, Layers, AlertCircle, RefreshCw, Clock, Database, ChevronRight } from 'lucide-react';
import { formatTimestamp } from '../../utils/format';
import { NavTab } from '../layout/Header';

interface OverviewDashboardProps {
  dataset: GeneratedDataset;
  onRegenerate: (newSeed?: number) => void;
  setActiveTab: (tab: NavTab) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ dataset, onRegenerate, setActiveTab }) => {
  const [customSeedInput, setCustomSeedInput] = useState<string>(dataset.generationSeed.toString());

  const handleSeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customSeedInput, 10);
    if (!isNaN(parsed)) {
      onRegenerate(parsed);
    }
  };

  const anomalyCount = dataset.telemetry.filter(t => t.is_anomaly).length;
  const nominalFramesCount = dataset.telemetry.length - anomalyCount;
  const healthScore = ((nominalFramesCount / dataset.telemetry.length) * 100).toFixed(1);

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Top Banner Disclaimer */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-white animate-ping" />
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Simulated Ground Segment Overview
            </h2>
            <p className="text-xs text-zinc-400">
              Generated deterministically via Seed #{dataset.generationSeed}. All telemetry values are research models.
            </p>
          </div>
        </div>

        {/* Seed Input Form */}
        <form onSubmit={handleSeedSubmit} className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono">Seed:</span>
          <input
            type="number"
            value={customSeedInput}
            onChange={(e) => setCustomSeedInput(e.target.value)}
            className="w-20 px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-white text-xs text-white font-mono flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Generate</span>
          </button>
        </form>
      </div>

      {/* Main 5 Metric Grid from Technical Dashboard Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-zinc-800 bg-zinc-950 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
        
        {/* Metric 1 */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
            <span>Simulated Stations</span>
            <Radio className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-mono">
            {SYNTHETIC_STATIONS.length}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            4 Global Fixed Nodes
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
            <span>Generated Telemetry</span>
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-mono">
            {dataset.telemetry.length}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            30s Step Resolution
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
            <span>Synthetic Passes</span>
            <Activity className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-mono">
            {dataset.passes.length}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            LEO, MEO & GEO Scheduled
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
            <span>Generated Anomalies</span>
            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-mono">
            {anomalyCount}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            Z-Score Tagged (&gt;2.5σ)
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
            <span>Research Health Score</span>
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-light text-white font-mono">
            {healthScore}%
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            Nominal Baseline Ratio
          </div>
        </div>

      </div>

      {/* Two Column Section: Stations & Passes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ground Station Status Panel */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-zinc-400" />
              <span>Simulated Ground Stations</span>
            </h3>
            <span className="text-xs text-zinc-500">4 Active Research Nodes</span>
          </div>

          <div className="space-y-3">
            {SYNTHETIC_STATIONS.map((st) => (
              <div key={st.id} className="p-3 bg-black border border-zinc-900 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white font-mono">{st.name}</div>
                  <div className="text-zinc-500 font-mono text-[11px]">{st.location}</div>
                  <div className="text-zinc-600 font-mono text-[10px]">{st.band} • {st.dish_diameter_m}m Dish</div>
                </div>

                <div className="text-right space-y-1">
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-mono border ${
                    st.status === 'ONLINE'
                      ? 'border-white text-white bg-zinc-900'
                      : st.status === 'STANDBY'
                      ? 'border-zinc-700 text-zinc-400'
                      : 'border-zinc-500 text-zinc-300 bg-zinc-950 font-semibold'
                  }`}>
                    {st.status}
                  </span>
                  <div className="text-[10px] text-zinc-600">ID: {st.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Synthetic Pass Summary Panel */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-400" />
              <span>Synthetic Satellite Passes</span>
            </h3>
            <button
              onClick={() => setActiveTab('passes')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {dataset.passes.slice(0, 4).map((p) => (
              <div key={p.pass_id} className="p-3 bg-black border border-zinc-900 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{p.satellite_id}</span>
                    <span className="text-zinc-500 text-[10px]">({p.station_id})</span>
                  </div>
                  <div className="text-zinc-500 text-[11px]">
                    Max Elev: {p.max_elevation_deg}° • Duration: {p.expected_duration_sec}s
                  </div>
                  <div className="text-zinc-600 text-[10px]">
                    Avg SNR: {p.average_snr_db} dB
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className={`px-2 py-0.5 text-[10px] font-mono border ${
                    p.pass_status === 'NOMINAL'
                      ? 'border-white text-white bg-zinc-900'
                      : p.pass_status === 'DEGRADED'
                      ? 'border-zinc-500 text-zinc-300'
                      : p.pass_status === 'INTERRUPTED'
                      ? 'border-white text-white bg-zinc-800 font-bold'
                      : 'border-zinc-800 text-zinc-600'
                  }`}>
                    {p.pass_status}
                  </span>
                  <div className="text-[10px] text-zinc-500">
                    {p.anomaly_count} Anomalies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Synthetic Incidents & Anomaly Snippet */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-zinc-400" />
            <span>Active Synthetic Research Incidents ({dataset.incidents.length})</span>
          </h3>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
          >
            <span>Timeline Detail</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataset.incidents.map((inc) => (
            <div key={inc.incident_id} className="p-4 bg-black border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{inc.incident_id}</span>
                <span className={`text-[10px] px-1.5 py-0.5 border ${
                  inc.severity === 'HIGH' ? 'border-white text-white font-bold' : 'border-zinc-600 text-zinc-300'
                }`}>
                  {inc.severity} SEV
                </span>
              </div>
              <p className="text-xs text-zinc-300 line-clamp-2">{inc.summary}</p>
              <div className="text-[10px] text-zinc-500 pt-2 border-t border-zinc-900">
                Cause: {inc.probable_cause}
              </div>
              <div className="text-[10px] text-zinc-400 italic">
                {inc.research_recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
