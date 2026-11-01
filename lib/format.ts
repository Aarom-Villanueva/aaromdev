/** S/499, S/1,499 — same grouping the site already used for prices. */
export function formatSoles(amount: number): string {
  return `S/${amount.toLocaleString('en-US')}`;
}

/** Percentage saved, rounded down so the label never overstates the discount. */
export function discountPercent(original: number, discounted: number): number {
  return Math.floor(((original - discounted) / original) * 100);
}
