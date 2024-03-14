import Product from "../models/product.js";
import category from "../models/category.js";
import mongoose, { get } from "mongoose";
import { slugify, unslugify } from "@bbuukk/slugtrans/slugify";
import {
  transliterate,
  untransliterate,
} from "@bbuukk/slugtrans/transliterate";

export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id).populate("category");

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

//? this is unefficient approach
export const getProductsByIds = async (req, res) => {
  const productIds = req.body;

  try {
    const products = await Product.find({
      _id: { $in: productIds },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })

    .select("description name brand price images characteristics")
    .populate("category")
    .exec();

  return res.status(200).json(products);
};

function getFilterMapFromStr(filtersStr) {
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

//? if categoryPath is not changed from previous time, we can just use
//? product that we already have and filter them

async function getActiveCategoryAndAllSubcategories(categoryPath) {
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

function isOneLevelDeeper(category, activeCategory) {
  const ONE_LEVEL_DEEPER = 1;
  const activeCategoryNestingLevel = activeCategory.path.split(",").length;
  const categoryNestingLevel = category.path.split(",").length;
  return categoryNestingLevel === activeCategoryNestingLevel + ONE_LEVEL_DEEPER;
}

function getOriginalFilterNameAndValues(filterName, filterValues) {
  let originalFilterName = untransliterate(unslugify(filterName));
  originalFilterName =
    originalFilterName.charAt(0).toUpperCase() + originalFilterName.slice(1);

  const originalFilterValues = filterValues.map((value) => {
    return untransliterate(unslugify(value));
  });

  return { originalFilterName, originalFilterValues };
}

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

function getFiltersMap(products, activeCategory) {
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

function intersectArrays(...arrays) {
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

function intersectMaps(...maps) {
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

export const createProduct = async (req, res) => {
  const {
    brand,
    name,
    category,
    characteristics,
    price,
    left,
    starRating,
    description,
    imageUrl,
    // code,
    // barcode,
  } = req.body;

  try {
    const product = await Product.create({
      brand,
      name,
      category,
      price,
      left,
      characteristics,
      starRating,
      description,
      imageUrl,
      //? todo
      // code,
      // barcode,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createProducts = async (req, res) => {
  const products = req.body;

  try {
    const createdProducts = await Product.insertMany(products);
    res.status(200).json(createdProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  await Product.deleteOne({ _id: id });

  res.status(200).json(result.product);
};

// export const deleteAllProducts = async (req, res) => {
//   try {
//     await Product.deleteMany();
//     res.status(200).json({ message: "All products deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting products" });
//   }
// };
