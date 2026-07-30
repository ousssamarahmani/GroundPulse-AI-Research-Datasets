"""List collected source snapshots and verify provenance checksums."""
from __future__ import annotations
import hashlib,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];RAW=ROOT/'datasets'/'raw'
if __name__=='__main__':
 sidecars=sorted(RAW.rglob('*.provenance.json'))
 if not sidecars: raise SystemExit('No source snapshots found. Run generator/fetch_public_sources.py first.')
 for sidecar in sidecars:
  meta=json.loads(sidecar.read_text(encoding='utf-8-sig'));data=Path(str(sidecar).removesuffix('.provenance.json'))
  if not data.exists():raise FileNotFoundError(data)
  actual=hashlib.sha256(data.read_bytes()).hexdigest()
  if actual!=meta['sha256']:raise ValueError(f'checksum mismatch: {data}')
  print(f"PASS {meta['source_name'] if 'source_name' in meta else meta['source']}: {data.name} synthetic={meta['synthetic']}")
