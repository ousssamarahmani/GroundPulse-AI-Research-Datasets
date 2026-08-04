import { ArrowRight, BookOpen, CircleDot, Database, FileCheck2, Github, Layers3, Orbit, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { RESEARCH_SOURCES } from './config/researchSources';

const principles = [
  ['01', 'Source-backed', 'Every record retains its origin, retrieval time, license boundary, and transformation history.'],
  ['02', 'Reproducible', 'Adapters and schemas are versioned so a published research result can be reconstructed.'],
  ['03', 'Honest by design', 'Missing information remains missing. Generated values are never presented as observations.'],
];
const roadmap = [
  ['Foundation', 'Current', 'Repository structure, schemas, provenance rules, documentation, and source boundaries.'],
  ['Source review', 'Next', 'Licensing, access, retention, and attribution review for each intended public source.'],
  ['Collection pilots', 'Planned', 'Small, traceable imports and validation reports before any dataset release.'],
];
const researchStatus = [
  ['Dataset schemas', 'Defined', 'Public JSON schemas establish the initial telemetry, RF, pass, and incident contracts.'],
  ['Synthetic generator', 'Import scaffold', 'A controlled import boundary exists; no generated records are published as observations.'],
  ['Baseline detections', 'Planned', 'Baseline anomaly methods will follow validated, provenance-backed dataset releases.'],
  ['Notebooks', 'Foundation', 'The notebook area is prepared for reproducible analysis once approved data is available.'],
  ['AWS integrations', 'Architecture only', 'Cloud integration is documented as future architecture and is not connected or deployed.'],
  ['Operational validation', 'None', 'No operational ground station, live telemetry feed, or production validation is claimed.'],
];function Label({ children }: { children: ReactNode }) { return <div className="eyebrow">{children}</div>; }

export default function App() {
  return <main className="site">
    <header>
      <a className="brand" href="#research" aria-label="GroundPulse AI home"><img src="/assets/groundpulse-ai-logo.png" alt="" /><i /><span><b>GroundPulse AI</b><small>Open research dataset foundation</small></span></a>
      <nav aria-label="Primary navigation"><a className="active" href="#research">Research</a><a href="#foundation">Data foundation</a><a href="#methodology">Methodology</a><a href="#about">About</a><a href="#contribute">Contribute</a></nav>
      <div className="header-actions"><a className="github-link" href="https://github.com/ousssamarahmani/GroundPulse-AI-Research-Datasets" aria-label="View GroundPulse AI on GitHub"><Github /></a><div className="dataset-state"><span /> No datasets collected</div></div>
    </header>
    <section className="hero" id="research">
      <img className="horizon" src="/assets/groundpulse-space-horizon.png" alt="" />
      <div className="star-field" aria-hidden="true"><Sparkles /><Sparkles /><Sparkles /><Sparkles /></div>
      <div className="hero-copy reveal reveal-1"><Label>Open SpaceTech research initiative</Label><h1 className="reveal reveal-2">Research infrastructure for the ground segment</h1><p className="reveal reveal-3">GroundPulse AI prepares reproducible adapters, schemas, provenance controls, and research workflows for satellite and ground-station data. It does not ship invented telemetry or claim operational capability.</p><div className="actions reveal reveal-4"><a className="button" href="#foundation">Explore the project <ArrowRight /></a><a className="link" href="#methodology">View research principles <ArrowRight /></a></div></div>
      <div className="hero-logo reveal reveal-3"><Orbit className="orbit orbit-one" aria-hidden="true" /><Orbit className="orbit orbit-two" aria-hidden="true" /><Radio className="rf-pulse rf-one" aria-hidden="true" /><Radio className="rf-pulse rf-two" aria-hidden="true" /><img src="/assets/groundpulse-ai-logo.png" alt="GroundPulse AI satellite ground-station logo" /></div>
    </section>
    <section className="readiness" aria-label="Project readiness"><article><Layers3 /><div><b>Foundation ready</b><p>Architecture, schemas, and provenance defined and versioned.</p></div></article><article><CircleDot /><div><b>Data collection not started</b><p>No datasets collected. No external connections configured.</p></div></article><article><Radio /><div><b>Operational validation none</b><p>No operational service. No telemetry. No claims of capability.</p></div></article></section>
    <section className="research-status" aria-labelledby="research-status-title"><div className="status-heading"><Label>Current research status</Label><h2 id="research-status-title">Foundation maturity, stated precisely.</h2><p>Status reflects repository evidence—not aspirational platform capability.</p></div><div className="status-grid">{researchStatus.map(([title,status,copy],i) => <article key={title}><span>0{i+1}</span><div><small>{status}</small><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
    <section className="numbered" id="about"><div className="number">01</div><div><Label>About GroundPulse AI</Label><h2>An open foundation for rigorous ground-segment research.</h2></div><p>GroundPulse AI is an open, community-aligned research foundation building the infrastructure needed to support high-integrity ground-segment research. The project is source-backed, provenance-first, and designed for reproducibility.</p></section>
    <section className="split dark"><div><Label>The ground-segment data problem</Label><h2>Useful research begins before the first record is collected.</h2></div><div className="columns"><p>Ground-segment observations arrive from different systems, formats, time bases, licenses, and operating contexts.</p><p>Without explicit provenance and validation, clean-looking datasets can hide ambiguity, incompatible measurements, or invented certainty.</p></div></section>
    <section className="split" id="foundation"><div className="section-intro"><Label>Intended data sources</Label><h2>Prepared inputs.<br />Empty by design.</h2><p>These are source intentions and adapter boundaries—not active feeds and not collected datasets.</p></div><div className="rows source-rows">{RESEARCH_SOURCES.map((source, i) => <article key={source.name}><span>0{i + 1}</span><div><small>{source.category}</small><h3>{source.name}</h3><p>{source.role}</p></div><b>{source.status}</b></article>)}</div></section>
    <section className="split dark" id="methodology"><div className="section-intro"><Label>Research approach</Label><h2>Evidence before interface.</h2><p>The public experience communicates what exists, what is planned, and what is deliberately absent.</p></div><div className="principles">{principles.map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="split repository"><div><Label>Repository foundation</Label><h2>Small, explicit, auditable.</h2><p>Architecture and implementation guidance live in the repository documentation, not as simulated application features.</p><ul><li><ShieldCheck /> Provenance required for every source</li><li><FileCheck2 /> Schemas do not imply data exists</li><li><Database /> Missing fields are never fabricated</li></ul></div><div className="repo-tree"><div><Database /> groundpulse-datasets/</div>{['datasets/raw','datasets/processed','datasets/samples','schemas','generator','notebooks','examples','docs'].map(path => <code key={path}>├── {path}/</code>)}<p>README.md contains the architecture and implementation boundary.</p></div></section>
    <section className="split"><div className="section-intro"><Label>Roadmap</Label><h2>Deliberate progress, visible boundaries.</h2></div><div className="rows roadmap">{roadmap.map(([title,status,copy],i) => <article key={title}><span>0{i+1}</span><div><small>{status}</small><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
    <section className="split dark"><div><Label>Vision & StellarOS context</Label><h2>A public research foundation with a clear boundary.</h2></div><p>GroundPulse AI explores the data foundations needed for future space-systems intelligence. The production StellarOS platform, operational integrations, agent orchestration, and advanced intelligence pipeline remain proprietary and are not included here.</p></section>
    <section className="cta" id="contribute"><BookOpen /><Label>Research call to action</Label><h2>Help define trustworthy ground-segment research.</h2><p>Review the schemas, challenge the methodology, document source constraints, or contribute an auditable adapter.</p><a className="button repository-button" href="https://github.com/ousssamarahmani/GroundPulse-AI-Research-Datasets"><Github /> View repository <ArrowRight /></a></section>
    <footer><div><b>GroundPulse AI</b><span>Open research dataset foundation</span></div><p>No operational data · No fabricated records · No claims of deployed capability</p><span>© 2026 GroundPulse AI</span></footer>
  </main>;
}
