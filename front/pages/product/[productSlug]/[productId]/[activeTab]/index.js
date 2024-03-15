

import About from "features/products/landing/comps/about/index";
import Characteristics from "features/products/landing/comps/characteristics/index";

import Head from "next/head";
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
      
      {/* padding: 0.5rem 0 1.5rem 0; */}
      <div className="mx-5 pt-3">

        <Breadcrumbs category={product.category[0]} />
      </div>
      
        <Navigation activeTab={activeTab} />
      
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
