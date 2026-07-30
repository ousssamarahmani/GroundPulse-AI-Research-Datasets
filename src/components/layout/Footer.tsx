import React from 'react';
import { ShieldCheck, FileText, GitBranch, Terminal } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-mono text-xs py-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-zinc-900">
          
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-bold tracking-tighter uppercase text-sm font-sans">
              <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center shrink-0">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              GroundPulse AI
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Open research initiative exploring synthetic telemetry, baseline anomaly detection, and RF health analysis for satellite ground segments.
            </p>
            <div className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] text-zinc-400 uppercase tracking-widest">
              SYNTHETIC DATASET INITIATIVE
            </div>
          </div>

          {/* Col 2: Research Quicklinks */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Research Modules</h4>
            <ul className="space-y-1 text-zinc-400 text-xs">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">
                  Simulated Mission Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('telemetry')} className="hover:text-white transition-colors">
                  Telemetry & RF Spectral Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('anomalies')} className="hover:text-white transition-colors">
                  Baseline Anomaly Engine (Z-Score)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('passes')} className="hover:text-white transition-colors">
                  Orbital Pass Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Dataset Repository */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Open Repositories</h4>
            <ul className="space-y-1 text-zinc-400 text-xs">
              <li>
                <button onClick={() => setActiveTab('datasets')} className="hover:text-white flex items-center gap-1.5">
                  <GitBranch className="w-3 h-3 text-zinc-500" />
                  <span>groundpulse-datasets/</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('docs')} className="hover:text-white flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-zinc-500" />
                  <span>CITATION.cff Metadata</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-white flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-zinc-500" />
                  <span>Station Event Timeline</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Open Licenses */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Open Licensing</h4>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 bg-black border border-zinc-900 space-y-0.5">
                <span className="text-white font-semibold block text-[11px]">Code & Algorithms</span>
                <span className="text-zinc-500 block text-[10px]">Apache License 2.0</span>
              </div>
              <div className="p-2 bg-black border border-zinc-900 space-y-0.5">
                <span className="text-white font-semibold block text-[11px]">Synthetic Datasets</span>
                <span className="text-zinc-500 block text-[10px]">CC BY 4.0 International</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[10px] uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>GroundPulse AI Open Research Group © 2026 • Simulated Data Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Zenodo DOI</span>
            <span>•</span>
            <span>CC BY 4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
