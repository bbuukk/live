import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductGallery from "features/products/listing/comps/gallery/gallery";
import ProductHeader from "features/products/listing/comps/product-header";
import FiltersAccordion from "features/products/listing/comps/filter/filters_accordion";
import SortGroup from "features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import SubcategoriesGallery from "features/products/listing/comps/subcategories/gallery";

import { addToCategoriesPath } from "store/categoriesSlice";
import Head from "next/head";
import ProductsPagination from "features/products/listing/comps/gallery/pagination";

const Listing = ({ data: { category, subcategories, products, numPages } }) => {
  const router = useRouter();
  const { pageId } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  // const [activeProducts, setActiveProducts] = useState(products);
  // const [activeCategory, setActiveCategory] = useState(category);
  // const [activeSubcategories, setActiveSubcategories] = useState(subcategories);

  return (
    <>
      <Head>
        <title> Живий світ | {category.path}</title>
        <meta name="description" content={`Живий Світ | ${category.path}`} />
      </Head>
      {!isLoading && (
        <div className="mt-2 ">
          <div className="mx-5">
            <>
              <ProductHeader category={category} />
              <SubcategoriesGallery subcategories={subcategories} />
            </>

            <div className="mt-5">{/* <SortGroup /> */}</div>
          </div>

          {/* <hr className="mt-2 mb-4 horizontal_splitter " /> */}

          <div className="d-flex me-5">
            <FiltersAccordion products={products} category={category} />

            <div>
              <ProductGallery
                activeProducts={products}
                activeCategory={category}
              />
              <ProductsPagination numPages={numPages} activePageId={pageId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;

async function getNumOfPages(slugCategoryPath) {
  const res = await axios.get(`/products/${slugCategoryPath}`);
  const { products } = res.data;

  let numPages = Math.ceil(products.length / 50);
  if (numPages == 0) {
    numPages += 1;
  }
  return numPages;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const slugCategoryPath = params.categoryPath;
  const filtersStr = params.filters;

  // const filters = params.filters.split(";").map((filterString) => {
  //   const [filterName, filterValue] = filterString.split("=");
  //   return { filterName, filterValue };
  // });

  const res = await axios.get(`/products/${slugCategoryPath}/${filtersStr}`);
  const data = res.data;

  const filterStrWithNoPage = filtersStr.replace(/page=\d+;/, "");

  const numPages = await getNumOfPages(slugCategoryPath, filterStrWithNoPage);
  //todo make it a minutes for production

  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: { data: { ...data, numPages }, revalidate: HALF_AN_HOUR_IN_SECONDS },
  };
}
