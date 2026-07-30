import React, { useState } from 'react';
import { SyntheticPass } from '../../types/pass';
import { Calendar, Filter, Activity, ArrowUpRight, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { formatTimestamp } from '../../utils/format';

interface PassScheduleProps {
  passes: SyntheticPass[];
}

export const PassSchedule: React.FC<PassScheduleProps> = ({ passes }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterStation, setFilterStation] = useState<string>('ALL');

  const filteredPasses = passes.filter((p) => {
    if (filterStatus !== 'ALL' && p.pass_status !== filterStatus) return false;
    if (filterStation !== 'ALL' && p.station_id !== filterStation) return false;
    return true;
  });

  const stations = Array.from(new Set(passes.map(p => p.station_id)));

  return (
    <div className="space-y-6 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-300" />
            <span>Synthetic Orbit Pass Execution Schedule</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Pass Schedule & Elevation Tracks
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-2 bg-zinc-950 border border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="NOMINAL">NOMINAL</option>
              <option value="DEGRADED">DEGRADED</option>
              <option value="INTERRUPTED">INTERRUPTED</option>
              <option value="MISSED">MISSED</option>
              <option value="SIMULATED">SIMULATED</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Station:</span>
            <select
              value={filterStation}
              onChange={(e) => setFilterStation(e.target.value)}
              className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
            >
              <option value="ALL">All Stations</option>
              {stations.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-zinc-800 bg-zinc-950 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-zinc-300">
          <thead className="bg-black text-zinc-400 border-b border-zinc-800 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Pass ID</th>
              <th className="py-3 px-4">Satellite ID</th>
              <th className="py-3 px-4">Ground Station</th>
              <th className="py-3 px-4">AOS Time (UTC)</th>
              <th className="py-3 px-4">LOS Time (UTC)</th>
              <th className="py-3 px-4">Max Elev</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Avg SNR</th>
              <th className="py-3 px-4">Anomalies</th>
              <th className="py-3 px-4 text-right">Pass Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredPasses.map((pass) => (
              <tr key={pass.pass_id} className="hover:bg-zinc-900 transition-colors">
                <td className="py-3 px-4 font-bold text-white">{pass.pass_id}</td>
                <td className="py-3 px-4 text-zinc-300 font-semibold">{pass.satellite_id}</td>
                <td className="py-3 px-4 text-zinc-400">{pass.station_id}</td>
                <td className="py-3 px-4 text-zinc-400">{formatTimestamp(pass.aos_time)}</td>
                <td className="py-3 px-4 text-zinc-400">{formatTimestamp(pass.los_time)}</td>
                <td className="py-3 px-4 text-white font-bold">{pass.max_elevation_deg}°</td>
                <td className="py-3 px-4 text-zinc-400">{pass.expected_duration_sec}s</td>
                <td className="py-3 px-4 text-zinc-300 font-bold">{pass.average_snr_db} dB</td>
                <td className="py-3 px-4">
                  {pass.anomaly_count > 0 ? (
                    <span className="px-1.5 py-0.5 text-[10px] border border-white text-white font-bold">
                      {pass.anomaly_count} Anomalies
                    </span>
                  ) : (
                    <span className="text-zinc-600 text-[10px]">0</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2 py-1 text-[10px] font-mono border ${
                    pass.pass_status === 'NOMINAL'
                      ? 'border-white text-white bg-zinc-900'
                      : pass.pass_status === 'DEGRADED'
                      ? 'border-zinc-500 text-zinc-300'
                      : pass.pass_status === 'INTERRUPTED'
                      ? 'border-white text-white bg-zinc-800 font-bold'
                      : 'border-zinc-800 text-zinc-600'
                  }`}>
                    {pass.pass_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Parabolic Elevation Track Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-zinc-400" />
          <span>Simulated Orbit Elevation Profiles (0° to Max Elevation)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPasses.slice(0, 4).map((p) => (
            <div key={p.pass_id} className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">{p.pass_id} — {p.satellite_id}</div>
                  <div className="text-[10px] text-zinc-500">{p.station_id}</div>
                </div>
                <span className="text-xs font-mono text-zinc-300 font-bold">{p.max_elevation_deg}° Peak</span>
              </div>

              {/* Simple Parabolic SVG Elevation Arc */}
              <div className="h-16 w-full bg-black border border-zinc-900 relative flex items-center justify-center p-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                  <path
                    d="M 10 35 Q 100 5 190 35"
                    fill="none"
                    stroke={p.pass_status === 'NOMINAL' ? '#ffffff' : '#71717a'}
                    strokeWidth="1.5"
                    strokeDasharray={p.pass_status === 'INTERRUPTED' ? '4 4' : undefined}
                  />
                  {/* Zenith dot */}
                  <circle cx="100" cy="8" r="3" fill="#ffffff" />
                </svg>
                <span className="absolute bottom-1 left-2 text-[9px] text-zinc-600">AOS (5°)</span>
                <span className="absolute top-1 text-[9px] text-zinc-300">Zenith ({p.max_elevation_deg}°)</span>
                <span className="absolute bottom-1 right-2 text-[9px] text-zinc-600">LOS (5°)</span>
              </div>

              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>Signal Quality: <strong className="text-white">{p.signal_quality}</strong></span>
                <span>Average SNR: <strong className="text-white">{p.average_snr_db} dB</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
