export function rollRange([min, max]) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function rollRangeOrPreset(value) {
  if (Array.isArray(value)) {
    const [min, max] = value;
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  return value; // fixed number
}
