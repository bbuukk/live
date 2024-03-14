import category from "#src/models/category.js";

export async function getActiveCategoryAndAllSubcategories(categoryPath) {
  const activeCategory = await category.findOne({
    path: new RegExp(`^${categoryPath.toLowerCase()}$`, "i"),
  });

  if (activeCategory == null) {
    return res
      .status(404)
      .json({ message: "Category with this path is not found" });
  }

  const allSubcategories = await category
    .find({
      path: new RegExp(categoryPath, "i"),
    })
    .select("name order path imagePath")
    .exec();

  return { activeCategory, allSubcategories };
}

export function isOneLevelDeeper(category, activeCategory) {
  const ONE_LEVEL_DEEPER = 1;
  const activeCategoryNestingLevel = activeCategory.path.split(",").length;
  const categoryNestingLevel = category.path.split(",").length;
  return categoryNestingLevel === activeCategoryNestingLevel + ONE_LEVEL_DEEPER;
}
