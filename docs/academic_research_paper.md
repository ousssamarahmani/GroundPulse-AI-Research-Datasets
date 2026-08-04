# GroundPulse AI: A Provenance-First Research Foundation for Satellite Ground-Segment Datasets

**Author:** Oussama Rahamni
**Affiliation:** Independent Researcher, GroundPulse AI Research Project
**Version:** 0.1 — research design paper
**Date:** 5 August 2026

## Abstract

Satellite ground-segment research depends on heterogeneous information produced by orbital catalogs, community observation networks, space-weather services, equipment logs, and controlled simulations. These sources differ in semantics, time bases, licensing, quality controls, and operational sensitivity. Combining them without explicit lineage can create apparently complete datasets whose fields cannot be traced to observations or deterministic transformations. GroundPulse AI is proposed as an open research foundation for constructing ground-segment datasets under a provenance-first workflow. The project separates immutable raw snapshots, documented processed data, and reviewed public samples; requires source manifests and checksums; and treats schemas as proposed contracts rather than evidence that measurements exist. Intended inputs include SatNOGS satellite and transmitter metadata, CelesTrak general perturbations data, NOAA space-weather products, externally supplied synthetic telemetry, and authorized ground-station logs. This paper defines the research problem, architecture, governance model, schema strategy, release methodology, and evaluation plan. It deliberately reports no empirical performance results because no dataset has yet been collected or released. The contribution is a transparent, testable protocol for future dataset construction and baseline anomaly-analysis experiments, with a strict boundary between public research artifacts and any future proprietary operational platform.

**Keywords:** satellite ground segment; research datasets; data provenance; reproducibility; RF telemetry; anomaly detection; FAIR data; space weather

## 1. Introduction

Ground stations connect spacecraft operations to terrestrial infrastructure through antennas, radios, modems, tracking systems, environmental sensors, scheduling services, and operator workflows. Research across these systems often requires information from several independent domains. Orbital elements can describe an expected trajectory; network observations can describe when and where a transmission was received; space-weather products can provide environmental context; and equipment logs can describe local station state. These sources are related, but they are not interchangeable.

A recurring methodological risk is to treat contextual metadata as evidence that engineering measurements exist. Satellite identifiers and orbital elements do not imply a measured signal-to-noise ratio, Eb/N0, modem temperature, packet-loss rate, pass outcome, incident cause, or anomaly label. Silently filling these gaps may produce attractive visualizations while undermining reproducibility and scientific validity.

GroundPulse AI addresses this problem as a research-data foundation rather than an operational mission product. Every published field must be traceable either to an authorized source field or to a documented deterministic calculation. The repository currently contains proposed schemas, import boundaries, governance documentation, and a public research interface, but no committed data records.

## 2. Research Problem and Motivation

### 2.1 Heterogeneous source semantics

SatNOGS DB exposes satellite and transmitter information through a REST API and distributes API data under CC BY-SA terms [2]. CelesTrak provides general perturbations data and supports TLE and CCSDS Orbit Mean-Elements Message representations, including XML, KVN, JSON, and CSV [3]. NOAA's Space Weather Prediction Center produces forecasts, reports, summaries, alerts, models, and real-time data, while NCEI archives selected products [5]. None of these sources alone provides a complete ground-station health record.

### 2.2 Reproducibility and lineage

The FAIR principles state that research objects should be findable, accessible, interoperable, and reusable for people and machines [1]. Ground-segment reuse also depends on source URL, retrieval time, original timestamp, version, license, checksum, transformation history, and whether a record is observed or synthetic.

### 2.3 Operational sensitivity

Ground-station logs may contain infrastructure identifiers, topology, credentials, operator information, or mission-sensitive events. Private logs require authorization, classification, redaction, retention, and secret-scanning decisions before processing. Governance is therefore part of the architecture.

## 3. Objectives and Research Questions

The objectives are to:

1. define a source-backed method for constructing ground-segment research datasets;
2. preserve machine-verifiable provenance through collection, transformation, and release;
3. support reproducible baselines without presenting synthetic or inferred values as observations; and
4. separate open research artifacts from future operational systems.

The initial research questions are:

- **RQ1:** What minimum provenance record is required to reproduce a release?
- **RQ2:** How can orbital, observation, environmental, and equipment sources be aligned without inventing unavailable measurements?
- **RQ3:** Which transparent baselines are meaningful once approved labeled data exists?
- **RQ4:** How should synthetic telemetry be identified and evaluated so it cannot be confused with operational observations?

## 4. Proposed Architecture

### 4.1 Source layer

Candidate inputs are SatNOGS APIs, CelesTrak GP/OMM data, NOAA SWPC products, externally generated synthetic telemetry, and authorized ground-station logs. An adapter does not make a source active.

### 4.2 Authorization and provenance gate

Before collection or import, maintainers approve purpose, scope, terms, attribution, cadence, retention, and ownership. Each accepted object receives a provenance sidecar containing:

- source identity and canonical URL;
- retrieval/import time and source timestamp when available;
- applicable license or terms;
- cryptographic checksum;
- adapter and schema versions;
- raw or processed state;
- transformation history; and
- synthetic status and generator metadata where applicable.

### 4.3 Repository layers

- datasets/raw stores immutable source snapshots.
- datasets/processed stores documented deterministic transformations.
- datasets/samples stores reviewed, versioned public subsets.

This prevents transformed data from overwriting source evidence and supports independent lineage verification.

### 4.4 Research layer

JSON Schemas, validation tools, documentation, notebooks, and the public website operate on reviewed artifacts. The interface must render manifests rather than hard-coded measurements. Notebook specifications may precede a release, but they must not report results before approved data exists.

## 5. Governance Model

Governance precedes collection. SatNOGS use requires endpoint records and attribution. CelesTrak queries must comply with documented query and usage guidance; current guidance asks users to retrieve only needed data and respect the update cadence [4]. NOAA inputs require product identifiers, units, quality flags, timestamps, and archival notices.

Synthetic telemetry is acceptable only when the external generator, version, configuration, seed or method, assumptions, and limitations are documented. Every record must carry an explicit synthetic marker. Ground-station logs require data-owner authorization plus classification, redaction, retention, and secret review.

## 6. Schema Strategy

The repository defines draft JSON Schemas for telemetry, RF metrics, passes, and incidents using JSON Schema Draft 2020-12 [6]. They are proposed contracts for controlled research inputs, not evidence that corresponding fields are available from public sources or operational stations.

Schemas for synthetic benchmark scenarios may require SNR, Eb/N0, equipment state, or anomaly labels because the external generator must supply them. Public-source adapters must not manufacture those fields. Future releases should use source-specific schemas or explicitly nullable normalized fields with coverage reports and missing-data semantics.

## 7. Dataset Construction Methodology

The workflow is sequential and fail-closed.

### Phase A: source approval

Record purpose, scope, owner, terms, attribution, retention, and cadence. No collection occurs before approval.

### Phase B: offline adapter testing

Use small fixtures labeled as tests rather than datasets. Test timeouts, retries, rate limits, content types, empty and malformed responses, challenge pages, timestamps, checksums, and provenance. Adapters must not save HTML errors as scientific data.

### Phase C: first approved collection

Run one approved query, preserve the response unchanged, calculate its checksum, and store a provenance sidecar. Review coverage before normalization.

### Phase D: deterministic processing

Map every output field to a source field or documented calculation. Record units, identifiers, time-alignment tolerances, missingness, and rejected records. Do not silently impute engineering measurements.

### Phase E: reviewed release

Validate schema and lineage, publish a limited versioned sample, and include checksum, data dictionary, license notes, validation report, limitations, and changelog. Only then execute research notebooks.

## 8. Planned Baseline Analysis

Baseline anomaly detection is future work and depends on approved data and reliable labels. Initial evaluation should prioritize interpretable methods:

- justified engineering thresholds;
- rolling median and median absolute deviation;
- moving z-score envelopes with documented windows;
- change-point detection for state transitions; and
- simple supervised baselines only where labels and leakage controls are adequate.

Evaluation should separate training, calibration, and test intervals; preserve station and pass boundaries; and report precision, recall, false-alarm rate, detection delay, and uncertainty. Generator-injected anomalies must not be treated as equivalent to operational incidents.

## 9. Reproducibility and Release Artifacts

Each version should include a manifest, checksums, schemas, data dictionary, adapter version, transformation configuration, environment lock file, validation report, limitations, and citation metadata. Notebooks should run from a clean environment against a pinned release and expose the exact input manifest.

## 10. Security and Ethical Considerations

Log ingestion should reject secrets, support redaction, and retain authorization evidence. Public reports should avoid station vulnerabilities or mission-sensitive timelines. Synthetic data must be conspicuously labeled. Analytical outputs are research aids and cannot replace qualified operators or mission-assurance procedures.

## 11. Current Project Status

As of 5 August 2026:

- repository layers and empty-state documentation are present;
- four proposed JSON Schemas are present;
- public-source and controlled-import scaffolds are present;
- the public website and architecture documentation are present;
- no source adapter has been run for a published release; and
- no dataset record, trained detector, benchmark result, AWS integration, or operational validation is claimed.

This paper therefore presents a protocol and architecture, not experimental findings.

## 12. Limitations and Threats to Validity

The sources may not share stable identifiers or compatible temporal resolution. Orbital elements, network metadata, space weather, and station logs can only be joined after explicit identifier and time-alignment analysis. Sources may change formats, terms, availability, or cadence. Synthetic data may simplify failure modes and may not reproduce hardware, propagation, interference, or operator behavior. Schemas may require revision after profiling. With no approved dataset, feasibility, coverage, and analytical utility remain untested.

## 13. Future Work

Immediate work includes governance decisions, offline adapter tests, and the first approved immutable snapshot. Later work includes coverage profiling, schema revision, deterministic normalization, a reviewed release, reproducible notebooks, and transparent anomaly baselines. Authentication should be considered only for genuine private workflows. Operational integrations, autonomous commands, agent orchestration, predictive maintenance, and the wider StellarOS vision remain outside repository claims.

## 14. Conclusion

GroundPulse AI proposes a conservative path toward useful ground-segment research datasets: approve before collecting, preserve before transforming, validate before publishing, and establish baselines before claiming intelligence. Missing measurements remain missing, synthetic data remains explicit, and schemas remain contracts rather than evidence. Publishing the protocol before the data makes its requirements inspectable and provides a shared standard for future work.

## References

[1] M. D. Wilkinson et al., "The FAIR Guiding Principles for scientific data management and stewardship," *Scientific Data*, vol. 3, article 160018, 2016. https://doi.org/10.1038/sdata.2016.18

[2] Libre Space Foundation, "SatNOGS DB API documentation." https://docs.satnogs.org/projects/satnogs-db/en/latest/api.html (accessed 5 August 2026).

[3] T. S. Kelso, "A New Way to Obtain GP Data," CelesTrak. https://celestrak.org/NORAD/documentation/gp-data-formats.php (accessed 5 August 2026).

[4] T. S. Kelso, "CelesTrak Usage Policy," CelesTrak. https://celestrak.org/usage-policy.php (accessed 5 August 2026).

[5] National Centers for Environmental Information, "SWPC Products and Data," NOAA. https://www.ncei.noaa.gov/products/space-weather/partners/swpc-products-and-data (accessed 5 August 2026).

[6] JSON Schema, "JSON Schema Core: A Media Type for Describing JSON Documents," Draft 2020-12. https://json-schema.org/draft/2020-12/json-schema-core.html (accessed 5 August 2026).

## Repository Availability

The repository is available at https://github.com/ousssamarahmani/GroundPulse-AI-Research-Datasets.

Repository code is licensed under Apache-2.0. External data retains its original terms and is not relicensed by the project.
