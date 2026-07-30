import { RepoFileNode } from '../types/repository';

export const MOCK_REPOSITORY_TREE: RepoFileNode = {
  path: 'groundpulse-datasets',
  name: 'groundpulse-datasets',
  type: 'directory',
  children: [
    {
      path: 'groundpulse-datasets/README.md',
      name: 'README.md',
      type: 'file',
      language: 'markdown',
      description: 'Main project research overview, quickstart instructions, dataset disclaimer, and research goals.',
      content: `# GroundPulse AI — Open Synthetic Ground-Segment Research Datasets

> **DISCLAIMER:** GroundPulse AI is an experimental open research project. All telemetry, RF metrics, satellite pass schedules, station events, anomaly labels, and incident logs contained in this repository are synthetic or derived from explicitly documented public orbital models. This dataset is strictly for ground-segment AI/ML research and is NOT connected to live operational satellite infrastructure.

---

## 🛰️ Research Overview

GroundPulse AI provides reproducible, standardized synthetic telemetry datasets and baseline analytics code for researching ground-station health, RF signal degradation, pass-quality evaluation, and mission control anomaly detection.

### Core Research Focus Areas:
1. **RF Signal Health & Rain Fade:** Modeling SNR, Eb/No degradation under adverse atmospheric conditions.
2. **Sub-system Thermal & Equipment Drift:** Simulating LNA cooling failures and amplifier thermal runaway.
3. **Pass-Quality & Interruption Analytics:** Automated classification of nominal vs. degraded satellite passes.
4. **Baseline Anomaly Detection Benchmarks:** Comparing static thresholds, moving Z-score envelopes, and multivariate models.
5. **AWS SpaceTech Architecture Prototyping:** Documenting future research integration with AWS IoT Core, Timestream, and SageMaker.

---

## 📁 Repository Quickstart

\`\`\`bash
# Clone the open research dataset repository
git clone https://github.com/groundpulse-ai/groundpulse-datasets.git
cd groundpulse-datasets

# Install Python synthetic generator dependencies
pip install -r generator/requirements.txt

# Run deterministic telemetry generator (Seed: 42)
python generator/generate_telemetry.py --seed 42 --out-dir datasets/samples/
\`\`\`

---

## 📜 Dataset Licenses
- **Code & Generator Scripts:** Apache License 2.0 (\`LICENSE\`)
- **Generated Datasets:** Creative Commons Attribution 4.0 International (\`DATA_LICENSE.md\`)

---

## 📌 Citation
If you use GroundPulse AI synthetic datasets or baseline anomaly scripts in your research, please cite:

\`\`\`bibtex
@dataset{groundpulse_ai_2026,
  author       = {GroundPulse AI Open Research Initiative},
  title        = {GroundPulse Synthetic Satellite Ground-Station Telemetry and RF Health Dataset},
  year         = 2026,
  version      = {v1.0.4-synth},
  publisher    = {Zenodo / GitHub},
  url          = {https://github.com/groundpulse-ai/groundpulse-datasets}
}
\`\`\`
`,
    },
    {
      path: 'groundpulse-datasets/LICENSE',
      name: 'LICENSE',
      type: 'file',
      language: 'text',
      description: 'Apache License 2.0 for all code and scripts.',
      content: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

[Full Apache 2.0 License Text]`,
    },
    {
      path: 'groundpulse-datasets/DATA_LICENSE.md',
      name: 'DATA_LICENSE.md',
      type: 'file',
      language: 'markdown',
      description: 'Creative Commons Attribution 4.0 International license for synthetic data files.',
      content: `# Data License — Creative Commons Attribution 4.0 International (CC BY 4.0)

All synthetic datasets contained within the \`datasets/\` directory of the GroundPulse AI project are licensed under the Creative Commons Attribution 4.0 International License.

## You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially.

## Under the following terms:
- **Attribution** — You must give appropriate credit to GroundPulse AI, provide a link to the license, and indicate if changes were made.

*Note: Third-party public orbital TLE data or public domain satellite parameters referenced in methodology documentation remain subject to their original public licenses.*`,
    },
    {
      path: 'groundpulse-datasets/CITATION.cff',
      name: 'CITATION.cff',
      type: 'file',
      language: 'cff',
      description: 'Citation File Format (CFF) metadata for scientific publication.',
      content: `cff-version: 1.2.0
message: "If you use GroundPulse AI synthetic datasets or benchmarks in academic work, please cite as below."
title: "GroundPulse AI: Synthetic Satellite Ground-Station Telemetry & RF Anomaly Benchmark Dataset"
authors:
  - name: "GroundPulse AI Open Research Group"
version: "1.0.4-synth"
date-released: 2026-07-30
license: "CC-BY-4.0"
repository-code: "https://github.com/groundpulse-ai/groundpulse-datasets"
keywords:
  - satellite ground station
  - RF health monitoring
  - synthetic anomaly detection
  - spacetech telemetry
  - open research dataset`,
    },
    {
      path: 'groundpulse-datasets/CONTRIBUTING.md',
      name: 'CONTRIBUTING.md',
      type: 'file',
      language: 'markdown',
      description: 'Rules for contributing new synthetic anomaly scenarios and schema updates.',
      content: `# Contributing to GroundPulse AI Datasets

Thank you for contributing to the GroundPulse AI open research repository.

## Contribution Guidelines:
1. **Deterministic Reproducibility:** Any new anomaly generator script must accept an explicit random seed (\`--seed\`).
2. **Schema Compliance:** All generated telemetry CSVs must validate against their corresponding JSON schema in \`schemas/\`.
3. **No Operational Data:** Do NOT submit proprietary, classified, or real operational satellite telemetry. Only submit synthetic or public domain data.
4. **Markdown Notebooks:** Ensure Jupyter notebooks in \`notebooks/\` include clean markdown commentary explaining mathematical formulas and baseline assumptions.`,
    },
    {
      path: 'groundpulse-datasets/SECURITY.md',
      name: 'SECURITY.md',
      type: 'file',
      language: 'markdown',
      description: 'Security policies and credential safety disclaimers.',
      content: `# Security & Data Safety Policy

GroundPulse AI is an open research project focused exclusively on synthetic telemetry data.

## Important Safety Principles:
- **Zero Real Credentials:** This repository must NEVER contain ground station API keys, orbital control credentials, or AWS secret keys.
- **Public Datasets Only:** All telemetry values are generated via mathematical simulation models (Rician fading, atmospheric attenuation, thermal resistance formulas).
- **Reporting Security Issues:** If you suspect an accidental inclusion of confidential material or security flaw in generator tools, please report privately to security@groundpulse-research.org.`,
    },
    {
      path: 'groundpulse-datasets/limitations.md',
      name: 'limitations.md',
      type: 'file',
      language: 'markdown',
      description: 'Technical and scientific limitations of the synthetic datasets.',
      content: `# Research Limitations & Assumptions

GroundPulse AI datasets provide a controlled testbed for ground-segment telemetry analysis. Researchers must take note of the following explicit limitations:

1. **Simplified Atmospheric Models:** Rain fade is modeled using empirical attenuation step functions rather than 3D Doppler radar cloud density profiles.
2. **Thermal Inertia:** LNA sub-system thermal drift uses simplified 1st-order differential equations without multi-component conduction feedback.
3. **Noise Channel:** RF metric generation assumes additive white Gaussian noise (AWGN) with optional Rician fading; complex phase jitter and ionospheric scintillation are simplified.
4. **No Operational Guarantee:** Baseline anomaly rules (Z-score, thresholding) are provided as baseline benchmarks only and are not certified for real-world spaceflight operations.`,
    },
    {
      path: 'groundpulse-datasets/datasets',
      name: 'datasets',
      type: 'directory',
      children: [
        {
          path: 'groundpulse-datasets/datasets/samples',
          name: 'samples',
          type: 'directory',
          children: [
            {
              path: 'groundpulse-datasets/datasets/samples/telemetry.csv',
              name: 'telemetry.csv',
              type: 'file',
              language: 'csv',
              description: 'Synthetic ground-station telemetry frames (SNR, Eb/No, Temperature, Packet Loss, Lock State).',
              content: `timestamp,station_id,satellite_id,pass_id,snr_db,eb_no_db,temperature_c,packet_loss_pct,carrier_lock,antenna_state,modem_state,anomaly_label
2026-07-30T03:30:00.000Z,GS-SVALBARD-01,SAT-AURA-9,PASS-2026-0801,14.82,12.31,38.4,0.12,LOCKED,TRACKING,DEMOD_ACTIVE,NOMINAL
2026-07-30T03:30:30.000Z,GS-SVALBARD-01,SAT-AURA-9,PASS-2026-0801,15.10,12.65,39.1,0.05,LOCKED,TRACKING,DEMOD_ACTIVE,NOMINAL
2026-07-30T03:31:00.000Z,GS-GOLDSTONE-02,SAT-SENTINEL-X,PASS-2026-0802,4.20,1.80,41.2,28.40,DEGRADED,TRACKING,DEMOD_ACTIVE,SIGNAL_DEGRADATION
2026-07-30T03:31:30.000Z,GS-HARTEBEEST-03,SAT-HELIOS-3,PASS-2026-0803,0.00,0.00,74.5,100.00,UNLOCKED,TRACKING,FAULT,THERMAL_DRIFT`,
            },
            {
              path: 'groundpulse-datasets/datasets/samples/rf_metrics.csv',
              name: 'rf_metrics.csv',
              type: 'file',
              language: 'csv',
              description: 'RF spectral health metrics (Center frequency, Doppler shift, Bandwidth, Link Quality).',
              content: `timestamp,station_id,center_frequency_hz,bandwidth_hz,frequency_offset_hz,doppler_hz,snr_db,eb_no_db,signal_quality_score,carrier_lock
2026-07-30T03:30:00.000Z,GS-SVALBARD-01,8212000000,5000000,120,4520,14.82,12.31,92,true
2026-07-30T03:30:30.000Z,GS-SVALBARD-01,8212000000,5000000,-45,6180,15.10,12.65,94,true
2026-07-30T03:31:00.000Z,GS-GOLDSTONE-02,8350000000,5000000,2100,-1240,4.20,1.80,31,false`,
            },
            {
              path: 'groundpulse-datasets/datasets/samples/passes.csv',
              name: 'passes.csv',
              type: 'file',
              language: 'csv',
              description: 'Synthetic satellite pass schedule, elevation profiles, and completion status.',
              content: `pass_id,satellite_id,station_id,aos_time,los_time,max_elevation_deg,expected_duration_sec,actual_duration_sec,pass_status,average_snr_db,anomaly_count
PASS-2026-0801,SAT-AURA-9,GS-SVALBARD-01,2026-07-30T03:40:00Z,2026-07-30T03:54:00Z,78.4,840,840,NOMINAL,14.8,0
PASS-2026-0802,SAT-SENTINEL-X,GS-GOLDSTONE-02,2026-07-30T04:05:00Z,2026-07-30T04:18:00Z,42.1,780,780,DEGRADED,9.2,3
PASS-2026-0803,SAT-HELIOS-3,GS-HARTEBEEST-03,2026-07-30T04:30:00Z,2026-07-30T04:55:00Z,81.0,1500,1120,INTERRUPTED,6.4,5`,
            },
            {
              path: 'groundpulse-datasets/datasets/samples/station_events.csv',
              name: 'station_events.csv',
              type: 'file',
              language: 'csv',
              description: 'Operational ground station equipment logs and event triggers.',
              content: `event_id,timestamp,station_id,event_type,component,severity,message,related_pass_id
EVT-001,2026-07-30T03:40:00Z,GS-SVALBARD-01,PASS_START,Antenna Mount SVAL-1,LOW,AOS initialized for SAT-AURA-9 at elevation 5.2°,PASS-2026-0801
EVT-002,2026-07-30T04:06:00Z,GS-GOLDSTONE-02,WEATHER_IMPACT,RF Atmospheric Propagation,MEDIUM,Simulated rain fade induced 7.5 dB attenuation,PASS-2026-0802
EVT-003,2026-07-30T04:37:30Z,GS-HARTEBEEST-03,THERMAL_ALERT,LNA Cooling System,HIGH,LNA temperature exceeded critical threshold 65°C,PASS-2026-0803`,
            },
            {
              path: 'groundpulse-datasets/datasets/samples/incidents.csv',
              name: 'incidents.csv',
              type: 'file',
              language: 'csv',
              description: 'Synthesized research incident records and probable cause reconstructions.',
              content: `incident_id,start_time,end_time,station_id,related_pass_id,incident_type,severity,status,summary,probable_cause,research_recommendation
INC-2026-01,2026-07-30T04:05:00Z,2026-07-30T04:12:00Z,GS-GOLDSTONE-02,PASS-2026-0802,SIGNAL_DEGRADATION,MEDIUM,RECONSTRUCTED,Ka-Band rain fade attenuation during pass,Precipitation along line-of-sight vector,[RESEARCH ONLY] Test dynamic adaptive coding and modulation rules.
INC-2026-02,2026-07-30T04:35:00Z,2026-07-30T04:45:00Z,GS-HARTEBEEST-03,PASS-2026-0803,THERMAL_DRIFT,HIGH,BASELINE_CATALOGED,LNA thermal runaway causing demod lock trip,Cooling pump failure simulation,[RESEARCH ONLY] Train rolling Z-score on thermal gradient velocity.`,
            },
            {
              path: 'groundpulse-datasets/datasets/samples/anomaly_labels.csv',
              name: 'anomaly_labels.csv',
              type: 'file',
              language: 'csv',
              description: 'Ground-truth anomaly annotations for ML model training and evaluation.',
              content: `anomaly_id,timestamp,station_id,pass_id,metric_name,observed_value,expected_min,expected_max,anomaly_type,severity,detection_method,scenario_source
ANOM-101,2026-07-30T04:06:00Z,GS-GOLDSTONE-02,PASS-2026-0802,snr_db,4.20,8.00,25.00,SIGNAL_DEGRADATION,MEDIUM,Baseline Rolling Z-Score,scenarios/signal_degradation.yaml
ANOM-102,2026-07-30T04:37:30Z,GS-HARTEBEEST-03,PASS-2026-0803,temperature_c,68.40,20.00,55.00,THERMAL_DRIFT,HIGH,Rule Threshold (T>55°C),scenarios/thermal_drift.yaml`,
            },
          ],
        },
      ],
    },
    {
      path: 'groundpulse-datasets/schemas',
      name: 'schemas',
      type: 'directory',
      children: [
        {
          path: 'groundpulse-datasets/schemas/telemetry.schema.json',
          name: 'telemetry.schema.json',
          type: 'file',
          language: 'json',
          description: 'JSON Schema definition for telemetry frames.',
          content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GroundPulseTelemetryFrame",
  "type": "object",
  "required": [
    "timestamp",
    "station_id",
    "satellite_id",
    "pass_id",
    "snr_db",
    "eb_no_db",
    "temperature_c",
    "packet_loss_pct",
    "carrier_lock",
    "antenna_state",
    "modem_state",
    "anomaly_label"
  ],
  "properties": {
    "timestamp": { "type": "string", "format": "date-time" },
    "station_id": { "type": "string", "pattern": "^GS-[A-Z0-9-]+$" },
    "satellite_id": { "type": "string", "pattern": "^SAT-[A-Z0-9-]+$" },
    "pass_id": { "type": "string" },
    "snr_db": { "type": "number", "minimum": -10.0, "maximum": 40.0 },
    "eb_no_db": { "type": "number", "minimum": -10.0, "maximum": 35.0 },
    "temperature_c": { "type": "number", "minimum": -40.0, "maximum": 125.0 },
    "packet_loss_pct": { "type": "number", "minimum": 0.0, "maximum": 100.0 },
    "carrier_lock": { "type": "string", "enum": ["LOCKED", "UNLOCKED", "DEGRADED"] },
    "antenna_state": { "type": "string", "enum": ["TRACKING", "STOWED", "SLEWING", "CALIBRATING", "MAINTENANCE"] },
    "modem_state": { "type": "string", "enum": ["DEMOD_ACTIVE", "STANDBY", "LOCK_SEARCH", "FAULT"] },
    "anomaly_label": { "type": "string" }
  }
}`,
        },
        {
          path: 'groundpulse-datasets/schemas/rf_metrics.schema.json',
          name: 'rf_metrics.schema.json',
          type: 'file',
          language: 'json',
          description: 'JSON Schema definition for RF metric spectral frames.',
          content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GroundPulseRFMetricFrame",
  "type": "object",
  "required": [
    "timestamp",
    "station_id",
    "center_frequency_hz",
    "snr_db",
    "eb_no_db",
    "signal_quality_score",
    "carrier_lock"
  ],
  "properties": {
    "timestamp": { "type": "string", "format": "date-time" },
    "station_id": { "type": "string" },
    "center_frequency_hz": { "type": "number" },
    "frequency_offset_hz": { "type": "number" },
    "doppler_hz": { "type": "number" },
    "snr_db": { "type": "number" },
    "signal_quality_score": { "type": "integer", "minimum": 0, "maximum": 100 },
    "carrier_lock": { "type": "boolean" }
  }
}`,
        },
        {
          path: 'groundpulse-datasets/schemas/pass.schema.json',
          name: 'pass.schema.json',
          type: 'file',
          language: 'json',
          description: 'JSON Schema for satellite pass schedules.',
          content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GroundPulseSyntheticPass",
  "type": "object",
  "required": ["pass_id", "satellite_id", "station_id", "aos_time", "los_time", "pass_status"],
  "properties": {
    "pass_id": { "type": "string" },
    "satellite_id": { "type": "string" },
    "station_id": { "type": "string" },
    "aos_time": { "type": "string", "format": "date-time" },
    "los_time": { "type": "string", "format": "date-time" },
    "max_elevation_deg": { "type": "number", "minimum": 0.0, "maximum": 90.0 },
    "pass_status": { "type": "string", "enum": ["NOMINAL", "DEGRADED", "MISSED", "INTERRUPTED", "SIMULATED"] }
  }
}`,
        },
        {
          path: 'groundpulse-datasets/schemas/incident.schema.json',
          name: 'incident.schema.json',
          type: 'file',
          language: 'json',
          description: 'JSON Schema for operational incidents and anomalies.',
          content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GroundPulseIncidentRecord",
  "type": "object",
  "required": ["incident_id", "station_id", "incident_type", "severity", "status", "research_recommendation"],
  "properties": {
    "incident_id": { "type": "string" },
    "station_id": { "type": "string" },
    "incident_type": { "type": "string" },
    "severity": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH"] },
    "status": { "type": "string" },
    "research_recommendation": { "type": "string" }
  }
}`,
        },
      ],
    },
    {
      path: 'groundpulse-datasets/generator',
      name: 'generator',
      type: 'directory',
      children: [
        {
          path: 'groundpulse-datasets/generator/generate_telemetry.py',
          name: 'generate_telemetry.py',
          type: 'file',
          language: 'python',
          description: 'Python CLI tool for generating synthetic ground-station telemetry datasets.',
          content: `import argparse
import json
import math
import random
import datetime
import pandas as pd

def generate_telemetry(seed=42, num_steps=360, output_file="telemetry.csv"):
    """
    Generate synthetic satellite ground-station telemetry using deterministic math curves.
    """
    random.seed(seed)
    start_time = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=4)
    records = []

    for step in range(num_steps):
        t = start_time + datetime.timedelta(seconds=step * 30)
        # Parabolic elevation SNR profile
        progress = (step % 40) / 40.0
        elev_sin = math.sin(progress * math.pi)
        
        snr = 4.0 + elev_sin * 12.0 + random.gauss(0, 0.5)
        ebno = snr - 2.2 + random.gauss(0, 0.3)
        temp_c = 35.0 + elev_sin * 12.0 + random.gauss(0, 0.4)
        pkt_loss = max(0.0, 0.1 + (1.0 - elev_sin) * 3.0 + random.gauss(0, 0.2))
        
        lock_state = "LOCKED" if snr > 8.0 else "DEGRADED"
        anomaly = "NOMINAL"
        
        # Inject scenario window
        if 70 <= step <= 85:
            snr = max(1.5, snr - 7.5)
            pkt_loss += 25.0
            anomaly = "SIGNAL_DEGRADATION"
            lock_state = "DEGRADED"

        records.append({
            "timestamp": t.isoformat(),
            "station_id": "GS-SVALBARD-01",
            "satellite_id": "SAT-AURA-9",
            "pass_id": "PASS-2026-0801",
            "snr_db": round(snr, 2),
            "eb_no_db": round(ebno, 2),
            "temperature_c": round(temp_c, 1),
            "packet_loss_pct": round(pkt_loss, 2),
            "carrier_lock": lock_state,
            "antenna_state": "TRACKING",
            "modem_state": "DEMOD_ACTIVE",
            "anomaly_label": anomaly
        })

    df = pd.DataFrame(records)
    df.to_csv(output_file, index=False)
    print(f"✅ Generated {len(df)} synthetic telemetry frames -> {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GroundPulse AI Telemetry Generator")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    parser.add_argument("--out", type=str, default="telemetry.csv", help="Output path")
    args = parser.parse_args()
    generate_telemetry(seed=args.seed, output_file=args.out)`,
        },
        {
          path: 'groundpulse-datasets/generator/inject_anomalies.py',
          name: 'inject_anomalies.py',
          type: 'file',
          language: 'python',
          description: 'Synthetic anomaly injector applying YAML scenario configurations.',
          content: `import yaml
import pandas as pd
import numpy as np

def apply_thermal_drift_scenario(df, start_idx=130, end_idx=150):
    """Simulate low noise amplifier cooling pump failure thermal drift."""
    df_copy = df.copy()
    for idx in range(start_idx, min(end_idx, len(df_copy))):
        step = idx - start_idx
        df_copy.loc[idx, 'temperature_c'] = 65.0 + step * 0.9
        if df_copy.loc[idx, 'temperature_c'] > 72.0:
            df_copy.loc[idx, 'modem_state'] = 'FAULT'
            df_copy.loc[idx, 'carrier_lock'] = 'UNLOCKED'
            df_copy.loc[idx, 'snr_db'] = 0.0
            df_copy.loc[idx, 'packet_loss_pct'] = 100.0
        df_copy.loc[idx, 'anomaly_label'] = 'THERMAL_DRIFT'
    return df_copy`,
        },
      ],
    },
    {
      path: 'groundpulse-datasets/notebooks',
      name: 'notebooks',
      type: 'directory',
      children: [
        {
          path: 'groundpulse-datasets/notebooks/01_dataset_overview.ipynb',
          name: '01_dataset_overview.ipynb',
          type: 'file',
          language: 'python',
          description: 'Jupyter notebook exploring telemetry distribution, statistical summaries, and schema validation.',
          content: `# Notebook 01: GroundPulse Dataset Overview & Summary Statistics
import pandas as pd
import matplotlib.pyplot as plt

df_tlm = pd.read_csv('../datasets/samples/telemetry.csv')
print("Telemetry Dataset Shape:", df_tlm.shape)
print(df_tlm.describe())

# Plot SNR distribution by station
df_tlm.boxplot(column='snr_db', by='station_id', grid=False)
plt.title('Synthetic SNR (dB) Distribution across Ground Stations')
plt.show()`,
        },
        {
          path: 'groundpulse-datasets/notebooks/03_baseline_anomaly_detection.ipynb',
          name: '03_baseline_anomaly_detection.ipynb',
          type: 'file',
          language: 'python',
          description: 'Jupyter notebook benchmarking static thresholds vs rolling Z-score anomaly detection.',
          content: `# Notebook 03: Baseline Anomaly Detection Benchmarking
import pandas as pd
import numpy as np

def compute_rolling_zscore(series, window=10):
    rolling_mean = series.rolling(window=window, min_periods=1).mean()
    rolling_std = series.rolling(window=window, min_periods=1).std().fillna(1e-5)
    return (series - rolling_mean) / rolling_std

df = pd.read_csv('../datasets/samples/telemetry.csv')
df['snr_zscore'] = compute_rolling_zscore(df['snr_db'])
df['detected_anomaly'] = df['snr_zscore'].abs() > 2.5

print("Detected Anomaly Count:", df['detected_anomaly'].sum())
print("Confusion Matrix vs Ground Truth:")
print(pd.crosstab(df['anomaly_label'] != 'NOMINAL', df['detected_anomaly']))`,
        },
      ],
    },
    {
      path: 'groundpulse-datasets/examples',
      name: 'examples',
      type: 'directory',
      children: [
        {
          path: 'groundpulse-datasets/examples/simple_alert_rules.py',
          name: 'simple_alert_rules.py',
          type: 'file',
          language: 'python',
          description: 'Python script showing simple baseline alert threshold checks.',
          content: `import pandas as pd

def check_groundpulse_alert_rules(frame):
    alerts = []
    if frame['snr_db'] < 8.0 and frame['carrier_lock'] == 'LOCKED':
        alerts.append(("WARN_SNR_LOW", f"SNR {frame['snr_db']} dB below 8 dB lock threshold"))
    if frame['temperature_c'] > 55.0:
        alerts.append(("CRIT_THERMAL_HIGH", f"LNA temperature {frame['temperature_c']}°C exceeds 55°C limit"))
    if frame['packet_loss_pct'] > 15.0:
        alerts.append(("WARN_PACKET_LOSS", f"Packet loss rate elevated at {frame['packet_loss_pct']}%"))
    return alerts`,
        },
      ],
    },
  ],
};
