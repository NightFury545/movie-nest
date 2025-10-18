export function parseArray(value: string | null): string[] | undefined {
  if (!value) return undefined;
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function parseNumber(value: string | null): number | undefined {
  return value ? Number(value) : undefined;
}
