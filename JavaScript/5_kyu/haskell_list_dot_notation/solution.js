function ArrayComprehension(options) {
  if (!options.hasOwnProperty('generator')) return [];

  const generator = options.generator.replace(/\s/g, '');
  if (generator === '') return [];

  if (!options.generator.includes('..'))
    return options.generator.split(',').map(Number);

  const [ _, start, next, end ] = generator.match(
    /^(-?\d+),?(-?\d+)*\.\.(-?\d+)$/).map(Number);

  const step = next - start || 1;

  if (end > start && step < 0) return [];
  if (end < start && step > 0) return [];

  const result = [];
  let n = start;

  if (end > start)
    while (n <= end) {
      result.push(n);
      n += step;
    }

  if (end < start)
    while (n >= end) {
      result.push(n);
      n += step;
    }


  return result;
}
