import { TelemetryFrame, CarrierLockState, AntennaState, ModemState } from '../types/telemetry';
import { RFMetricFrame } from '../types/rf';
import { SyntheticPass } from '../types/pass';
import { StationEvent, IncidentRecord, AnomalyLabelRecord } from '../types/incident';
import { SYNTHETIC_STATIONS } from './stationProfiles';
import { SYNTHETIC_SATELLITES } from './satelliteProfiles';
import { SeededRandom } from '../utils/seed';

export interface GeneratedDataset {
  telemetry: TelemetryFrame[];
  rfMetrics: RFMetricFrame[];
  passes: SyntheticPass[];
  events: StationEvent[];
  incidents: IncidentRecord[];
  anomalyLabels: AnomalyLabelRecord[];
  generationSeed: number;
  generatedAt: string;
}

export function generateSyntheticDataset(seedValue: number = 42): GeneratedDataset {
  const rng = new SeededRandom(seedValue);
  const now = Date.now();
  const baseTime = now - 3600 * 4 * 1000; // 4 hours ago

  const passes: SyntheticPass[] = [
    {
      pass_id: 'PASS-2026-0801',
      satellite_id: 'SAT-AURA-9',
      station_id: 'GS-SVALBARD-01',
      aos_time: new Date(baseTime + 10 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 24 * 60 * 1000).toISOString(),
      max_elevation_deg: 78.4,
      expected_duration_sec: 840,
      actual_duration_sec: 840,
      pass_status: 'NOMINAL',
      average_snr_db: 14.8,
      anomaly_count: 0,
      signal_quality: 'EXCELLENT',
    },
    {
      pass_id: 'PASS-2026-0802',
      satellite_id: 'SAT-SENTINEL-X',
      station_id: 'GS-GOLDSTONE-02',
      aos_time: new Date(baseTime + 35 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 48 * 60 * 1000).toISOString(),
      max_elevation_deg: 42.1,
      expected_duration_sec: 780,
      actual_duration_sec: 780,
      pass_status: 'DEGRADED',
      average_snr_db: 9.2,
      anomaly_count: 3,
      signal_quality: 'DEGRADED',
    },
    {
      pass_id: 'PASS-2026-0803',
      satellite_id: 'SAT-HELIOS-3',
      station_id: 'GS-HARTEBEEST-03',
      aos_time: new Date(baseTime + 60 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 85 * 60 * 1000).toISOString(),
      max_elevation_deg: 81.0,
      expected_duration_sec: 1500,
      actual_duration_sec: 1120,
      pass_status: 'INTERRUPTED',
      average_snr_db: 6.4,
      anomaly_count: 5,
      signal_quality: 'CRITICAL',
    },
    {
      pass_id: 'PASS-2026-0804',
      satellite_id: 'SAT-ASTRAL-GEO',
      station_id: 'GS-CANBERRA-04',
      aos_time: new Date(baseTime + 90 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 120 * 60 * 1000).toISOString(),
      max_elevation_deg: 65.2,
      expected_duration_sec: 1800,
      actual_duration_sec: 1800,
      pass_status: 'NOMINAL',
      average_snr_db: 16.1,
      anomaly_count: 0,
      signal_quality: 'EXCELLENT',
    },
    {
      pass_id: 'PASS-2026-0805',
      satellite_id: 'SAT-AURA-9',
      station_id: 'GS-GOLDSTONE-02',
      aos_time: new Date(baseTime + 130 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 144 * 60 * 1000).toISOString(),
      max_elevation_deg: 54.8,
      expected_duration_sec: 840,
      actual_duration_sec: 840,
      pass_status: 'NOMINAL',
      average_snr_db: 15.2,
      anomaly_count: 1,
      signal_quality: 'GOOD',
    },
    {
      pass_id: 'PASS-2026-0806',
      satellite_id: 'SAT-SENTINEL-X',
      station_id: 'GS-SVALBARD-01',
      aos_time: new Date(baseTime + 150 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 165 * 60 * 1000).toISOString(),
      max_elevation_deg: 89.1,
      expected_duration_sec: 900,
      actual_duration_sec: 900,
      pass_status: 'SIMULATED',
      average_snr_db: 17.4,
      anomaly_count: 0,
      signal_quality: 'EXCELLENT',
    },
    {
      pass_id: 'PASS-2026-0807',
      satellite_id: 'SAT-HELIOS-3',
      station_id: 'GS-CANBERRA-04',
      aos_time: new Date(baseTime + 175 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 195 * 60 * 1000).toISOString(),
      max_elevation_deg: 34.0,
      expected_duration_sec: 1200,
      actual_duration_sec: 1200,
      pass_status: 'NOMINAL',
      average_snr_db: 13.5,
      anomaly_count: 0,
      signal_quality: 'GOOD',
    },
    {
      pass_id: 'PASS-2026-0808',
      satellite_id: 'SAT-ASTRAL-GEO',
      station_id: 'GS-HARTEBEEST-03',
      aos_time: new Date(baseTime + 210 * 60 * 1000).toISOString(),
      los_time: new Date(baseTime + 235 * 60 * 1000).toISOString(),
      max_elevation_deg: 48.6,
      expected_duration_sec: 1500,
      actual_duration_sec: 0,
      pass_status: 'MISSED',
      average_snr_db: 0.0,
      anomaly_count: 2,
      signal_quality: 'CRITICAL',
    },
  ];

  const telemetry: TelemetryFrame[] = [];
  const rfMetrics: RFMetricFrame[] = [];
  const anomalyLabels: AnomalyLabelRecord[] = [];
  const events: StationEvent[] = [];

  const totalPoints = 360; // 360 time steps, 30 sec step = 3 hours
  const stepMs = 30 * 1000;

  for (let i = 0; i < totalPoints; i++) {
    const frameMs = baseTime + i * stepMs;
    const isoTime = new Date(frameMs).toISOString();

    // Determine active pass if any
    const activePass = passes.find(p => {
      const aos = new Date(p.aos_time).getTime();
      const los = new Date(p.los_time).getTime();
      return frameMs >= aos && frameMs <= los;
    });

    const station = activePass
      ? SYNTHETIC_STATIONS.find(s => s.id === activePass.station_id)!
      : SYNTHETIC_STATIONS[i % SYNTHETIC_STATIONS.length];

    const satellite = activePass
      ? SYNTHETIC_SATELLITES.find(sat => sat.id === activePass.satellite_id)!
      : SYNTHETIC_SATELLITES[i % SYNTHETIC_SATELLITES.length];

    // Compute nominal pass profile: elevation curve creates parabolic SNR rise and fall
    let baseSNR = 2.0;
    let baseEbNo = 1.0;
    let carrierLock: CarrierLockState = 'UNLOCKED';
    let antennaState: AntennaState = 'STOWED';
    let modemState: ModemState = 'STANDBY';
    let packetLoss = 95.0; // High default packet loss when no lock
    let tempC = 24.5 + rng.range(-0.5, 0.5);

    if (activePass && activePass.pass_status !== 'MISSED') {
      const aos = new Date(activePass.aos_time).getTime();
      const los = new Date(activePass.los_time).getTime();
      const progress = (frameMs - aos) / (los - aos); // 0.0 to 1.0
      const elevSin = Math.sin(progress * Math.PI); // Parabolic 0 -> 1 -> 0
      
      baseSNR = 6.0 + elevSin * (activePass.average_snr_db - 4.0) + rng.gaussian(0, 0.4);
      baseEbNo = baseSNR - 2.5 + rng.gaussian(0, 0.3);
      tempC = 38.0 + elevSin * 14.0 + rng.gaussian(0, 0.6); // Heating during active RF track
      packetLoss = Math.max(0, 0.2 + (1 - elevSin) * 2.5 + rng.gaussian(0, 0.2));
      carrierLock = baseSNR > 8.0 ? 'LOCKED' : 'DEGRADED';
      antennaState = 'TRACKING';
      modemState = 'DEMOD_ACTIVE';
    } else {
      antennaState = i % 50 < 10 ? 'SLEWING' : 'STOWED';
      modemState = 'STANDBY';
    }

    let isAnomaly = false;
    let anomalyType = 'NOMINAL';
    let anomalySeverity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

    // Inject synthetic anomaly scenarios based on index windows
    // Scenario 1: RF Signal Degradation (Rain Fade simulation) around frame 70-85 (PASS-2026-0802)
    if (i >= 70 && i <= 85) {
      isAnomaly = true;
      anomalyType = 'SIGNAL_DEGRADATION';
      anomalySeverity = 'MEDIUM';
      baseSNR = Math.max(1.5, baseSNR - 7.5);
      baseEbNo = Math.max(0.5, baseEbNo - 6.0);
      packetLoss = Math.min(100, packetLoss + 24.0);
      carrierLock = 'DEGRADED';
    }

    // Scenario 2: Thermal Drift (Sub-system overheating) around frame 130-150 (GS-HARTEBEEST-03)
    if (i >= 130 && i <= 150) {
      isAnomaly = true;
      anomalyType = 'THERMAL_DRIFT';
      anomalySeverity = 'HIGH';
      tempC = 64.5 + (i - 130) * 0.8; // Thermal runaway up to 80°C
      if (tempC > 72.0) {
        modemState = 'FAULT';
        carrierLock = 'UNLOCKED';
        baseSNR = 0;
        packetLoss = 100.0;
      }
    }

    // Scenario 3: Modem Dropout / Sudden Lock Loss around frame 220-228
    if (i >= 220 && i <= 228) {
      isAnomaly = true;
      anomalyType = 'MODEM_DROPOUT';
      anomalySeverity = 'HIGH';
      modemState = 'FAULT';
      carrierLock = 'UNLOCKED';
      packetLoss = 88.5;
      baseSNR = 1.2;
    }

    // Scenario 4: Antenna Movement Fault / Slewing Drift around frame 290-298
    if (i >= 290 && i <= 298) {
      isAnomaly = true;
      anomalyType = 'ANTENNA_FAULT';
      anomalySeverity = 'MEDIUM';
      antennaState = 'CALIBRATING';
      baseSNR = Math.max(2.0, baseSNR - 5.0);
      packetLoss = 18.0;
    }

    const telemetryFrame: TelemetryFrame = {
      id: `TLM-${i + 1000}`,
      timestamp: isoTime,
      timestampMs: frameMs,
      station_id: station.id,
      satellite_id: satellite.id,
      pass_id: activePass ? activePass.pass_id : 'NO_PASS',
      snr_db: Number(baseSNR.toFixed(2)),
      eb_no_db: Number(baseEbNo.toFixed(2)),
      temperature_c: Number(tempC.toFixed(1)),
      packet_loss_pct: Number(packetLoss.toFixed(2)),
      carrier_lock: carrierLock,
      antenna_state: antennaState,
      modem_state: modemState,
      anomaly_label: anomalyType,
      is_anomaly: isAnomaly,
      anomaly_severity: isAnomaly ? anomalySeverity : undefined,
    };

    telemetry.push(telemetryFrame);

    // Corresponding RF Metric
    const centerFreq = satellite.transmitter_freq_ghz * 1e9;
    const freqOffset = isAnomaly ? rng.range(-4500, 4500) : rng.range(-200, 200);
    const doppler = activePass ? Math.sin((i % 40) / 40 * Math.PI) * 12500 : 0;
    const sigQuality = Math.max(0, Math.min(100, Math.round((baseSNR / 18.0) * 100 - packetLoss * 0.4)));

    rfMetrics.push({
      timestamp: isoTime,
      station_id: station.id,
      center_frequency_hz: centerFreq,
      bandwidth_hz: 5000000, // 5 MHz
      frequency_offset_hz: Math.round(freqOffset),
      doppler_hz: Math.round(doppler),
      snr_db: Number(baseSNR.toFixed(2)),
      eb_no_db: Number(baseEbNo.toFixed(2)),
      signal_quality_score: sigQuality,
      carrier_lock: carrierLock === 'LOCKED',
      link_degradation_score: Math.max(0, 100 - sigQuality),
    });

    // Anomaly labels logging
    if (isAnomaly && i % 4 === 0) {
      anomalyLabels.push({
        anomaly_id: `ANOM-${anomalyLabels.length + 101}`,
        timestamp: isoTime,
        station_id: station.id,
        pass_id: activePass ? activePass.pass_id : 'N/A',
        metric_name: anomalyType === 'THERMAL_DRIFT' ? 'temperature_c' : anomalyType === 'SIGNAL_DEGRADATION' ? 'snr_db' : 'carrier_lock',
        observed_value: anomalyType === 'THERMAL_DRIFT' ? Number(tempC.toFixed(1)) : Number(baseSNR.toFixed(2)),
        expected_min: anomalyType === 'THERMAL_DRIFT' ? 20.0 : 8.0,
        expected_max: anomalyType === 'THERMAL_DRIFT' ? 55.0 : 25.0,
        anomaly_type: anomalyType,
        severity: anomalySeverity,
        detection_method: 'Baseline Rolling Z-Score (k=2.5) & Rule Threshold',
        scenario_source: `Synthetic Injection Module: ${anomalyType.toLowerCase()}.yaml`,
        explanation: anomalyType === 'THERMAL_DRIFT' 
          ? 'Thermal rise detected above 55°C envelope. Modem heat dissipation degraded.'
          : anomalyType === 'SIGNAL_DEGRADATION'
          ? 'SNR dropped > 7.5 dB below clear-sky baseline. Atmospheric rain-fade attenuation simulated.'
          : 'Demodulator lost phase lock unexpectedly during active elevation track.',
      });
    }

    // Generate station events at key points
    if (i === 10) {
      events.push({
        event_id: 'EVT-001',
        timestamp: isoTime,
        station_id: 'GS-SVALBARD-01',
        event_type: 'PASS_START',
        component: 'Antenna Mount SVAL-1',
        severity: 'LOW',
        message: 'AOS initialized for SAT-AURA-9 at elevation 5.2°',
        related_pass_id: 'PASS-2026-0801',
      });
    } else if (i === 72) {
      events.push({
        event_id: 'EVT-002',
        timestamp: isoTime,
        station_id: 'GS-GOLDSTONE-02',
        event_type: 'WEATHER_IMPACT',
        component: 'RF Atmospheric Propagation',
        severity: 'MEDIUM',
        message: 'Simulated atmospheric rain fade event induced 7.5 dB attenuation',
        related_pass_id: 'PASS-2026-0802',
      });
    } else if (i === 135) {
      events.push({
        event_id: 'EVT-003',
        timestamp: isoTime,
        station_id: 'GS-HARTEBEEST-03',
        event_type: 'THERMAL_ALERT',
        component: 'LNA Cooling System',
        severity: 'HIGH',
        message: 'Low Noise Amplifier temperature exceeded critical threshold 65°C',
        related_pass_id: 'PASS-2026-0803',
      });
    } else if (i === 221) {
      events.push({
        event_id: 'EVT-004',
        timestamp: isoTime,
        station_id: 'GS-CANBERRA-04',
        event_type: 'LOCK_LOST',
        component: 'Digital Demodulator Unit-2',
        severity: 'HIGH',
        message: 'Carrier lock lost abruptly. Packet loss spiked to 88.5%',
      });
    } else if (i === 292) {
      events.push({
        event_id: 'EVT-005',
        timestamp: isoTime,
        station_id: 'GS-GOLDSTONE-02',
        event_type: 'ANTENNA_MOVEMENT',
        component: 'Azimuth Drive Servo',
        severity: 'MEDIUM',
        message: 'Servo encoder reported +0.45° angular tracking error',
      });
    }
  }

  // Synthesize Incidents
  const incidents: IncidentRecord[] = [
    {
      incident_id: 'INC-2026-01',
      start_time: telemetry[70].timestamp,
      end_time: telemetry[85].timestamp,
      station_id: 'GS-GOLDSTONE-02',
      related_pass_id: 'PASS-2026-0802',
      incident_type: 'SIGNAL_DEGRADATION',
      severity: 'MEDIUM',
      status: 'RECONSTRUCTED',
      summary: 'Ka-Band rain fade attenuation event causing 7.5 dB SNR drop during SAT-SENTINEL-X pass',
      probable_cause: 'Simulated atmospheric precipitation along line-of-sight vector',
      research_recommendation: '[RESEARCH ONLY] Evaluate dynamic adaptive coding and modulation (ACM) rule triggers to mitigate 6 dB margin loss.',
    },
    {
      incident_id: 'INC-2026-02',
      start_time: telemetry[130].timestamp,
      end_time: telemetry[150].timestamp,
      station_id: 'GS-HARTEBEEST-03',
      related_pass_id: 'PASS-2026-0803',
      incident_type: 'THERMAL_DRIFT',
      severity: 'HIGH',
      status: 'BASELINE_CATALOGED',
      summary: 'LNA thermal runaway resulting in demodulator lock trip and complete pass interruption',
      probable_cause: 'Synthetic cooling pump failure simulation during peak elevation RF power transmission',
      research_recommendation: '[RESEARCH ONLY] Train multivariate LSTM or Isolation Forest on thermal gradient velocity to predict trip 6 minutes prior.',
    },
    {
      incident_id: 'INC-2026-03',
      start_time: telemetry[220].timestamp,
      end_time: telemetry[228].timestamp,
      station_id: 'GS-CANBERRA-04',
      related_pass_id: 'PASS-2026-0807',
      incident_type: 'MODEM_DROPOUT',
      severity: 'HIGH',
      status: 'RESEARCH_INVESTIGATING',
      summary: 'Sudden demodulator frame unlock accompanied by 88.5% packet loss burst',
      probable_cause: 'Synthetic clock recovery phase lock loop (PLL) slip scenario',
      research_recommendation: '[RESEARCH ONLY] Test automatic gain control (AGC) loop bandwidth adjustment for high-doppler LEO passes.',
    },
  ];

  return {
    telemetry,
    rfMetrics,
    passes,
    events,
    incidents,
    anomalyLabels,
    generationSeed: seedValue,
    generatedAt: new Date(now).toISOString(),
  };
}
