export const useGenFilterStr = () => {
  const genFiltersStr = (filters) => {
    console.log("🚀 ~ filters:", filters);
    let filtersStr = "";
    for (const [key, value] of filters.entries()) {
      filtersStr += `${key}=${value.join(",")};`;
    }

    //delete last ';'
    return filtersStr.slice(0, -1);
  };

  return { genFiltersStr };
};
