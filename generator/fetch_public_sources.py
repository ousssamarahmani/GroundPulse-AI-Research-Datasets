#!/usr/bin/env python3
"""Fetch source-backed public research snapshots with provenance.

This script does not create telemetry, infer joins, or fill missing values.
"""
from __future__ import annotations
import argparse, hashlib, json, urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SOURCES={
 "satnogs_satellites": {
  "url":"https://db.satnogs.org/api/satellites/?format=json",
  "license":"CC BY-SA 4.0 (confirm current SatNOGS terms before redistribution)",
  "description":"SatNOGS DB public satellite metadata"
 },
 "celestrak_space_stations": {
  "url":"https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=JSON",
  "license":"CelesTrak terms and source attribution apply; review before redistribution",
  "description":"CelesTrak current GP/OMM records for the space-stations group"
 },
 "noaa_planetary_k_index": {
  "url":"https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
  "license":"US government data; verify NOAA product notices and attribution guidance",
  "description":"NOAA SWPC planetary K-index product"
 }
}

def fetch(name,config,output):
 req=urllib.request.Request(config['url'],headers={'User-Agent':'GroundPulse-Open-Research/0.2 (+source-backed; no high-frequency polling)'})
 with urllib.request.urlopen(req,timeout=60) as response:
  body=response.read(); content_type=response.headers.get('Content-Type',''); last_modified=response.headers.get('Last-Modified')
 json.loads(body.decode('utf-8'))
 stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ'); output.mkdir(parents=True,exist_ok=True)
 data_path=output/f'{name}_{stamp}.json'; data_path.write_bytes(body)
 provenance={"source_name":name,"source_url":config['url'],"description":config['description'],"retrieved_at":datetime.now(timezone.utc).isoformat(),"source_last_modified":last_modified,"content_type":content_type,"license_or_terms_note":config['license'],"sha256":hashlib.sha256(body).hexdigest(),"adapter_version":"0.2.0","raw_or_processed":"raw","synthetic":False}
 (output/f'{name}_{stamp}.provenance.json').write_text(json.dumps(provenance,indent=2)+'\n',encoding='utf-8')
 return data_path,provenance

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--source',choices=[*SOURCES,'all'],default='all');parser.add_argument('--output',type=Path,default=ROOT/'datasets'/'raw'/'public');args=parser.parse_args()
 selected=SOURCES if args.source=='all' else {args.source:SOURCES[args.source]}
 for name,config in selected.items():
  path,prov=fetch(name,config,args.output);print(f"fetched {name}: {path.name} sha256={prov['sha256']}")
if __name__=='__main__':main()
