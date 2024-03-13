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
  //todo it works, do it with all products with english brand names
  // const updates = [
  //   { old: "Josera", new: "Йозера" },
  //   { old: "Gourmet", new: "Гурме" },
  //   // { old: "purina-friskies", new: "Purina Friskies" },
  //   // { old: "Purina Felix", new: "Purina Friskies" },
  //   // { old: "Purina Pro Plan", new: "Purina Friskies" },
  //   // { old: "ВісКас", new: "Віскас" },
  //   // { old: "Royal Canin", new: "Ройал Канін" },
  //   // { old: "Trixie", new: "Тріксі" },
  //   // { old: "Carnie", new: "Карні" },
  //   // { old: "Golden Cat", new: "Голден Кет" },
  //   // { old: "Catessy", new: "Катессі" },
  //   // { old: "Pet Daily Cat", new: "Пет Дейлі Кет" },
  //   // { old: "pan-kitpan-pes", new: "Пан Кіт-Пан Пес" },
  // ];
  // for (const update of updates) {
  //   await Product.updateMany(
  //     { "characteristics.Бренд": update.old },
  //     { $set: { "characteristics.Бренд": update.new } }
  //   );
  // }

  // return res.status(200).json({ message: "done" });
  const products = await Product.find({})
    .sort({ createdAt: -1 })

    .select("description name brand price images characteristics")
    .populate("category")
    .exec();

  return res.status(200).json(products);
};

//todo

// we need to get filters from the products that have such filterValues
// and have filterbut get all possible values of filterName that was already there(filtered)

//we need to fetch by filterValues and combine those
//we need to fetch by filterKeys and intersect those with other collections

//we need to find all products that have such filterName and get filters

//todo

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
export const getProductsByCategoryAndFilters = async (req, res) => {
  let { slugCategoryPath, filtersStr } = req.params;

  try {
    let filters = getFilterMapFromStr(filtersStr);

    const categoryPath = untransliterate(unslugify(slugCategoryPath));
    const activeCategory = await category.findOne({
      path: new RegExp(`^${categoryPath.toLowerCase()}$`, "i"),
    });

    if (activeCategory == null) {
      return res
        .status(404)
        .json({ message: "Category with this path is not found" });
    }

    const subcategories = await category
      .find({
        path: new RegExp(categoryPath, "i"),
      })
      .select("name order path imagePath")
      .exec();

    const activeCategoryIds = subcategories.map((category) => category._id);

    let query = Product.find({
      category: { $in: activeCategoryIds },
    })
      .select("name price images characteristics")
      .sort({ createdAt: -1 });

    const mapsToIntersect = [];
    if (filters) {
      for (let [filterName, filterValues] of filters) {
        if (filterName === "page") {
          continue;
        }

        let unslugFilterName = untransliterate(unslugify(filterName));
        unslugFilterName =
          unslugFilterName.charAt(0).toUpperCase() + unslugFilterName.slice(1);

        const unslugFilterValues = filterValues.map((value) => {
          return untransliterate(unslugify(value));
        });

        if (filterName === "price") {
          //for filters
          let productsCharacteristics = await Product.find({
            category: { $in: activeCategoryIds },
          })
            .select("characteristics")
            .sort({ createdAt: -1 })
            .where("price")
            .gte(filterValues[0])
            .lte(filterValues[1])
            .exec();

          const filters = getFiltersMap(
            productsCharacteristics,
            activeCategory
          );

          mapsToIntersect.push(filters);
          //for filters

          query = query
            .where("price")
            .gte(filterValues[0])
            .lte(filterValues[1]);
        } else {
          // for filters
          let productsCharacteristics = await Product.find({
            category: { $in: activeCategoryIds },
          })
            .select("characteristics")
            .sort({ createdAt: -1 })
            .where(`characteristics.${unslugFilterName}`, {
              $in: unslugFilterValues.map(
                (value) => new RegExp(`^${value}$`, "i")
              ),
            })
            .exec();

          const filters = getFiltersMap(
            productsCharacteristics,
            activeCategory
          );

          let allFilterValues = await Product.distinct(
            `characteristics.${unslugFilterName}`,
            {
              category: { $in: activeCategoryIds },
            }
          );

          filters.set(unslugFilterName, allFilterValues);

          mapsToIntersect.push(filters);

          query = query.where(`characteristics.${unslugFilterName}`, {
            $in: unslugFilterValues.map(
              (value) => new RegExp(`^${value}$`, "i")
            ),
          });
        }
      }
    }

    let intersectedFilterMap = intersectMaps(...mapsToIntersect);

    const totalProducts = await query.exec();
    const numPages = Math.max(1, Math.ceil(totalProducts.length / 50));

    let allCategoryProducts = await Product.find({
      category: { $in: activeCategoryIds },
    })
      .select("name price images characteristics")
      .sort({ createdAt: -1 })
      .exec();

    if (intersectedFilterMap.size == 0) {
      let filtersMap = getFiltersMap(allCategoryProducts, activeCategory);
      intersectedFilterMap = filtersMap;
    }

    const prices = totalProducts.map((p) => Number(p.price));
    const minPrice = prices.reduce((a, b) => Math.min(a, b), Infinity);
    const maxPrice = prices.reduce((a, b) => Math.max(a, b), -Infinity);

    let products = totalProducts;

    const filterValues = filters.get("page");
    if (filterValues) {
      const pageId = filterValues[0];
      const PRODUCTS_ON_PAGE = 50;
      products = products.slice(
        PRODUCTS_ON_PAGE * (pageId - 1),
        PRODUCTS_ON_PAGE * pageId
      );
    }

    const activeCategoryNestingLevel = activeCategory.path.split(",").length;

    res.status(200).json({
      category: activeCategory,
      subcategories: subcategories.filter(
        (c) =>
          // all subcategories except activeCategory
          c["name"] !== activeCategory["name"] &&
          //only one level deeper subcategories
          c.path.split(",").length == activeCategoryNestingLevel + 1
      ),
      products,
      numPages,
      minMaxPrice: [minPrice, maxPrice],
      // filtersMap: Array.from(filtersMap.entries()),
      filtersMap: Array.from(intersectedFilterMap.entries()),
    });
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
