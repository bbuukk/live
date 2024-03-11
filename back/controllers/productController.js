import Product from "../models/product.js";
import category from "../models/category.js";
import mongoose from "mongoose";
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

  res.status(200).json(products);
};

export const getProductsByCategoryAndFilters = async (req, res) => {
  let { slugCategoryPath, filtersStr } = req.params;

  //? todo research if we store label on category and slug on category we would not need to unslugify
  try {
    let filters = null;
    if (filtersStr) {
      filters = new Map();
      filtersStr.split(";").forEach((fs) => {
        const [filterName, filterValue] = fs.split("=");
        filters.set(filterName, [...filterValue.split(",")]);
      });
    }

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
      .select("name brand price images characteristics")
      .sort({ createdAt: -1 })
      .populate("category");

    if (filters) {
      for (let [filterName, filterValues] of filters) {
        if (filterName === "page") {
          // Support for multiple pages
          const pageId = filterValues[0];
          const PRODUCTS_ON_PAGE = 50;
          query = query
            .skip(PRODUCTS_ON_PAGE * (pageId - 1))
            .limit(PRODUCTS_ON_PAGE);
        } else if (filterName === "price") {
          query = query
            .where("price")
            .gte(filterValues[0])
            .lte(filterValues[1]);
        } else {
          const unslugFilterName = untransliterate(unslugify(filterName));
          const unslugFilterValues = filterValues.map((value) => {
            return untransliterate(unslugify(value));
          });
          // console.log("🚀 ~ unslugFilterName:", unslugFilterName);
          // console.log("🚀 ~ unslugFilterValues:", unslugFilterValues);
          query = query
            .where("characteristics")
            .elemMatch({ [unslugFilterName]: { $in: unslugFilterValues } });
        }
        //  else if (filterName === "characteristics") {
        //   query = query.where("characteristics").in(filterValues);
        // }
      }
    }
    const products = await query.exec();

    const totalDocuments = await Product.find({
      category: { $in: activeCategoryIds },
    }).countDocuments();
    const numPages = Math.max(1, Math.ceil(totalDocuments / 50));

    const activeCategoryLevel = activeCategory.path.split(",").length;

    res.status(200).json({
      category: activeCategory,
      subcategories: subcategories.filter(
        (c) =>
          // all subcategories except activeCategory
          c["name"] !== activeCategory["name"] &&
          //only one level deeper subcategories
          c.path.split(",").length == activeCategoryLevel + 1
      ),
      products,
      numPages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
