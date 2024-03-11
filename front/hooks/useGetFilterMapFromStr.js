export const useGetFilterMapFromStr = () => {
  const getFilterMapFromStr = (filtersStr) => {
    let filters = null;
    if (filtersStr) {
      filters = new Map();
      filtersStr.split(";").forEach((fs) => {
        const [filterName, filterValue] = fs.split("=");
        filters.set(filterName, [...filterValue.split(",")]);
      });
    }
    return filters;
  };

  return { getFilterMapFromStr };
};
