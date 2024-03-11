export const useGetFilterMapFromStr = () => {
  const getFilterMapFromStr = (filtersStr) => {
    let filters = {};
    if (filtersStr) {
      filtersStr.split(";").forEach((fs) => {
        const [filterName, filterValue] = fs.split("=");
        filters[filterName] = filterValue.split(",");
      });
    }
    return filters;
  };

  return { getFilterMapFromStr };
};
