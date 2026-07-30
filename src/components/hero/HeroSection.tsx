import React from 'react';
import { Radio, ArrowRight, Shield, Database, Terminal, Cpu } from 'lucide-react';
import { NavTab } from '../layout/Header';

interface HeroSectionProps {
  setActiveTab: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="relative overflow-hidden py-16 lg:py-24 border-b border-zinc-800 bg-black">
      {/* Visual background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="tracking-widest uppercase">Open SpaceTech Research Initiative</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 font-normal">Dataset v1.0.4-synth</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight text-white leading-[1.1]">
            Intelligence for Ground-Segment Research
          </h1>

          {/* Supporting Technical Description */}
          <p className="text-lg sm:text-xl font-mono text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            GroundPulse AI explores synthetic telemetry, RF signal health, satellite pass quality, anomaly detection, and AI-assisted operational analysis for future ground-station intelligence systems.
          </p>

          {/* Prominent Disclaimer */}
          <div className="p-4 bg-zinc-950/90 border border-zinc-800 text-left font-mono text-xs text-zinc-300 max-w-2xl mx-auto space-y-1.5 shadow-2xl">
            <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>Technical & Data Disclaimer</span>
            </div>
            <p className="text-zinc-400 leading-normal">
              GroundPulse AI is an experimental research project. All station, satellite, telemetry, RF, anomaly, and incident data displayed in this prototype are synthetic or derived from explicitly documented public sources. The prototype is not connected to operational satellite infrastructure.
            </p>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-zinc-200 font-mono text-sm font-semibold flex items-center justify-center gap-2 border border-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-98"
            >
              <Cpu className="w-4 h-4" />
              <span>Explore Research Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('datasets')}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 font-mono text-sm border border-zinc-800 hover:border-zinc-500 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Database className="w-4 h-4 text-zinc-400" />
              <span>View Dataset Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className="w-full sm:w-auto px-4 py-3 bg-transparent hover:bg-zinc-950 text-zinc-400 hover:text-white font-mono text-xs border border-transparent hover:border-zinc-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Documentation & Citation</span>
            </button>
          </div>

          {/* Quick Metrics Bar (Monochrome Aerospace Instrument Style) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 text-left font-mono border-t border-zinc-800/80">
            <div className="p-4 bg-zinc-950 border border-zinc-800/80">
              <span className="text-[10px] uppercase text-zinc-500 block mb-1">Synthetic Stations</span>
              <span className="text-2xl font-bold text-white font-mono">04</span>
              <span className="text-[10px] text-zinc-400 block mt-1">Svalbard, Goldstone, Hartebeesthoek, Canberra</span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800/80">
              <span className="text-[10px] uppercase text-zinc-500 block mb-1">Generated Telemetry</span>
              <span className="text-2xl font-bold text-white font-mono">360 <span className="text-xs font-normal text-zinc-400">frames</span></span>
              <span className="text-[10px] text-zinc-400 block mt-1">30s Resolution / 3h Span</span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800/80">
              <span className="text-[10px] uppercase text-zinc-500 block mb-1">Synthetic Anomaly Set</span>
              <span className="text-2xl font-bold text-white font-mono">04 <span className="text-xs font-normal text-zinc-400">types</span></span>
              <span className="text-[10px] text-zinc-400 block mt-1">Rain Fade, Thermal, Modem, Servo</span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800/80">
              <span className="text-[10px] uppercase text-zinc-500 block mb-1">Baseline Detection</span>
              <span className="text-2xl font-bold text-white font-mono">Z-Score</span>
              <span className="text-[10px] text-zinc-400 block mt-1">Rolling Mean (w=10, k=2.5σ)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
