#!/usr/bin/env python3
"""Import an authorized ground-station log without transforming or publishing it."""
from __future__ import annotations
import argparse,hashlib,json,shutil
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('input',type=Path);p.add_argument('--authorization-reference',required=True);p.add_argument('--classification',required=True,choices=['PUBLIC','INTERNAL_RESEARCH']);p.add_argument('--confirm-no-secrets',action='store_true',required=True);args=p.parse_args()
 if not args.input.is_file():raise FileNotFoundError(args.input)
 dest_dir=ROOT/'datasets'/'raw'/'authorized_logs';dest_dir.mkdir(parents=True,exist_ok=True);dest=dest_dir/args.input.name
 if dest.exists():raise FileExistsError(f'refusing to overwrite {dest}')
 shutil.copy2(args.input,dest);body=dest.read_bytes();meta={"source":"authorized_ground_station_log","original_filename":args.input.name,"imported_at":datetime.now(timezone.utc).isoformat(),"authorization_reference":args.authorization_reference,"classification":args.classification,"sha256":hashlib.sha256(body).hexdigest(),"synthetic":False,"transformed":False}
 dest.with_suffix(dest.suffix+'.provenance.json').write_text(json.dumps(meta,indent=2)+'\n',encoding='utf-8');print(dest)
if __name__=='__main__':main()
