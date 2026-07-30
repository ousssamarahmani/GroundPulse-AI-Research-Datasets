import { AlertTriangle, ArrowUpRight, Database, FileCheck2, Radio, ShieldCheck } from 'lucide-react';
import { RESEARCH_SOURCES } from './config/researchSources';

const structure = [
  'datasets/raw',
  'datasets/processed',
  'datasets/samples',
  'schemas',
  'generator',
  'notebooks',
  'examples',
  'docs',
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-white selection:text-black">
      <div className="fixed inset-0 pointer-events-none opacity-40 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header className="relative border-b border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full border border-zinc-700 bg-black" aria-hidden="true">
              <img
                src="/assets/groundpulse-ai-logo.png"
                alt=""
                className="h-full w-full origin-top scale-[1.55] object-cover object-top"
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.16em]">GROUNDPULSE.AI</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-zinc-500">Open research dataset foundation</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 border border-zinc-800 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
            No datasets collected
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
              <Radio className="h-4 w-4" aria-hidden="true" />
              Source-backed space systems research
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-7xl">
              A clean foundation for ground-segment research datasets.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              GroundPulse prepares reproducible adapters, schemas, provenance controls, and research workflows for satellite and ground-station data. It does not ship invented telemetry or claim operational capability.
            </p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-[420px] lg:block">
            <div className="absolute inset-8 rounded-full border border-zinc-700/40" />
            <img
              src="/assets/groundpulse-ai-logo.png"
              alt="GroundPulse AI satellite ground-station logo"
              className="relative aspect-square w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {[
            ['Current release', 'Repository foundation'],
            ['Dataset records', '0 collected'],
            ['Operational connection', 'None'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#080808] p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">{label}</div>
              <div className="mt-3 text-xl font-medium tracking-tight">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-zinc-800/80 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Source registry</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Prepared inputs, empty by design.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-zinc-500">Adapters and import boundaries are ready. Collection happens only after source, licensing, and authorization decisions are approved.</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {RESEARCH_SOURCES.map((source, index) => (
              <article key={source.name} className="group border border-zinc-800 bg-[#050505] p-6 transition-colors hover:border-zinc-600">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="mt-1 text-xs tabular-nums text-zinc-700">0{index + 1}</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">{source.category}</div>
                      <h3 className="mt-2 text-xl font-medium">{source.name}</h3>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-300" aria-hidden="true" />
                </div>
                <p className="mt-6 text-sm text-zinc-300">{source.role}</p>
                <p className="mt-3 text-xs leading-5 text-zinc-600">{source.boundary}</p>
                <div className="mt-6 inline-flex border border-zinc-800 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">{source.status}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">Repository structure</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Small, explicit, auditable.</h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-500">Architecture and implementation guidance live in the README and documentation—not as simulated application features.</p>
          <div className="mt-8 space-y-3">
            {[
              [ShieldCheck, 'Provenance required for every source'],
              [FileCheck2, 'Schemas do not imply data exists'],
              [AlertTriangle, 'Missing fields are never fabricated'],
            ].map(([Icon, text]) => {
              const ItemIcon = Icon as typeof ShieldCheck;
              return <div key={text as string} className="flex items-center gap-3 text-sm text-zinc-400"><ItemIcon className="h-4 w-4" aria-hidden="true" />{text as string}</div>;
            })}
          </div>
        </div>

        <div className="border border-zinc-800 bg-[#080808] p-5 font-mono text-xs">
          <div className="mb-5 flex items-center gap-2 border-b border-zinc-800 pb-4 text-zinc-500"><Database className="h-4 w-4" /> groundpulse-datasets/</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {structure.map((path) => <div key={path} className="border border-zinc-900 px-3 py-2.5 text-zinc-400">├── {path}/</div>)}
          </div>
          <div className="mt-5 border-t border-zinc-800 pt-4 text-zinc-600">README.md contains the system architecture and implementation boundary.</div>
        </div>
      </section>

      <footer className="relative border-t border-zinc-800/80 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row">
          <span>GroundPulse AI — Open research foundation</span>
          <span>No operational data · No fabricated records</span>
        </div>
      </footer>
    </main>
  );
}
