import Product from "#src/models/product.js";
import { unslugify } from "@bbuukk/slugtrans/slugify";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";

import {
  getActiveCategoryAndAllSubcategories,
  isOneLevelDeeper,
} from "./utils/getCategories.js";
import { getFilterMapFromStr, getFiltersMap } from "./utils/getFilters.js";
import { getOriginalFilterNameAndValues } from "./utils/getOrinialFilter.js";
import { intersectMaps } from "./utils/intersect.js";

//? if categoryPath is not changed from previous time, we can just use
//? product that we already have and filter them

export const getProductsByCategoryAndFilters = async (req, res) => {
  let { slugCategoryPath, filtersStr } = req.params;
  const result = {};

  try {
    const categoryPath = untransliterate(unslugify(slugCategoryPath));

    /*Subcategories is necessary, because products have the most specific category,
      so product in "for cats,food and treats" category will not have category as "for cats", only most specific one|s*/
    const { activeCategory, allSubcategories } =
      await getActiveCategoryAndAllSubcategories(categoryPath);

    result.activeCategory = activeCategory;
    result.subcategories = allSubcategories.filter(
      (category) =>
        category.name !== activeCategory.name &&
        isOneLevelDeeper(category, activeCategory)
    );

    const activeCategoriesIds = allSubcategories.map((c) => c._id);

    const allFilterMaps = [];

    /*Creating filters based on filters that applied user */
    let filters = getFilterMapFromStr(filtersStr);
    for (let [filterName, filterValues] of filters) {
      if (filterName === "page") {
        continue;
      }

      const { originalFilterName, originalFilterValues } =
        getOriginalFilterNameAndValues(filterName, filterValues);

      let characteristicsQuery = Product.find({
        category: { $in: activeCategoriesIds },
      }).select("characteristics");

      let filteredCharacterstics = [];
      if (filterName === "price") {
        filteredCharacterstics = await characteristicsQuery
          .where("price")
          .gte(filterValues[0])
          .lte(filterValues[1])
          .exec();
      } else {
        filteredCharacterstics = await characteristicsQuery
          .where(`characteristics.${originalFilterName}`, {
            $in: originalFilterValues.map(
              (value) => new RegExp(`^${value}$`, "i")
            ),
          })
          .exec();
      }

      /*
        FilterMap parsed from characteristics of products that are filtered by current filter item
        */
      const filterMap = getFiltersMap(filteredCharacterstics, activeCategory);

      if (filterName != "price") {
        let allFilterValues = await Product.distinct(
          `characteristics.${originalFilterName}`,
          {
            category: { $in: activeCategoriesIds },
          }
        );

        filterMap.set(originalFilterName, allFilterValues);
      }

      allFilterMaps.push(filterMap);
    }

    let intersectedFilterMap = intersectMaps(...allFilterMaps);
    /*Getting default category filters if product were not filtered by user*/
    if (intersectedFilterMap.size == 0) {
      let allCategoryProducts = await Product.find({
        category: { $in: activeCategoriesIds },
      })
        .select("characteristics")
        .sort({ createdAt: -1 })
        .exec();

      intersectedFilterMap = getFiltersMap(allCategoryProducts, activeCategory);
    }
    result.filtersMap = Array.from(intersectedFilterMap.entries());

    /*Creating query for resulted products*/
    let query = Product.find({
      category: { $in: activeCategoriesIds },
    })
      .select("name price images characteristics")
      .sort({ createdAt: -1 });

    /*Applying filters to resulted products query*/
    for (let [filterName, filterValues] of filters) {
      if (filterName === "page") {
        continue;
      }

      const { originalFilterName, originalFilterValues } =
        getOriginalFilterNameAndValues(filterName, filterValues);

      if (filterName === "price") {
        query = query.where("price").gte(filterValues[0]).lte(filterValues[1]);
      } else {
        query = query.where(`characteristics.${originalFilterName}`, {
          $in: originalFilterValues.map(
            (value) => new RegExp(`^${value}$`, "i")
          ),
        });
      }
    }

    const allProducts = await query.exec();
    /*Counting number of pages for all filtered products*/
    result.numPages = Math.max(1, Math.ceil(allProducts.length / 50));

    /*Counting max and min price of all filtered products*/
    const prices = allProducts.map((p) => Number(p.price));
    const minPrice = prices.reduce((a, b) => Math.min(a, b), Infinity);
    const maxPrice = prices.reduce((a, b) => Math.max(a, b), -Infinity);
    result.minMaxPrice = [minPrice, maxPrice];

    /*Filtering products by page*/
    let products = allProducts;
    const filterValues = filters.get("page");
    if (filterValues) {
      const pageId = filterValues[0];
      const PRODUCTS_ON_PAGE = 50;
      products = products.slice(
        PRODUCTS_ON_PAGE * (pageId - 1),
        PRODUCTS_ON_PAGE * pageId
      );
    }
    result.products = products;

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
