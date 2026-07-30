import React, { useState } from 'react';
import { TelemetryFrame } from '../../types/telemetry';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceArea } from 'recharts';

const RefArea = ReferenceArea as unknown as React.ComponentType<any>;
import { formatTimeOnly } from '../../utils/format';

interface TelemetryChartsProps {
  data: TelemetryFrame[];
}

export const TelemetryCharts: React.FC<TelemetryChartsProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'snr' | 'temp' | 'packet' | 'ebno'>('snr');

  // Format data for Recharts
  const chartData = data.map((t, idx) => ({
    index: idx,
    time: formatTimeOnly(t.timestamp),
    snr_db: t.snr_db,
    eb_no_db: t.eb_no_db,
    temperature_c: t.temperature_c,
    packet_loss_pct: t.packet_loss_pct,
    lock_val: t.carrier_lock === 'LOCKED' ? 1 : t.carrier_lock === 'DEGRADED' ? 0.5 : 0,
    is_anomaly: t.is_anomaly,
    anomaly_label: t.anomaly_label,
  }));

  // Find anomaly ranges for reference highlights
  const anomalyWindows: { start: string; end: string; label: string }[] = [];
  let currentWindow: { start: string; end: string; label: string } | null = null;

  chartData.forEach((d) => {
    if (d.is_anomaly) {
      if (!currentWindow) {
        currentWindow = { start: d.time, end: d.time, label: d.anomaly_label };
      } else {
        currentWindow.end = d.time;
      }
    } else if (currentWindow) {
      anomalyWindows.push(currentWindow);
      currentWindow = null;
    }
  });
  if (currentWindow) anomalyWindows.push(currentWindow);

  return (
    <div className="space-y-4 p-5 bg-zinc-950 border border-zinc-800 font-mono">
      
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs uppercase text-white font-bold">
          <span className="w-2 h-2 bg-white" />
          <span>Telemetry Signal Curves (360 Frames)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveMetric('snr')}
            className={`px-3 py-1 text-xs border ${
              activeMetric === 'snr' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            SNR (dB)
          </button>
          <button
            onClick={() => setActiveMetric('ebno')}
            className={`px-3 py-1 text-xs border ${
              activeMetric === 'ebno' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Eb/No (dB)
          </button>
          <button
            onClick={() => setActiveMetric('temp')}
            className={`px-3 py-1 text-xs border ${
              activeMetric === 'temp' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Temp (°C)
          </button>
          <button
            onClick={() => setActiveMetric('packet')}
            className={`px-3 py-1 text-xs border ${
              activeMetric === 'packet' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Packet Loss (%)
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="time" stroke="#71717a" tick={{ fontSize: 10 }} interval={30} />
            <YAxis stroke="#71717a" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', fontSize: '11px', fontFamily: 'monospace' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#a1a1aa' }}
            />

            {/* Render Anomaly Windows in Monochrome Gray overlay */}
            {anomalyWindows.map((win, idx) => (
              <React.Fragment key={`win-${idx}`}>
                <RefArea
                  x1={win.start}
                  x2={win.end}
                  stroke="#52525b"
                  strokeOpacity={0.4}
                  fill="#3f3f46"
                  fillOpacity={0.25}
                />
              </React.Fragment>
            ))}

            {activeMetric === 'snr' && (
              <Line
                type="monotone"
                dataKey="snr_db"
                name="SNR (dB)"
                stroke="#ffffff"
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, fill: '#ffffff' }}
              />
            )}

            {activeMetric === 'ebno' && (
              <Line
                type="monotone"
                dataKey="eb_no_db"
                name="Eb/No (dB)"
                stroke="#d4d4d8"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {activeMetric === 'temp' && (
              <Line
                type="monotone"
                dataKey="temperature_c"
                name="Temp (°C)"
                stroke="#ffffff"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {activeMetric === 'packet' && (
              <Line
                type="monotone"
                dataKey="packet_loss_pct"
                name="Packet Loss (%)"
                stroke="#a1a1aa"
                strokeWidth={1.5}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-white inline-block" />
            <span>Telemetry Curve</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-zinc-800 border border-zinc-600 inline-block" />
            <span>Injected Anomaly Window</span>
          </div>
        </div>

        <span>Data: 360 Telemetry Frames (Monochrome Vector trace)</span>
      </div>

    </div>
  );
};
