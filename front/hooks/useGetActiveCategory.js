export const useGetActiveCategory = () => {
  function getActiveCategory(path, categories) {
    let activeCategory = null;

    const pathString = path.join(",");
    categories.forEach((category) => {
      if (category.path == pathString) {
        activeCategory = category;
      }
    });

    return activeCategory;
  }

  return { getActiveCategory };
};