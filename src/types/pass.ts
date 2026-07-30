export type PassStatus = 'NOMINAL' | 'DEGRADED' | 'MISSED' | 'INTERRUPTED' | 'SIMULATED';

export interface SyntheticPass {
  pass_id: string;
  satellite_id: string;
  station_id: string;
  aos_time: string; // Acquisition of Signal ISO string
  los_time: string; // Loss of Signal ISO string
  max_elevation_deg: number; // e.g. 74.5°
  expected_duration_sec: number;
  actual_duration_sec: number;
  pass_status: PassStatus;
  average_snr_db: number;
  anomaly_count: number;
  signal_quality: string; // 'EXCELLENT' | 'GOOD' | 'DEGRADED' | 'CRITICAL'
}
