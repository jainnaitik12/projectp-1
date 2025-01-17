export const logPerformance = (label, callback) => {
  console.time(label);
  const result = callback();
  console.timeEnd(label);
  return result;
};

export const debugFilters = (filters) => {
  console.group('Filter Debug');
  console.log('Current Filters:', filters);
  console.log('Filter Types:', Object.keys(filters).map(key => `${key}: ${typeof filters[key]}`));
  console.groupEnd();
}; 