import { useRouter } from "next/router";

import About from "features/products/landing/comps/about/index";
import Characteristics from "features/products/landing/comps/characteristics/index";

// import ReviewsList from "features/products/landing/comps/reviews-list";

import LandingProuductLayout from "features/products/landing/comps/layout/layout";
import { useFindCategoryByPath } from "hooks/useFindCategoryByPath";
import { useFindProductById } from "hooks/useFindProductById";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";
import Head from "next/head";
import { setActiveIndi } from "store/productsSlice";
import axios from "axios";
import Navigation from "features/products/landing/comps/layout/navigation";
import Breadcrumbs from "comps/breadcrumbs";
import { stripHtmlTags } from "utils/stripHtmlTags";

//todo fix we take first category available on product, but it can be not the category user was in
const Landing = ({ product, activeTab }) => {
  return (
    <>
      <Head>
        <title>{product.name} в інтернет-магазині Живий світ</title>
        <meta
          name="description"
          content={`${product.name}\n\n${stripHtmlTags(
            product.description.substring(0, 110)
          )}...`}
        />
      </Head>
      <div className="">
        <Breadcrumbs category={product.category[0]} />
        <Navigation activeTab={activeTab} />
      </div>
      {activeTab == "about" && <About product={product} />}
      {activeTab == "characteristics" && <Characteristics product={product} />}
      {/* {activeTab == "reviews" && <Reviews product={product} />} */}
    </>
  );
};

export default Landing;

export async function getServerSideProps({ params }) {
  const { productSlug, productId, activeTab } = params;

  const res = await axios.get(`/products/product/${productId}`);

  if (activeTab != "about" && activeTab != "characteristics") {
    return {
      notFound: true,
    };
  }

  const product = res.data;

  return {
    props: {
      product,
      activeTab,
    },
  };
}
