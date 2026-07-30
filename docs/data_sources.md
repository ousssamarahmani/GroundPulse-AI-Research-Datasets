# External data source policy

No source data has been collected for the current release.

| Source | Intended research use | Status | Required controls |
|---|---|---|---|
| SatNOGS API | Satellite, transmitter, and observation metadata | Adapter prepared; not run | Endpoint, query time, terms, attribution, checksum |
| CelesTrak | Orbital GP / OMM research | Adapter prepared; not run | Element epoch, retrieval time, rate limit, staleness, terms |
| NOAA SWPC | Space-weather context | Adapter prepared; not run | Product ID, units, quality flags, timestamps, notices |
| Synthetic telemetry | Externally supplied simulation | Import-only; none supplied | Generator, version, seed/methodology, `synthetic: true` |
| Ground-station logs | Equipment and event correlation | Import-only; none supplied | Authorization, classification, redaction, retention, secret review |

Every accepted source must emit a provenance record containing source identity, retrieval/import time, applicable terms, checksum, adapter version, raw/processed state, transformation history, and synthetic status.

Public and supplied data must never be silently blended with generated ground truth. Raw inputs remain immutable; processed outputs live separately; missing fields are not invented.
