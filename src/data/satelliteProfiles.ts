import { SyntheticSatellite } from '../types/telemetry';

export const SYNTHETIC_SATELLITES: SyntheticSatellite[] = [
  {
    id: 'SAT-AURA-9',
    name: 'AURA-9 Earth Obs (Simulated)',
    norad_id: 99401,
    orbit_type: 'LEO',
    altitude_km: 705,
    inclination_deg: 98.2,
    transmitter_freq_ghz: 8.212,
  },
  {
    id: 'SAT-SENTINEL-X',
    name: 'SENTINEL-X Synthetic Radar',
    norad_id: 99402,
    orbit_type: 'LEO',
    altitude_km: 693,
    inclination_deg: 98.68,
    transmitter_freq_ghz: 8.350,
  },
  {
    id: 'SAT-HELIOS-3',
    name: 'HELIOS-3 Solar Telemetry',
    norad_id: 99403,
    orbit_type: 'MEO',
    altitude_km: 20200,
    inclination_deg: 55.0,
    transmitter_freq_ghz: 2.245,
  },
  {
    id: 'SAT-ASTRAL-GEO',
    name: 'ASTRAL-1 Comms Relay',
    norad_id: 99404,
    orbit_type: 'GEO',
    altitude_km: 35786,
    inclination_deg: 0.05,
    transmitter_freq_ghz: 26.500,
  },
];
