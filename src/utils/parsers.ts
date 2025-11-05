export const parseRange = (
  value: string | null,
  min: number,
  max: number,
  def: [number, number],
): [number, number] => {
  if (!value) return def;
  const parts = value.split('-').map(Number);
  if (parts.length !== 2) return def;
  const [start, end] = parts;
  return start < min || end > max || start > end ? def : [start, end];
};
