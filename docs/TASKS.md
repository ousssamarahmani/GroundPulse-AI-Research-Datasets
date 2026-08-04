# GroundPulse AI Task Backlog

Status date: 2026-08-05. Statuses describe repository evidence, not product maturity.

## Status definitions

- **Complete** - present and verified in the repository.
- **In progress** - started but acceptance criteria are not satisfied.
- **Planned** - approved direction with no implementation claim.
- **Blocked** - requires a source, authorization, governance decision, or maintainer input.

## Phase 1 - Research foundation

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| FND-01 | Define public research positioning | Complete | P0 | - | README and UI state that no dataset or operational platform exists |
| FND-02 | Establish monochrome visual system | Complete | P1 | FND-01 | Responsive black, white, graphite, and silver interface |
| FND-03 | Integrate supplied logo | Complete | P0 | FND-02 | Original logo is stored locally, undistorted, and visible in navigation and hero |
| FND-04 | Separate raw, processed, and sample layers | Complete | P0 | FND-01 | Each data directory has a clear empty-state README |
| FND-05 | Finalize citation metadata | Blocked | P1 | Maintainer identity | Author and repository URL replace publication placeholders |

## Phase 2 - Source governance

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| GOV-01 | Approve SatNOGS scope and terms | Planned | P0 | FND-01 | Endpoints, attribution, retention, owner, and purpose are recorded |
| GOV-02 | Approve CelesTrak scope and rate policy | Planned | P0 | FND-01 | Query groups, cadence, staleness, and terms are recorded |
| GOV-03 | Select NOAA SWPC products | Planned | P1 | FND-01 | Product IDs, units, flags, time ranges, and notices are approved |
| GOV-04 | Define ground-log authorization workflow | Blocked | P0 | Data owner | Classification, redaction, retention, and secret review are approved |
| GOV-05 | Define synthetic telemetry acceptance | Planned | P1 | FND-04 | Generator, version, seed, methodology, and provenance are mandatory |

## Phase 3 - Adapter engineering

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| ADP-01 | Harden public-source collector | In progress | P0 | GOV-01..03 | Tests cover content type, empty response, challenge page, timeout, retry, and checksum |
| ADP-02 | Add offline SatNOGS fixture tests | Planned | P1 | GOV-01 | Adapter passes without network and preserves attribution fields |
| ADP-03 | Add offline CelesTrak fixture tests | Planned | P1 | GOV-02 | Epoch and staleness validation pass |
| ADP-04 | Add offline NOAA fixture tests | Planned | P1 | GOV-03 | Units and quality flags remain source-defined |
| ADP-05 | Test controlled importers | Planned | P0 | GOV-04..05 | Importers refuse overwrite and require complete provenance |

## Phase 4 - First dataset release

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| DAT-01 | Run first approved source collection | Blocked | P0 | GOV + ADP | Immutable raw snapshot, checksum, provenance, and terms review exist |
| DAT-02 | Profile source coverage | Planned | P0 | DAT-01 | Field coverage, missingness, time range, and identifiers are documented |
| DAT-03 | Define normalized transformation | Planned | P1 | DAT-02 | Every output field maps to a source or deterministic calculation |
| DAT-04 | Validate schemas and lineage | Planned | P0 | DAT-03 | Schema and source-to-output tests pass |
| DAT-05 | Publish reviewed sample subset | Planned | P1 | DAT-04 | Version, checksum, license notes, and limitations accompany the release |

## Phase 5 - Research analytics

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| ANA-01 | Add dataset coverage notebook | Planned | P1 | DAT-05 | Clean-kernel execution reports coverage and provenance |
| ANA-02 | Add source-specific exploratory analysis | Planned | P2 | DAT-05 | Results use source-defined units and quality flags |
| ANA-03 | Define baseline detection experiment | Planned | P2 | Labeled data | Evaluation split, metrics, leakage risks, and limitations are documented |
| ANA-04 | Add anomaly model benchmark | Blocked | P3 | ANA-03 | Model is compared against transparent baselines on approved labels |

## Phase 6 - Research interface

| ID | Task | Status | Priority | Dependency | Definition of done |
|---|---|---|---|---|---|
| UI-01 | Research repository homepage | Complete | P0 | FND-01 | Responsive UI reports zero records and no operational connection |
| UI-02 | Source and provenance inventory | Planned | P1 | DAT-01 | UI renders verified manifests, not hard-coded records |
| UI-03 | Dataset quality view | Planned | P2 | DAT-05 | Coverage, version, source, and limitations are visible |
| UI-04 | Research charts | Blocked | P2 | DAT-05 | Charts use approved dataset fields and expose provenance |

## Phase 7 - Future research

Predictive maintenance, incident retrieval, RAG, mission reporting, multi-station optimization, agent orchestration, operational integration, and StellarOS remain research proposals. None should be marked complete until implementation, evaluation, security review, and operational validation exist.

## Public website delivery tasks

| ID | Website section | Status | Priority | Dependencies | Definition of done |
|---|---|---|---|---|---|
| WEB-01 | Navigation | In progress | P0 | FND-03 | Clear emblem, section links, active/focus states, and responsive menu |
| WEB-02 | Hero and logo | Complete | P0 | WEB-01 | Full logo, research headline, zero-record status, and no operational claim above the fold |
| WEB-03 | About GroundPulse | Complete | P0 | FND-01 | Research scope and current repository focus are explained honestly |
| WEB-04 | Ground-segment data problem | Complete | P1 | WEB-03 | Technical problem statement contains no unsupported numbers or fear-based claims |
| WEB-05 | Research approach | Complete | P0 | GOV-01..05 | Source-to-research workflow separates current, planned, and future work |
| WEB-06 | Intended data sources | Complete | P0 | GOV-01..05 | Five sources show role, governance requirement, and “not collected” state |
| WEB-07 | Repository foundation | Complete | P1 | FND-04 | Displayed structure matches real files and contains no fake previews |
| WEB-08 | Current project status | Complete | P0 | All phase owners | Evidence-backed status matrix is visible and dated |
| WEB-09 | Research principles | Complete | P1 | GOV policies | Principles map to repository policies and controls |
| WEB-10 | Roadmap | Complete | P1 | docs/implementation_plan.md | Sequential phases, dependencies, and blockers are shown without false dates |
| WEB-11 | Documentation | Planned | P1 | Existing documents | Every card links to an existing document; no placeholder content |
| WEB-12 | Vision and StellarOS context | Complete | P2 | FND-01 | StellarOS and advanced intelligence are clearly marked future vision |
| WEB-13 | Research call to action | In progress | P2 | WEB-10,WEB-11 | Actions point to architecture, tasks, policy, contribution, and repository |
| WEB-14 | Footer and disclaimer | In progress | P1 | FND-03 | Full logo, license, external-source notice, zero-data state, and disclaimer |
| WEB-15 | Responsive implementation | In progress | P0 | WEB-01..14 | Desktop, tablet, and mobile layouts remain readable without overflow |
| WEB-16 | Accessibility verification | In progress | P0 | WEB-15 | Landmarks, headings, focus, keyboard, contrast, alt text, and reduced motion pass review |
| WEB-17 | Browser and production QA | Blocked | P0 | WEB-16 | TypeScript and production build pass; browser visual QA remains blocked by local URL policy |
## Public research portal tasks

| ID | Portal area | Status | Priority | Dependencies | Definition of done |
|---|---|---|---|---|---|
| PRT-01 | Unified research portal shell | Planned | P0 | WEB-01..17 | Research, Datasets, Notebooks, Methodology, Documentation, and GitHub navigation works responsively |
| PRT-02 | Dataset catalog | Planned | P0 | PRT-01 | Zero-release state and intended sources render without fabricated records |
| PRT-03 | Dataset release detail | Blocked | P0 | DAT-05 | Provenance, schema, license, checksum, coverage, limitations, and download are manifest-driven |
| PRT-04 | Notebook registry | Planned | P1 | PRT-01 | Notebook specifications are public and marked awaiting data until releases exist |
| PRT-05 | Methodology index | Planned | P1 | Existing policies | Governance, collection, validation, transformation, and publication guidance is navigable |
| PRT-06 | Documentation index | Planned | P1 | Existing documents | Every entry links to a real repository document or schema |
| PRT-07 | Public route accessibility | Planned | P0 | PRT-01..06 | Keyboard, focus, headings, reduced motion, and responsive layouts pass review |
| PRT-08 | Authentication decision | Deferred | P3 | Private workflow requirement | Authentication is added only for private uploads, saved work, partners, or credentials |
