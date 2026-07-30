export function formatTimestamp(iso: string | number): string {
  const d = new Date(iso);
  return d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}

export function formatTimeOnly(iso: string | number): string {
  const d = new Date(iso);
  return d.toISOString().substring(11, 19);
}

export function formatDb(val: number): string {
  return `${val >= 0 ? '+' : ''}${val.toFixed(2)} dB`;
}

export function formatTemp(val: number): string {
  return `${val.toFixed(1)}°C`;
}

export function formatPct(val: number): string {
  return `${val.toFixed(2)}%`;
}

export function formatHz(val: number): string {
  if (Math.abs(val) >= 1e9) {
    return `${(val / 1e9).toFixed(3)} GHz`;
  }
  if (Math.abs(val) >= 1e6) {
    return `${(val / 1e6).toFixed(3)} MHz`;
  }
  if (Math.abs(val) >= 1e3) {
    return `${(val / 1e3).toFixed(1)} kHz`;
  }
  return `${val.toFixed(0)} Hz`;
}
