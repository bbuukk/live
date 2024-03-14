export function getFiltersMap(products, activeCategory) {
  let filtersMap = new Map();
  for (const pd of products) {
    for (const [key, value] of pd.characteristics) {
      if (activeCategory.filters.includes(key)) {
        if (!filtersMap.has(key)) {
          filtersMap.set(key, new Set());
        }

        filtersMap.get(key).add(...value);
      }
    }
  }

  for (const [key, value] of filtersMap) {
    filtersMap.set(key, Array.from(value));
  }

  return filtersMap;
}

export function getFilterMapFromStr(filtersStr) {
  let filters = null;
  if (filtersStr) {
    filters = new Map();
    filtersStr.split(";").forEach((fs) => {
      const [filterName, filterValue] = fs.split("=");
      filters.set(filterName, [...filterValue.split(",")]);
    });
  }
  return filters;
}
