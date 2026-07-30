import React, { useState } from 'react';
import { MOCK_RESEARCH_TASKS } from '../../data/mockTasks';
import { ResearchTask, TaskPhase, TaskStatus } from '../../types/task';
import { CheckSquare, Filter, ChevronRight, X, Clock, Layers, FileText } from 'lucide-react';

export const TaskRoadmapBoard: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeTaskModal, setActiveTaskModal] = useState<ResearchTask | null>(null);

  const filteredTasks = MOCK_RESEARCH_TASKS.filter((t) => {
    if (selectedPhase !== 'ALL' && t.phase !== selectedPhase) return false;
    if (selectedStatus !== 'ALL' && t.status !== selectedStatus) return false;
    return true;
  });

  const phases: TaskPhase[] = [
    'Phase 1 — Research Foundation',
    'Phase 2 — Baseline Analytics',
    'Phase 3 — Research Dashboard',
    'Phase 4 — AWS Baseline',
    'Phase 5 — Future Research',
  ];

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-zinc-300" />
            <span>Open Research Roadmap & Task Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Research Tasks & Implementation Board
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-2 bg-zinc-950 border border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Phase:</span>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
            >
              <option value="ALL">All Phases (1-5)</option>
              {phases.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="BASELINE_COMPLETE">BASELINE COMPLETE</option>
              <option value="RESEARCH_VALIDATED">RESEARCH VALIDATED</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="PLANNED">PLANNED</option>
              <option value="NOT_STARTED">NOT STARTED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List Grid grouped by Phase */}
      <div className="space-y-8">
        {phases.map((phaseName) => {
          const phaseTasks = filteredTasks.filter(t => t.phase === phaseName);
          if (phaseTasks.length === 0) return null;

          return (
            <div key={phaseName} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 text-sm font-bold text-white uppercase tracking-wider">
                <span className="w-2 h-2 bg-white" />
                <span>{phaseName}</span>
                <span className="text-xs font-normal text-zinc-500">({phaseTasks.length} Tasks)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setActiveTaskModal(task)}
                    className="p-5 bg-zinc-950 border border-zinc-800 hover:border-zinc-500 transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">{task.id}</span>
                        <span className="text-[10px] px-1.5 py-0.5 border border-zinc-700 text-zinc-400">
                          {task.complexity}
                        </span>
                      </div>

                      {/* Status badge */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                        task.status === 'BASELINE_COMPLETE' || task.status === 'RESEARCH_VALIDATED'
                          ? 'border-white text-white font-bold bg-zinc-900'
                          : task.status === 'IN_PROGRESS'
                          ? 'border-zinc-500 text-zinc-300'
                          : 'border-zinc-800 text-zinc-500'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {task.title}
                    </h4>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-900 flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>Priority: <strong className="text-zinc-300">{task.priority}</strong></span>
                      <span>{task.related_files.length} Related Files</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Inspection Drawer Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 max-w-2xl w-full p-6 space-y-4 font-mono text-xs shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckSquare className="w-4 h-4 text-zinc-400" />
                <span>{activeTaskModal.id} — Task Details</span>
              </div>
              <button
                onClick={() => setActiveTaskModal(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-base font-bold text-white">{activeTaskModal.title}</h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Phase:</span>
                <span className="text-white">{activeTaskModal.phase}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Status:</span>
                <span className="text-white font-bold">{activeTaskModal.status}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block">Description:</span>
              <p className="text-zinc-300 leading-relaxed">{activeTaskModal.description}</p>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block">Definition of Done:</span>
              <p className="text-zinc-200 bg-black p-3 border border-zinc-900 leading-relaxed">{activeTaskModal.definition_of_done}</p>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block">Related Repository Files:</span>
              <div className="space-y-1">
                {activeTaskModal.related_files.map((file, idx) => (
                  <div key={idx} className="p-2 bg-black border border-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {file}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTaskModal(null)}
                className="px-4 py-1.5 bg-zinc-900 border border-zinc-700 text-white hover:border-white font-mono text-xs"
              >
                Close Task Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
