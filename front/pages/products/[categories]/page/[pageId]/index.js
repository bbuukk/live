import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import SubcategoriesGallery from "root/features/products/listing/comps/subcategories/gallery";

import { addToCategoriesPath } from "root/store/categoriesSlice";

const Listing = ({ data: { category, subcategories, products } }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [activeProducts, setActiveProducts] = useState(products);
  // const [activeCategory, setActiveCategory] = useState(category);
  // const [activeSubcategories, setActiveSubcategories] = useState(subcategories);

  return (
    <>
      {!isLoading && (
        <div className="mt-3 ">
          <div className="mx-5">
            <>
              <ProductHeader category={category} />
              <SubcategoriesGallery subcategories={subcategories} />
            </>

            <div className="mt-5">
              <SortGroup />
            </div>
          </div>

          <hr className="mt-2 mb-4 splitter " />

          <div className="d-flex ms-3 me-5">
            <div className="me-3">
              {/* <ProductFilter products={activeProducts} /> */}
            </div>

            <ProductGallery
              activeProducts={products}
              activeCategory={category}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;

export async function getStaticPaths() {
  const fetchedCategories = await axios.get("/categories");
  const categories = fetchedCategories.data;

  const paths = [];

  for (const category of categories) {
    const slugPath = slugify(transliterate(category.path));

    const ALL_PAGES = 0;
    const res = await axios.get(`/products/${slugPath}/page/${ALL_PAGES}`);
    const { products } = res.data;

    let numPages = Math.ceil(products.length / 50);
    if (numPages == 0) {
      numPages += 1;
    }

    // Generate paths for each page
    for (let i = 1; i <= numPages; i++) {
      paths.push({
        params: { categories: `${slugPath}`, pageId: `${i}` },
      });
    }
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const categoryPath = params.categories;
  const pageId = params.pageId;

  const res = await axios.get(`/products/${categoryPath}/page/${pageId}`);
  const data = res.data;

  return {
    props: { data },
  };
}
