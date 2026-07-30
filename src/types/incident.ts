export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface StationEvent {
  event_id: string;
  timestamp: string;
  station_id: string;
  event_type: 'ANTENNA_MOVEMENT' | 'MODEM_REBOOT' | 'LOCK_ACQUIRED' | 'LOCK_LOST' | 'WEATHER_IMPACT' | 'CALIBRATION' | 'THERMAL_ALERT' | 'NETWORK_INTERRUPTION' | 'PASS_START' | 'PASS_END' | 'INCIDENT_CREATED';
  component: string;
  severity: SeverityLevel;
  message: string;
  related_pass_id?: string;
}

export interface IncidentRecord {
  incident_id: string;
  start_time: string;
  end_time: string;
  station_id: string;
  related_pass_id: string;
  incident_type: 'SIGNAL_DEGRADATION' | 'ANTENNA_FAULT' | 'MODEM_DROPOUT' | 'THERMAL_DRIFT' | 'PACKET_LOSS_BURST';
  severity: SeverityLevel;
  status: 'RESEARCH_INVESTIGATING' | 'RECONSTRUCTED' | 'BASELINE_CATALOGED' | 'CLOSED';
  summary: string;
  probable_cause: string;
  research_recommendation: string; // Clearly labeled as research guidance
}

export interface AnomalyLabelRecord {
  anomaly_id: string;
  timestamp: string;
  station_id: string;
  pass_id: string;
  metric_name: string;
  observed_value: number;
  expected_min: number;
  expected_max: number;
  anomaly_type: string;
  severity: SeverityLevel;
  detection_method: string;
  scenario_source: string;
  explanation: string;
}
