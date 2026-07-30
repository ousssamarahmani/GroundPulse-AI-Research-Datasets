import React, { useState } from 'react';
import { GeneratedDataset } from '../../data/generateTelemetry';
import { IncidentRecord, StationEvent } from '../../types/incident';
import { Activity, Clock, ShieldAlert, FileText, ChevronRight, Layers, Radio } from 'lucide-react';
import { formatTimestamp } from '../../utils/format';

interface EventTimelineProps {
  dataset: GeneratedDataset;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ dataset }) => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(dataset.incidents[0] || null);

  const events = dataset.events;
  const incidents = dataset.incidents;

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-zinc-300" />
            <span>Station Equipment Events & Incident Reconstruction</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Station Events & Incident Timeline
          </h2>
        </div>
      </div>

      {/* Two-Column Layout: Left Events Feed, Right Incident Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Synthetic Station Events Feed (1 col) */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span>Simulated Event Feed ({events.length})</span>
            </h3>
            <span className="text-[10px] text-zinc-500">Real-Time Ingestion</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {events.map((evt) => (
              <div 
                key={evt.event_id}
                className="p-3 bg-black border border-zinc-900 space-y-1 text-xs hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{evt.event_id}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 border ${
                    evt.severity === 'HIGH'
                      ? 'border-white text-white font-bold'
                      : 'border-zinc-700 text-zinc-400'
                  }`}>
                    {evt.event_type}
                  </span>
                </div>

                <div className="text-zinc-300 font-mono text-[11px]">{evt.message}</div>
                
                <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
                  <span>{evt.component}</span>
                  <span>{formatTimestamp(evt.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Incident Timeline & Research Reconstruction (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-zinc-400" />
                <span>Synthesized Research Incidents ({incidents.length})</span>
              </h3>
              <span className="text-xs text-zinc-500">Select incident to inspect timeline</span>
            </div>

            {/* Incident Selection Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`px-3 py-2 text-xs border font-mono flex items-center gap-2 ${
                    selectedIncident?.incident_id === inc.incident_id
                      ? 'border-white bg-zinc-900 text-white font-bold'
                      : 'border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{inc.incident_id}</span>
                  <span className="text-[10px] text-zinc-500">({inc.incident_type})</span>
                </button>
              ))}
            </div>

            {/* Selected Incident Details */}
            {selectedIncident && (
              <div className="p-5 bg-black border border-zinc-800 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div>
                    <span className="text-lg font-bold text-white">{selectedIncident.incident_id}</span>
                    <span className="text-zinc-400 ml-2 font-semibold">[{selectedIncident.incident_type}]</span>
                  </div>
                  <span className="px-2 py-0.5 border border-white text-white font-bold text-[10px]">
                    STATUS: {selectedIncident.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Station ID:</span>
                    <span className="text-white font-bold">{selectedIncident.station_id}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Related Pass ID:</span>
                    <span className="text-white font-bold">{selectedIncident.related_pass_id}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] block uppercase">Summary:</span>
                  <p className="text-zinc-200 text-xs leading-relaxed">{selectedIncident.summary}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] block uppercase">Probable Cause:</span>
                  <p className="text-zinc-300 text-xs">{selectedIncident.probable_cause}</p>
                </div>

                {/* Research Recommendation Disclaimer Box */}
                <div className="p-4 bg-zinc-950 border border-zinc-700 text-xs text-white space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-zinc-200">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Research Guidance Recommendation</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    {selectedIncident.research_recommendation}
                  </p>
                  <div className="text-[10px] text-zinc-500 italic pt-1">
                    [DISCLAIMER] All recommendations above are theoretical research suggestions for baseline model evaluation. Never execute automated operational commands on real ground station hardware without operator review.
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
