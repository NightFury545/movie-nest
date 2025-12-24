export function parseArray(value: string | null): string[] | undefined {
  if (!value) return undefined;
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parseRangeParam(
  raw: string | null,
): [number, number] | undefined {
  if (!raw) return undefined;
  const v = raw.trim();
  if (!v) return undefined;

  const sep = v.includes('-') ? '-' : v.includes(',') ? ',' : null;

  if (sep) {
    const [a, b] = v
      .split(sep)
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n));
    if (
      typeof a === 'number' &&
      typeof b === 'number' &&
      !Number.isNaN(a) &&
      !Number.isNaN(b)
    ) {
      return [Math.min(a, b), Math.max(a, b)];
    }
    if (!Number.isNaN(a) && (Number.isNaN(b) || b === undefined)) {
      return [a, a];
    }
    return undefined;
  }

  const num = Number(v);
  if (!Number.isNaN(num)) {
    return [num, num];
  }

  return undefined;
}
