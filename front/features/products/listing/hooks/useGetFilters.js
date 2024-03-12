export const useGetFilters = () => {
  function getFilters(products, category) {
    const filtersMap = new Map();

    for (const pd of products) {
      for (const [key, value] of Object.entries(pd.characteristics)) {
        // if (category.filters.includes(key)) {
        if (!filtersMap.has(key)) {
          filtersMap.set(key, new Set());
        }

        filtersMap.get(key).add(...value);
      }
      // }
    }

    console.log("🚀 ~ filtersMap:", filtersMap);
    return filtersMap;
  }

  function getMinMaxPrice(products) {
    const prices = products.map((p) => Number(p.price));
    const min = prices.reduce((a, b) => Math.min(a, b), Infinity);
    const max = prices.reduce((a, b) => Math.max(a, b), -Infinity);
    return [min, max];
  }

  return { getFilters, getMinMaxPrice };
};
