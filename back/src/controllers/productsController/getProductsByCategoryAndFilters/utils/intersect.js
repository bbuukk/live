export function intersectArrays(...arrays) {
  const elementFrequency = {};

  for (const arr of arrays) {
    for (const element of arr) {
      elementFrequency[element] = (elementFrequency[element] || 0) + 1;
    }
  }

  const intersection = Object.keys(elementFrequency).filter(
    (element) => elementFrequency[element] === arrays.length
  );

  return intersection;
}

export function intersectMaps(...maps) {
  const allKeys = Array.from(
    new Set(maps.flatMap((map) => Array.from(map.keys())))
  );

  const intersectedMap = new Map();

  allKeys.forEach((filterName) => {
    const filtersValues = maps
      .map((map) => map.get(filterName))
      .filter((value) => value !== undefined);

    const intersectedValues = intersectArrays(...filtersValues);

    if (intersectedValues.length > 0) {
      intersectedMap.set(filterName, intersectedValues);
    }
  });

  return intersectedMap;
}
