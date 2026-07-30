#!/usr/bin/env python3
"""Import externally supplied synthetic telemetry without inventing records."""
from __future__ import annotations
import argparse,hashlib,json,shutil
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('input',type=Path);p.add_argument('--generator-name',required=True);p.add_argument('--generator-version',required=True);p.add_argument('--methodology',required=True);args=p.parse_args()
 if not args.input.is_file():raise FileNotFoundError(args.input)
 out=ROOT/'datasets'/'raw'/'external_synthetic';out.mkdir(parents=True,exist_ok=True);dest=out/args.input.name
 if dest.exists():raise FileExistsError(f'refusing to overwrite {dest}')
 shutil.copy2(args.input,dest);body=dest.read_bytes();meta={"source":"externally_supplied_synthetic_telemetry","generator_name":args.generator_name,"generator_version":args.generator_version,"methodology":args.methodology,"imported_at":datetime.now(timezone.utc).isoformat(),"sha256":hashlib.sha256(body).hexdigest(),"synthetic":True,"transformed":False}
 dest.with_suffix(dest.suffix+'.provenance.json').write_text(json.dumps(meta,indent=2)+'\n',encoding='utf-8');print(dest)
if __name__=='__main__':main()
