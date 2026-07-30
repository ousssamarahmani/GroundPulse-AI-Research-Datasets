import React, { useState } from 'react';
import { TelemetryFrame } from '../../types/telemetry';
import { TelemetryCharts } from './TelemetryCharts';
import { Filter, Search, Download, Eye, X, Cpu, Layers } from 'lucide-react';
import { formatTimestamp } from '../../utils/format';

interface TelemetryExplorerProps {
  telemetry: TelemetryFrame[];
}

export const TelemetryExplorer: React.FC<TelemetryExplorerProps> = ({ telemetry }) => {
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [selectedSatellite, setSelectedSatellite] = useState<string>('ALL');
  const [anomalyOnly, setAnomalyOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inspectedFrame, setInspectedFrame] = useState<TelemetryFrame | null>(null);

  // Available Filter Options
  const stations = Array.from(new Set(telemetry.map(t => t.station_id)));
  const satellites = Array.from(new Set(telemetry.map(t => t.satellite_id)));

  // Filter Data
  const filteredData = telemetry.filter((frame) => {
    if (selectedStation !== 'ALL' && frame.station_id !== selectedStation) return false;
    if (selectedSatellite !== 'ALL' && frame.satellite_id !== selectedSatellite) return false;
    if (anomalyOnly && !frame.is_anomaly) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = 
        frame.id.toLowerCase().includes(q) ||
        frame.pass_id.toLowerCase().includes(q) ||
        frame.anomaly_label.toLowerCase().includes(q) ||
        frame.station_id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['id', 'timestamp', 'station_id', 'satellite_id', 'pass_id', 'snr_db', 'eb_no_db', 'temperature_c', 'packet_loss_pct', 'carrier_lock', 'antenna_state', 'modem_state', 'anomaly_label'];
    const rows = filteredData.map(f => [
      f.id, f.timestamp, f.station_id, f.satellite_id, f.pass_id, f.snr_db, f.eb_no_db, f.temperature_c, f.packet_loss_pct, f.carrier_lock, f.antenna_state, f.modem_state, f.anomaly_label
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `groundpulse_telemetry_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-300" />
            <span>Synthetic Telemetry Ingestion Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Telemetry Explorer & Spectral Curves
          </h2>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-white text-xs text-white font-mono flex items-center gap-2 self-start transition-all"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export Filtered CSV ({filteredData.length} Frames)</span>
        </button>
      </div>

      {/* Telemetry Visual Graphs */}
      <TelemetryCharts data={filteredData} />

      {/* Filter Controls Bar */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <span>Station:</span>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
              >
                <option value="ALL">All Stations (4)</option>
                {stations.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span>Satellite:</span>
              <select
                value={selectedSatellite}
                onChange={(e) => setSelectedSatellite(e.target.value)}
                className="px-2 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white"
              >
                <option value="ALL">All Satellites (4)</option>
                {satellites.map(sat => <option key={sat} value={sat}>{sat}</option>)}
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={anomalyOnly}
                onChange={(e) => setAnomalyOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded-none border-zinc-700 bg-black text-white focus:ring-0 accent-white"
              />
              <span>Injected Anomalies Only</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search Pass ID or Label..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-black border border-zinc-700 text-xs text-white font-mono focus:border-white w-52"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Data Table */}
      <div className="border border-zinc-800 bg-zinc-950 overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-zinc-300">
          <thead className="bg-black text-zinc-400 border-b border-zinc-800 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Frame ID</th>
              <th className="py-3 px-4">Timestamp (UTC)</th>
              <th className="py-3 px-4">Station ID</th>
              <th className="py-3 px-4">Pass ID</th>
              <th className="py-3 px-4">SNR (dB)</th>
              <th className="py-3 px-4">Eb/No (dB)</th>
              <th className="py-3 px-4">Temp (°C)</th>
              <th className="py-3 px-4">Packet Loss</th>
              <th className="py-3 px-4">Lock</th>
              <th className="py-3 px-4">Modem</th>
              <th className="py-3 px-4">Anomaly Label</th>
              <th className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredData.slice(0, 100).map((frame) => (
              <tr 
                key={frame.id}
                className={`hover:bg-zinc-900 transition-colors ${
                  frame.is_anomaly ? 'bg-zinc-950/80 font-semibold' : ''
                }`}
              >
                <td className="py-2.5 px-4 font-mono text-white">{frame.id}</td>
                <td className="py-2.5 px-4 text-zinc-400">{formatTimestamp(frame.timestamp)}</td>
                <td className="py-2.5 px-4 text-zinc-300">{frame.station_id}</td>
                <td className="py-2.5 px-4 text-zinc-400">{frame.pass_id}</td>
                <td className={`py-2.5 px-4 ${frame.snr_db < 8.0 ? 'text-white font-bold' : 'text-zinc-200'}`}>
                  {frame.snr_db.toFixed(2)} dB
                </td>
                <td className="py-2.5 px-4 text-zinc-400">{frame.eb_no_db.toFixed(2)} dB</td>
                <td className={`py-2.5 px-4 ${frame.temperature_c > 60 ? 'text-white font-bold' : 'text-zinc-400'}`}>
                  {frame.temperature_c.toFixed(1)}°C
                </td>
                <td className="py-2.5 px-4 text-zinc-400">{frame.packet_loss_pct.toFixed(1)}%</td>
                <td className="py-2.5 px-4">
                  <span className={`px-1.5 py-0.5 text-[9px] border ${
                    frame.carrier_lock === 'LOCKED'
                      ? 'border-zinc-700 text-zinc-300'
                      : 'border-white text-white font-bold'
                  }`}>
                    {frame.carrier_lock}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-zinc-400 text-[10px]">{frame.modem_state}</td>
                <td className="py-2.5 px-4">
                  {frame.is_anomaly ? (
                    <span className="px-2 py-0.5 text-[10px] border border-white text-white font-bold uppercase">
                      {frame.anomaly_label}
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-600 uppercase">NOMINAL</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-right">
                  <button
                    onClick={() => setInspectedFrame(frame)}
                    className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all"
                    title="Inspect Frame Payload"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length > 100 && (
          <div className="p-3 bg-black border-t border-zinc-800 text-center text-xs text-zinc-500 font-mono">
            Showing first 100 of {filteredData.length} frames. Use filters to narrow down view.
          </div>
        )}
      </div>

      {/* Frame Payload Inspector Modal */}
      {inspectedFrame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 max-w-2xl w-full p-6 space-y-4 font-mono text-xs shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-white font-bold">
                <Layers className="w-4 h-4 text-zinc-400" />
                <span>Telemetry Frame Payload ({inspectedFrame.id})</span>
              </div>
              <button
                onClick={() => setInspectedFrame(null)}
                className="p-1 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-400 text-[10px] block uppercase">Validated JSON Structure (telemetry.schema.json):</span>
              <pre className="p-4 bg-black border border-zinc-800 text-zinc-200 overflow-x-auto text-[11px] leading-relaxed">
                {JSON.stringify(inspectedFrame, null, 2)}
              </pre>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedFrame(null)}
                className="px-4 py-1.5 bg-zinc-900 border border-zinc-700 text-white hover:border-white font-mono text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
