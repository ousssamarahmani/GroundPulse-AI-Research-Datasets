export interface RFMetricFrame {
  timestamp: string;
  station_id: string;
  center_frequency_hz: number;
  bandwidth_hz: number;
  frequency_offset_hz: number;
  doppler_hz: number;
  snr_db: number;
  eb_no_db: number;
  signal_quality_score: number; // 0 - 100
  carrier_lock: boolean;
  link_degradation_score: number; // 0 - 100
}
