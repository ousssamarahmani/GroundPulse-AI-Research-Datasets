export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

export function stdDev(arr: number[], avg?: number): number {
  if (arr.length <= 1) return 0;
  const m = avg ?? mean(arr);
  const variance = arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

export function zScore(val: number, meanVal: number, stdVal: number): number {
  if (stdVal === 0) return 0;
  return (val - meanVal) / stdVal;
}

export function rollingStats(data: number[], windowSize: number = 10): { rollingMean: number[]; rollingStd: number[]; zScores: number[] } {
  const rollingMean: number[] = [];
  const rollingStd: number[] = [];
  const zScores: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const windowSlice = data.slice(start, i + 1);
    const m = mean(windowSlice);
    const s = stdDev(windowSlice, m);
    rollingMean.push(m);
    rollingStd.push(s);
    zScores.push(s > 0 ? (data[i] - m) / s : 0);
  }

  return { rollingMean, rollingStd, zScores };
}
