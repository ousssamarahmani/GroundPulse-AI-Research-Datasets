/**
 * Linear Congruential Generator for reproducible, seedable synthetic data generation.
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: number = 42) {
    this.seed = seed;
  }

  // Returns pseudo-random float between 0 and 1
  public next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Returns float in range [min, max]
  public range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  // Returns Gaussian random variable N(mean, stdev) using Box-Muller transform
  public gaussian(mean: number = 0, stdev: number = 1): number {
    const u1 = Math.max(0.0000001, this.next());
    const u2 = this.next();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdev;
  }

  // Choose random element from array
  public pick<T>(arr: T[]): T {
    const index = Math.floor(this.next() * arr.length);
    return arr[Math.min(index, arr.length - 1)];
  }
}
