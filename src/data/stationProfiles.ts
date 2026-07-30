import { SyntheticStation } from '../types/telemetry';

export const SYNTHETIC_STATIONS: SyntheticStation[] = [
  {
    id: 'GS-SVALBARD-01',
    name: 'Svalbard High-Latitude Station 1',
    location: 'Longyearbyen, Spitsbergen, Svalbard (78.23° N, 15.39° E)',
    coordinates: { lat: 78.23, lon: 15.39, alt_m: 450 },
    dish_diameter_m: 13.0,
    band: 'X-Band (8.0 - 8.4 GHz)',
    status: 'ONLINE',
  },
  {
    id: 'GS-GOLDSTONE-02',
    name: 'Goldstone RF Segment Alpha',
    location: 'Mojave Desert, California, USA (35.42° N, -116.89° W)',
    coordinates: { lat: 35.42, lon: -116.89, alt_m: 1020 },
    dish_diameter_m: 34.0,
    band: 'Ka-Band (25.5 - 27.0 GHz)',
    status: 'ONLINE',
  },
  {
    id: 'GS-HARTEBEEST-03',
    name: 'Hartebeesthoek Sub-Equatorial',
    location: 'Gauteng, South Africa (-25.88° S, 27.70° E)',
    coordinates: { lat: -25.88, lon: 27.70, alt_m: 1415 },
    dish_diameter_m: 12.0,
    band: 'S-Band / X-Band Dual',
    status: 'SIMULATED_DEGRADED',
  },
  {
    id: 'GS-CANBERRA-04',
    name: 'Canberra Deep Segment 3',
    location: 'Tidbinbilla, ACT, Australia (-35.40° S, 148.98° E)',
    coordinates: { lat: -35.40, lon: 148.98, alt_m: 650 },
    dish_diameter_m: 26.0,
    band: 'X-Band (8.4 GHz)',
    status: 'STANDBY',
  },
];
