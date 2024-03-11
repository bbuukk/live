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
import { useGenFilterStr } from "hooks/genFilterStr";
import { setFilters } from "store/filtersSlice";
import { useGetFilterMapFromStr } from "hooks/useGetFilterMapFromStr";

const Listing = ({
  data: { category, subcategories, products, numPages, page },
}) => {
  const router = useRouter();
  const { categoryPath, filtersStr } = router.query;

  const dispatch = useDispatch();
  const { getFilterMapFromStr } = useGetFilterMapFromStr();
  const filtersMap = getFilterMapFromStr(filtersStr);
  dispatch(setFilters(filtersMap));

  const { filters } = useSelector((state) => state.filters);

  const { genFiltersStr } = useGenFilterStr();
  useEffect(() => {
    console.log(filters);
    const filtersString = genFiltersStr(filters);
    console.log("🚀 ~ filterStr:", filtersString);
    // router.push(`/products/${categoryPath}/${filterStr}`, undefined, {
    //   shallow: true,
    // });
  }, [filters]);

  //todo collect filters only on first render of page
  // const [isLoading, setIsLoading] = useState(false);
  // const [activeProducts, setActiveProducts] = useState(products);
  // const [activeCategory, setActiveCategory] = useState(category);
  // const [activeSubcategories, setActiveSubcategories] = useState(subcategories);

  return (
    <>
      <Head>
        <title>{`Живий світ | ${category.path}`}</title>
        <meta name="description" content={`Живий Світ | ${category.path}`} />
      </Head>
      {/* {!isLoading && ( */}
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
            <ProductsPagination numPages={numPages} activePageId={page} />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Listing;

export async function getServerSideProps(context) {
  const { categoryPath, filtersStr } = context.params;

  //todo filter validation
  const res = await axios.get(`/products/${categoryPath}/${filtersStr}`);
  const data = res.data;

  let page = 1;
  const match = filtersStr.match(/page=(\d+)/);
  if (match) {
    page = filtersStr.match(/page=(\d+)/)[1];
  }

  //todo make it a minutes for production
  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: { data: { ...data, page }, revalidate: HALF_AN_HOUR_IN_SECONDS },
  };
}
