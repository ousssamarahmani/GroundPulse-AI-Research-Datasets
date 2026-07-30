import React, { useState } from 'react';
import { Cloud, Cpu, Server, Database, Code, CheckCircle2, Shield, Info, ArrowRight } from 'lucide-react';

export const AWS_SERVICES = [
  {
    name: 'AWS IoT Core',
    role: 'Ground-Station Antenna Ingest',
    description: 'Managed MQTT broker accepting high-frequency modem telemetry frames from remote ground station gateways.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon Kinesis Data Streams',
    role: 'Real-Time Telemetry Bus',
    description: 'Buffers streaming RF metrics and telemetry frames at millisecond latency for parallel processing.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'AWS Lambda',
    role: 'Real-Time Rule Evaluator',
    description: 'Executes serverless threshold rule checks and triggers immediate alerts on lock drops or thermal spikes.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon S3 & Timestream',
    role: 'Time-Series Data Lake',
    description: 'Stores raw telemetry parquet files in S3 and optimized time-series indices in Amazon Timestream.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon SageMaker AI',
    role: 'ML Anomaly Training',
    description: 'Trains Isolation Forest and Sequence Models on historical telemetry to flag subtle multi-channel degradation.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon Bedrock',
    role: 'Mission Copilot (RAG)',
    description: 'Evaluates LLM reasoning over ground-station incident manuals and automated telemetry incident summaries.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon API Gateway',
    role: 'Research REST/WebSocket API',
    description: 'Exposes secure endpoints for dashboard visualization and remote mission control client subscription.',
    status: 'Proposed Future Research Path',
  },
  {
    name: 'Amazon CloudWatch',
    role: 'Operational Monitoring & Alarms',
    description: 'Monitors pipeline latency, ingestion throughput, and AWS infrastructure operational health metrics.',
    status: 'Proposed Future Research Path',
  },
];

export const AWSIntegrationSection: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'sagemaker' | 'timestream' | 'iot'>('sagemaker');

  const sagemakerCode = `import boto3
import pandas as pd
from sklearn.ensemble import IsolationForest

# GroundPulse AI — SageMaker Research Baseline Script
# Load telemetry dataset from S3
s3 = boto3.client('s3')
bucket_name = 'groundpulse-research-datasets'
key = 'datasets/samples/telemetry.csv'

obj = s3.get_object(Bucket=bucket_name, Key=key)
df = pd.read_csv(obj['Body'])

# Feature extraction: SNR, Eb/No, Temperature, Packet Loss
X = df[['snr_db', 'eb_no_db', 'temperature_c', 'packet_loss_pct']]

# Train Isolation Forest model
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
df['anomaly_score'] = model.fit_predict(X)

print("Detected Anomaly Count (SageMaker Baseline):", (df['anomaly_score'] == -1).sum())`;

  const timestreamCode = `SELECT station_id, satellite_id, AVG(snr_db) as avg_snr, MAX(temperature_c) as max_temp
FROM "groundpulse_db"."telemetry_table"
WHERE time >= ago(2h)
GROUP BY station_id, satellite_id
ORDER BY max_temp DESC`;

  const iotCode = `{
  "topic": "groundpulse/stations/GS-SVALBARD-01/telemetry",
  "payload": {
    "timestamp": "2026-07-30T03:30:00.000Z",
    "snr_db": 14.82,
    "carrier_lock": "LOCKED",
    "temperature_c": 38.4
  }
}`;

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-zinc-300" />
            <span>Experimental AWS SpaceTech Research Integration</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Proposed AWS Research Architecture Path
          </h2>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
          <Info className="w-4 h-4 text-zinc-400" />
          <span>AWS Architecture Disclaimer</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The AWS architecture described in this section represents a proposed future research deployment blueprint. The current interactive prototype runs entirely in a self-contained local environment using synthetic generation models.
        </p>
      </div>

      {/* 8 AWS Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AWS_SERVICES.map((srv) => (
          <div key={srv.name} className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">{srv.name}</span>
              <Cloud className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="text-[10px] text-zinc-400 font-mono font-semibold uppercase">{srv.role}</div>

            <p className="text-xs text-zinc-400 leading-relaxed">{srv.description}</p>

            <div className="pt-2 border-t border-zinc-900 text-[9px] text-zinc-500 font-mono uppercase">
              {srv.status}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive AWS Python & Query Snippet Inspector */}
      <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
            <Code className="w-4 h-4 text-zinc-400" />
            <span>AWS Research Code Examples</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveCodeTab('sagemaker')}
              className={`px-3 py-1 text-xs border ${
                activeCodeTab === 'sagemaker' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              SageMaker Python Script
            </button>
            <button
              onClick={() => setActiveCodeTab('timestream')}
              className={`px-3 py-1 text-xs border ${
                activeCodeTab === 'timestream' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              Timestream SQL Query
            </button>
            <button
              onClick={() => setActiveCodeTab('iot')}
              className={`px-3 py-1 text-xs border ${
                activeCodeTab === 'iot' ? 'border-white bg-zinc-900 text-white font-bold' : 'border-zinc-800 text-zinc-400'
              }`}
            >
              IoT Core Payload
            </button>
          </div>
        </div>

        <pre className="p-4 bg-black border border-zinc-800 text-zinc-200 text-xs overflow-x-auto leading-relaxed">
          {activeCodeTab === 'sagemaker' && sagemakerCode}
          {activeCodeTab === 'timestream' && timestreamCode}
          {activeCodeTab === 'iot' && iotCode}
        </pre>
      </div>

    </div>
  );
};
