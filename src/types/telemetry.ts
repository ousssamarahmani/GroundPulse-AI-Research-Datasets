export type AntennaState = 'TRACKING' | 'STOWED' | 'SLEWING' | 'CALIBRATING' | 'MAINTENANCE';
export type ModemState = 'DEMOD_ACTIVE' | 'STANDBY' | 'LOCK_SEARCH' | 'FAULT';
export type CarrierLockState = 'LOCKED' | 'UNLOCKED' | 'DEGRADED';

export interface TelemetryFrame {
  id: string;
  timestamp: string; // ISO string
  timestampMs: number;
  station_id: string;
  satellite_id: string;
  pass_id: string;
  snr_db: number;
  eb_no_db: number;
  temperature_c: number;
  packet_loss_pct: number;
  carrier_lock: CarrierLockState;
  antenna_state: AntennaState;
  modem_state: ModemState;
  anomaly_label: string; // 'NOMINAL' or anomaly scenario type
  is_anomaly: boolean;
  anomaly_severity?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SyntheticStation {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lon: number; alt_m: number };
  dish_diameter_m: number;
  band: string; // 'X-Band' | 'S-Band' | 'Ka-Band'
  status: 'ONLINE' | 'STANDBY' | 'CALIBRATING' | 'SIMULATED_DEGRADED';
}

export interface SyntheticSatellite {
  id: string;
  name: string;
  norad_id: number;
  orbit_type: 'LEO' | 'MEO' | 'GEO';
  altitude_km: number;
  inclination_deg: number;
  transmitter_freq_ghz: number;
}
