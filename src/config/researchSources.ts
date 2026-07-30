export type SourceStatus = 'Adapter prepared' | 'Import prepared' | 'Blocked pending source';

export interface ResearchSource {
  name: string;
  category: string;
  role: string;
  status: SourceStatus;
  boundary: string;
}

export const RESEARCH_SOURCES: ResearchSource[] = [
  {
    name: 'SatNOGS API',
    category: 'Public source',
    role: 'Satellite, transmitter, and observation metadata',
    status: 'Adapter prepared',
    boundary: 'No snapshot collected. Attribution and source terms must be recorded at retrieval.',
  },
  {
    name: 'CelesTrak',
    category: 'Public source',
    role: 'Orbital GP / OMM records',
    status: 'Adapter prepared',
    boundary: 'No snapshot collected. Epoch and staleness must be preserved.',
  },
  {
    name: 'NOAA SWPC',
    category: 'Public source',
    role: 'Space-weather context',
    status: 'Adapter prepared',
    boundary: 'No snapshot collected. Product units and quality flags must remain source-defined.',
  },
  {
    name: 'Synthetic telemetry',
    category: 'External research input',
    role: 'Documented simulation output',
    status: 'Import prepared',
    boundary: 'This repository does not generate synthetic telemetry. Methodology is required on import.',
  },
  {
    name: 'Ground-station logs',
    category: 'Authorized input',
    role: 'Equipment and event records',
    status: 'Blocked pending source',
    boundary: 'No logs included. Authorization, classification, redaction, and secret review are required.',
  },
];
