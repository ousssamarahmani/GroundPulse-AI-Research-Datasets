import React from 'react';
import { Radio, Database, RefreshCw, Cpu, Layers, Activity, Calendar, FileCode, CheckSquare, ShieldCheck } from 'lucide-react';

export type NavTab = 
  | 'overview' 
  | 'dashboard' 
  | 'telemetry' 
  | 'rf' 
  | 'passes' 
  | 'anomalies' 
  | 'events' 
  | 'datasets' 
  | 'docs';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onRegenerate: () => void;
  seed: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onRegenerate, seed }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Research Overview', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Mission Overview', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'telemetry', label: 'Telemetry Explorer', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'rf', label: 'RF Health', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'passes', label: 'Pass Schedule', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'anomalies', label: 'Anomaly Engine', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Events & Timeline', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'datasets', label: 'Dataset Repository', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'docs', label: 'Docs & License', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Emblem */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
              <h1 className="text-lg font-bold tracking-tighter text-white uppercase font-sans">
                GroundPulse AI
              </h1>
            </div>
            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
            <span className="text-[10px] tracking-[0.2em] font-medium text-zinc-500 uppercase font-mono hidden sm:inline">
              Open Research Initiative
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-400 transition-all active:scale-95"
              title="Regenerate synthetic dataset with seed"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">Seed: #{seed}</span>
              <span className="text-[10px] text-zinc-500 uppercase font-mono">(Simulate)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-zinc-800/80 pt-1 pb-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? 'border-white text-black bg-white font-bold shadow-[0_0_10px_rgba(255,255,255,0.15)]'
                    : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-800 hover:bg-zinc-900/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
