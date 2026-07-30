import React, { useState } from 'react';
import { GeneratedDataset } from '../../data/generateTelemetry';
import { OscilloscopeCanvas } from './OscilloscopeCanvas';
import { Radio, Activity, Cpu, ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { formatHz, formatDb } from '../../utils/format';

interface RFHealthPanelProps {
  dataset: GeneratedDataset;
}

export const RFHealthPanel: React.FC<RFHealthPanelProps> = ({ dataset }) => {
  const [frameIndex, setFrameIndex] = useState<number>(72); // Default rain fade frame

  const currentFrame = dataset.telemetry[frameIndex] || dataset.telemetry[0];
  const currentRf = dataset.rfMetrics[frameIndex] || dataset.rfMetrics[0];

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-zinc-300" />
            <span>Synthetic RF Spectral Health Monitoring</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            RF Carrier & Spectral Metrics
          </h2>
        </div>

        {/* Frame Step Slider Control */}
        <div className="p-3 bg-zinc-950 border border-zinc-800 flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-mono">Frame Step: #{frameIndex}</span>
          <input
            type="range"
            min={0}
            max={dataset.telemetry.length - 1}
            value={frameIndex}
            onChange={(e) => setFrameIndex(parseInt(e.target.value, 10))}
            className="w-40 accent-white cursor-pointer"
          />
          <span className="text-xs text-white font-bold">{currentFrame.station_id}</span>
        </div>
      </div>

      {/* Main Oscilloscope & Gauges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Oscilloscope Canvas (Spans 2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <OscilloscopeCanvas
            snr={currentFrame.snr_db}
            isAnomaly={currentFrame.is_anomaly}
            carrierLock={currentFrame.carrier_lock === 'LOCKED'}
          />

          {/* Quick Metrics Cards Under Oscilloscope */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Signal Quality Score</span>
              <span className="text-xl font-bold text-white font-mono">{currentRf.signal_quality_score}/100</span>
              <span className="text-[10px] text-zinc-400 block">Demod Confidence</span>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Carrier Lock State</span>
              <span className={`text-base font-bold font-mono block ${
                currentFrame.carrier_lock === 'LOCKED' ? 'text-white' : 'text-zinc-400 font-bold'
              }`}>
                {currentFrame.carrier_lock}
              </span>
              <span className="text-[10px] text-zinc-500 block">Digital PLL Status</span>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Center Frequency</span>
              <span className="text-sm font-bold text-white font-mono">{formatHz(currentRf.center_frequency_hz)}</span>
              <span className="text-[10px] text-zinc-500 block">Carrier Fc</span>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Doppler Shift</span>
              <span className="text-sm font-bold text-white font-mono">{formatHz(currentRf.doppler_hz)}</span>
              <span className="text-[10px] text-zinc-500 block">Orbit Velocity Δf</span>
            </div>

          </div>
        </div>

        {/* Spectral Breakdown Panel */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-400" />
              <span>RF Link Metrics</span>
            </h3>
            <span className="text-xs text-zinc-500">{currentFrame.id}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Signal-to-Noise (SNR):</span>
              <span className="text-white font-bold font-mono">{formatDb(currentFrame.snr_db)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Energy per Bit (Eb/No):</span>
              <span className="text-white font-bold font-mono">{formatDb(currentFrame.eb_no_db)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Frequency Offset:</span>
              <span className="text-white font-mono">{formatHz(currentRf.frequency_offset_hz)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Packet Loss Rate:</span>
              <span className="text-white font-mono">{currentFrame.packet_loss_pct.toFixed(2)}%</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Link Degradation Index:</span>
              <span className="text-white font-mono">{currentRf.link_degradation_score}/100</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-400">Antenna State:</span>
              <span className="text-zinc-200 font-mono">{currentFrame.antenna_state}</span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Modem Status:</span>
              <span className="text-zinc-200 font-mono">{currentFrame.modem_state}</span>
            </div>
          </div>

          {currentFrame.is_anomaly && (
            <div className="p-3 bg-black border border-zinc-700 text-xs text-white space-y-1">
              <div className="font-bold flex items-center gap-1.5 uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-300" />
                <span>Injected Anomaly Frame</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Scenario: <span className="text-white">{currentFrame.anomaly_label}</span>. Detected via rolling Z-score anomaly rules.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Technical Physics & Generation Explanation Panel */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-white font-bold text-sm uppercase">
          <BookOpen className="w-4 h-4 text-zinc-400" />
          <span>Synthetic RF Modeling Assumptions & Mathematical Equations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300">
          
          <div className="space-y-2">
            <h4 className="text-white font-bold font-mono uppercase text-xs">1. Free Space Path Loss (FSPL) & Parabolic Elevation</h4>
            <p className="text-zinc-400 leading-relaxed">
              The generator calculates slant range distance $d(t)$ as a function of orbital elevation angle $\theta(t)$.
            </p>
            <div className="p-3 bg-black border border-zinc-900 font-mono text-[11px] text-zinc-200">
              FSPL(dB) = 20·log10(d) + 20·log10(f) + 20·log10(4π / c)
            </div>
            <p className="text-zinc-500 text-[11px]">
              Peak SNR occurs at maximum elevation (closest slant distance).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold font-mono uppercase text-xs">2. Doppler Shift & AWGN Channel Noise</h4>
            <p className="text-zinc-400 leading-relaxed">
              Doppler frequency offset $\Delta f$ models orbital relative velocity $v_r(t)$ towards the ground station antenna.
            </p>
            <div className="p-3 bg-black border border-zinc-900 font-mono text-[11px] text-zinc-200">
              Δf(Hz) = f_0 · (v_r / c) + GaussianNoise(0, σ)
            </div>
            <p className="text-zinc-500 text-[11px]">
              Rician fading & atmospheric attenuation (rain fade) apply empirical SNR drops up to 10 dB.
            </p>
          </div>

        </div>

        <div className="p-3 bg-black border border-zinc-900 text-[11px] text-zinc-400 italic">
          Disclaimer: All spectral wave patterns and numerical outputs above are calculated deterministically by generator/generate_telemetry.py for research benchmarking. They do not connect to physical RF hardware.
        </div>
      </div>

    </div>
  );
};
