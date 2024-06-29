const UNITS = [
  { unit: 'year', value: 1000 * 60 * 60 * 24 * 365 },
  { unit: 'month', value: 1000 * 60 * 60 * 24 * 30 },
  { unit: 'week', value: 1000 * 60 * 60 * 24 * 7 },
  { unit: 'day', value: 1000 * 60 * 60 * 24 },
  { unit: 'hour', value: 1000 * 60 * 60 },
  { unit: 'minute', value: 1000 * 60 },
  { unit: 'second', value: 1000 },
];

export const createTimeAgoFormatter = () => {
  const rtf = new Intl.RelativeTimeFormat('ja', { numeric: 'auto' });

  const findUnit = (elapsed: number) =>
    UNITS.find(({ value }: { value: number }) => elapsed >= value);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const elapsed = now - date;
    const formattingUnit = findUnit(elapsed);

    if (formattingUnit) {
      const diff = Math.floor(elapsed / formattingUnit.value);
      return rtf.format(-diff, formattingUnit.unit);
    }

    return rtf.format(0, 'second');
  };

  return {
    formatTimeAgo,
  };
};