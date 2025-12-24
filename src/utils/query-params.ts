export const toRangeParam = (
  value: [number, number] | undefined,
  def: [number, number],
): string | undefined => {
  if (!value) return undefined;
  if (value[0] === def[0] && value[1] === def[1]) return undefined;
  return `${value[0]}-${value[1]}`;
};

export const toListParam = (arr?: string[]): string | undefined => {
  if (!arr || arr.length === 0) return undefined;
  return arr.join(',');
};

export const toStringParam = (value?: string): string | undefined => {
  return value && value.trim() !== '' ? value : undefined;
};
