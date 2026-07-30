import React, { useState } from 'react';
import { GeneratedDataset } from '../../data/generateTelemetry';
import { Layers, AlertCircle, RefreshCw, Cpu, Activity, Info, Sliders, ShieldAlert } from 'lucide-react';
import { formatTimestamp } from '../../utils/format';

interface AnomalyDetectionPanelProps {
  dataset: GeneratedDataset;
  onRegenerate: (seed?: number) => void;
}

export const AnomalyDetectionPanel: React.FC<AnomalyDetectionPanelProps> = ({ dataset, onRegenerate }) => {
  const [selectedMethod, setSelectedMethod] = useState<'Z_SCORE' | 'THRESHOLDS' | 'ROLLING_ENV' | 'ISOLATION_FOREST'>('Z_SCORE');
  const [zScoreThreshold, setZScoreThreshold] = useState<number>(2.5);

  const anomalyLabels = dataset.anomalyLabels;

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-300" />
            <span>Baseline Statistical & Rule Detection Benchmark</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Baseline Anomaly Detection Engine
          </h2>
        </div>

        <button
          onClick={() => onRegenerate(dataset.generationSeed + 1)}
          className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-white text-xs text-white font-mono flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Inject Random Anomaly Seed ({dataset.generationSeed + 1})</span>
        </button>
      </div>

      {/* Algorithm Configurator Bar */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
          
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span>Detection Method Selection</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Select detection algorithm to run against synthetic telemetry frames.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setSelectedMethod('Z_SCORE')}
              className={`px-3 py-1.5 text-xs border ${
                selectedMethod === 'Z_SCORE' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              Rolling Z-Score (k=2.5)
            </button>
            <button
              onClick={() => setSelectedMethod('THRESHOLDS')}
              className={`px-3 py-1.5 text-xs border ${
                selectedMethod === 'THRESHOLDS' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              Fixed Threshold Rules
            </button>
            <button
              onClick={() => setSelectedMethod('ROLLING_ENV')}
              className={`px-3 py-1.5 text-xs border ${
                selectedMethod === 'ROLLING_ENV' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              Rolling Envelope (w=10)
            </button>
            <button
              onClick={() => setSelectedMethod('ISOLATION_FOREST')}
              className={`px-3 py-1.5 text-xs border ${
                selectedMethod === 'ISOLATION_FOREST' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              Isolation Forest (Sim)
            </button>
          </div>
        </div>

        {/* Dynamic Parameter Settings */}
        {selectedMethod === 'Z_SCORE' && (
          <div className="flex items-center gap-4 text-xs text-zinc-300">
            <span>Z-Score Sensitivity Threshold (k):</span>
            <input
              type="range"
              min="1.5"
              max="4.0"
              step="0.1"
              value={zScoreThreshold}
              onChange={(e) => setZScoreThreshold(parseFloat(e.target.value))}
              className="w-36 accent-white cursor-pointer"
            />
            <span className="font-bold text-white">{zScoreThreshold.toFixed(1)} σ</span>
            <span className="text-zinc-500 text-[11px]">(Lower values increase sensitivity, higher values reduce false positives)</span>
          </div>
        )}
      </div>

      {/* Injected Anomaly Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-zinc-400" />
            <span>Detected Anomaly Benchmark Catalog ({anomalyLabels.length} Events)</span>
          </h3>
          <span className="text-xs text-zinc-500 font-mono">Algorithm: {selectedMethod}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalyLabels.map((anom) => (
            <div 
              key={anom.anomaly_id}
              className={`p-5 bg-zinc-950 border transition-all space-y-3 ${
                anom.severity === 'HIGH'
                  ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                  : anom.severity === 'MEDIUM'
                  ? 'border-zinc-400'
                  : 'border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{anom.anomaly_id}</span>
                  <span className="text-zinc-400 text-xs font-semibold uppercase">[{anom.anomaly_type}]</span>
                </div>
                
                {/* Severity Badge */}
                <span className={`px-2 py-0.5 text-[10px] font-mono border ${
                  anom.severity === 'HIGH'
                    ? 'border-white text-white font-bold bg-zinc-900'
                    : 'border-zinc-600 text-zinc-300'
                }`}>
                  {anom.severity} SEVERITY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px]">Station & Pass:</span>
                  <span className="text-white font-mono">{anom.station_id}</span>
                  <span className="text-zinc-400 block text-[10px]">{anom.pass_id}</span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px]">Observed vs Range:</span>
                  <span className="text-white font-bold">{anom.metric_name}: {anom.observed_value}</span>
                  <span className="text-zinc-500 block text-[10px]">Normal: [{anom.expected_min} - {anom.expected_max}]</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 pt-1 leading-relaxed">
                {anom.explanation}
              </p>

              <div className="pt-2 border-t border-zinc-900 flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>Method: {anom.detection_method}</span>
                <span>Source: {anom.scenario_source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations of Baseline Detection Section */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase">
          <Info className="w-4 h-4 text-zinc-400" />
          <span>Research Trade-offs: Static Thresholds vs Moving Z-Score vs Machine Learning</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-400 pt-2">
          
          <div className="p-3 bg-black border border-zinc-900 space-y-1.5">
            <h4 className="text-white font-bold font-mono uppercase text-xs">Fixed Rule Thresholds</h4>
            <p className="leading-relaxed">
              Fast and 100% deterministic, but prone to false alarms during legitimate transient atmospheric weather spikes or high elevation power changes.
            </p>
          </div>

          <div className="p-3 bg-black border border-zinc-900 space-y-1.5">
            <h4 className="text-white font-bold font-mono uppercase text-xs">Rolling Z-Score ($\mu \pm k\sigma$)</h4>
            <p className="leading-relaxed">
              Adapts dynamically to baseline signal drift, but requires warm-up window samples and can lag during abrupt modem phase lock drops.
            </p>
          </div>

          <div className="p-3 bg-black border border-zinc-900 space-y-1.5">
            <h4 className="text-white font-bold font-mono uppercase text-xs">Multivariate ML (Isolation Forest)</h4>
            <p className="leading-relaxed">
              Detects complex correlated telemetry anomalies (e.g. combined temp rise + SNR drop), but requires larger labeled synthetic training datasets.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
