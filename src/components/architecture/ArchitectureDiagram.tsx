import React, { useState } from 'react';
import { Layers, ArrowRight, Server, Cloud, Cpu, Database, FileText, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export interface ArchNode {
  id: string;
  title: string;
  category: 'local' | 'aws';
  purpose: string;
  inputs: string[];
  outputs: string[];
  status: 'Baseline Implemented' | 'Experimental' | 'Proposed Future Research Path';
  relatedFiles: string[];
  futureProductionConsiderations: string;
}

export const ARCH_NODES: ArchNode[] = [
  {
    id: 'gen',
    title: '1. Synthetic Ground Stations & Generator',
    category: 'local',
    purpose: 'Generates deterministic telemetry curves, parabolic elevation profiles, and path loss equations.',
    inputs: ['Random Seed (--seed)', 'Station Profiles', 'Orbital Parameters'],
    outputs: ['Raw Telemetry Streams', 'RF Metrics (30s Resolution)'],
    status: 'Baseline Implemented',
    relatedFiles: ['generator/generate_telemetry.py', 'src/data/generateTelemetry.ts'],
    futureProductionConsiderations: 'In production, replace generator with real ground station M&C (Monitor & Control) telemetry ingest over CCSDS protocols.',
  },
  {
    id: 'scenarios',
    title: '2. Scenario Injection Engine',
    category: 'local',
    purpose: 'Injects reproducible rain fade, thermal drift, modem PLL slip, and servo offset fault scenarios.',
    inputs: ['YAML Scenario Definitions', 'Nominal Telemetry'],
    outputs: ['Corrupted Telemetry', 'Ground-Truth Anomaly Labels'],
    status: 'Baseline Implemented',
    relatedFiles: ['generator/inject_anomalies.py', 'scenarios/signal_degradation.yaml'],
    futureProductionConsiderations: 'Used in staging to stress-test automated alert rules before live satellite pass execution.',
  },
  {
    id: 'datasets',
    title: '3. Local Data & Schema Validation',
    category: 'local',
    purpose: 'Validates CSV and JSON datasets against Draft 2020-12 schema definitions.',
    inputs: ['Generated CSV files'],
    outputs: ['Validated Schema Objects', 'Data Dictionary'],
    status: 'Baseline Implemented',
    relatedFiles: ['schemas/telemetry.schema.json', 'datasets/samples/telemetry.csv'],
    futureProductionConsiderations: 'Enforce schema validation at API Gateway boundary to reject malformed modem telemetry frames.',
  },
  {
    id: 'detection',
    title: '4. Baseline Anomaly Detection',
    category: 'local',
    purpose: 'Executes static threshold rules and moving window Z-score ($\mu \pm k\sigma$) anomaly detectors.',
    inputs: ['TelemetryFrames (SNR, Temp, Loss)'],
    outputs: ['Anomaly Flags', 'Confidence Scores'],
    status: 'Baseline Implemented',
    relatedFiles: ['notebooks/03_baseline_anomaly_detection.ipynb', 'src/utils/statistics.ts'],
    futureProductionConsiderations: 'Deploy detection pipeline as serverless microservices or streaming Flink jobs.',
  },
  {
    id: 'dashboard',
    title: '5. GroundPulse AI Dashboard',
    category: 'local',
    purpose: 'Renders monochrome mission control UI, RF oscilloscope canvas, pass schedule, and anomaly timeline.',
    inputs: ['Research API payloads'],
    outputs: ['Interactive Visualization', 'CSV Exports'],
    status: 'Baseline Implemented',
    relatedFiles: ['src/App.tsx', 'src/components/telemetry/TelemetryExplorer.tsx'],
    futureProductionConsiderations: 'Connect UI to WebSocket stream for live real-time pass instrumentation.',
  },

  // AWS Proposed Future Path
  {
    id: 'aws_iot',
    title: 'AWS IoT Core (Proposed)',
    category: 'aws',
    purpose: 'Managed MQTT broker ingesting telemetry from global distributed ground station antennas.',
    inputs: ['MQTT Telemetry Topics'],
    outputs: ['Kinesis Stream Payloads'],
    status: 'Proposed Future Research Path',
    relatedFiles: ['docs/aws_quickstart.md'],
    futureProductionConsiderations: 'Requires X.509 device certificates installed on ground station modem edge gateways.',
  },
  {
    id: 'aws_timestream',
    title: 'Amazon Timestream & S3 (Proposed)',
    category: 'aws',
    purpose: 'Fast time-series telemetry database and cold S3 parquet data lake storage.',
    inputs: ['Stream records'],
    outputs: ['Time-series telemetry queries'],
    status: 'Proposed Future Research Path',
    relatedFiles: ['docs/aws_quickstart.md'],
    futureProductionConsiderations: 'Automatic lifecycle policy archiving telemetry older than 90 days to S3 Glacier.',
  },
  {
    id: 'aws_sagemaker',
    title: 'Amazon SageMaker AI (Proposed)',
    category: 'aws',
    purpose: 'Trains and hosts multivariate Isolation Forest and sequence models for anomaly detection.',
    inputs: ['S3 Parquet Telemetry Datasets'],
    outputs: ['SageMaker Endpoint Predictions'],
    status: 'Proposed Future Research Path',
    relatedFiles: ['notebooks/04_aws_sagemaker_baseline.ipynb', 'examples/sagemaker_inference_example.py'],
    futureProductionConsiderations: 'Auto-scaling endpoint instances based on active pass concurrency.',
  },
  {
    id: 'aws_bedrock',
    title: 'Amazon Bedrock Mission Copilot (Proposed)',
    category: 'aws',
    purpose: 'LLM RAG reasoning over ground-station incident manuals and past anomaly reconstructions.',
    inputs: ['Incident Record Text', 'Telemetry Summary'],
    outputs: ['Operational Guidance Recommendations'],
    status: 'Proposed Future Research Path',
    relatedFiles: ['docs/aws_quickstart.md'],
    futureProductionConsiderations: 'Strict human-in-the-loop validation for any operational command generation.',
  },
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[0]);

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-300" />
            <span>Open System Architecture & Data Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Research Architecture & AWS Path
          </h2>
        </div>
      </div>

      {/* Main Interactive Flow Diagram */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
        
        {/* Local Pipeline Flow */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-white font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-white" />
            <span>1. Current Local Research Pipeline (Baseline Implemented)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ARCH_NODES.filter(n => n.category === 'local').map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 bg-black border cursor-pointer transition-all space-y-2 ${
                  selectedNode.id === node.id
                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Local Module</div>
                <div className="text-xs font-bold text-white font-mono">{node.title}</div>
                <div className="text-[10px] text-zinc-400 line-clamp-2">{node.purpose}</div>
                <div className="text-[9px] px-1.5 py-0.5 border border-white text-white font-mono inline-block">
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator Arrow */}
        <div className="flex items-center justify-center text-zinc-600">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </div>

        {/* Proposed AWS Cloud Future Path (Dashed Line Border) */}
        <div className="p-4 border-2 border-dashed border-zinc-700 bg-black/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-zinc-400" />
              <span>2. Proposed Future AWS Cloud Architecture (Dashed Path — Research Target)</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Theoretical AWS Integration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCH_NODES.filter(n => n.category === 'aws').map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 bg-zinc-950 border cursor-pointer transition-all space-y-2 ${
                  selectedNode.id === node.id
                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="text-[10px] text-zinc-500 uppercase font-mono">AWS Research Path</div>
                <div className="text-xs font-bold text-white font-mono">{node.title}</div>
                <div className="text-[10px] text-zinc-400 line-clamp-2">{node.purpose}</div>
                <div className="text-[9px] px-1.5 py-0.5 border border-zinc-600 text-zinc-400 font-mono inline-block">
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Node Detailed Inspector */}
      {selectedNode && (
        <div className="p-6 bg-zinc-950 border border-zinc-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-xs text-zinc-500 uppercase font-mono block">Node Detail Inspector:</span>
              <h3 className="text-base font-bold text-white font-mono">{selectedNode.title}</h3>
            </div>
            <span className="px-2 py-0.5 text-xs font-mono border border-white text-white">
              {selectedNode.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Purpose:</span>
                <p className="text-zinc-200 leading-relaxed">{selectedNode.purpose}</p>
              </div>

              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Data Inputs:</span>
                <ul className="list-disc list-inside text-zinc-300">
                  {selectedNode.inputs.map((inp, idx) => <li key={idx}>{inp}</li>)}
                </ul>
              </div>

              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Data Outputs:</span>
                <ul className="list-disc list-inside text-zinc-300">
                  {selectedNode.outputs.map((out, idx) => <li key={idx}>{out}</li>)}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Related Repository Files:</span>
                <div className="space-y-1">
                  {selectedNode.relatedFiles.map((rf, idx) => (
                    <div key={idx} className="p-2 bg-black border border-zinc-900 text-zinc-200">
                      {rf}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Future Production Considerations:</span>
                <p className="text-zinc-300 leading-relaxed italic">{selectedNode.futureProductionConsiderations}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
