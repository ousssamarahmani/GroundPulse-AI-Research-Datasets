import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-zinc-950/80 border-b border-zinc-800 py-1.5 px-4 text-[10px] font-mono text-zinc-400 flex items-center justify-between z-50 relative backdrop-blur-sm">
      <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
        <div className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider">Research Disclaimer:</span>
          <span className="text-zinc-400">
            All telemetry, RF metrics, passes, and anomaly labels displayed are <span className="underline decoration-dotted text-zinc-200">synthetic/simulated</span>. Not connected to operational satellite infrastructure.
          </span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 text-zinc-500 shrink-0 ml-4 border-l border-zinc-800 pl-4 uppercase tracking-widest">
        <Info className="w-3 h-3 text-zinc-400" />
        <span>Version 1.0.4-synth</span>
      </div>
    </div>
  );
};

