import CategoriesGallery from "features/categories/comps/gallery";
import Head from "next/head";
import axios from "axios";

const Home = ({ flatCategoryMap }) => {
  //todo useEffect to set categoriesPath of user to []

  return (
    <>
      <Head>
        <title> Живий світ | Головна сторінка </title>
        <meta
          name="description"
          content="Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин"
        />
      </Head>

      <div className="mt-4">
        <div className="my-5">
          <CategoriesGallery flatCategoryMap={flatCategoryMap} />
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await axios.get(`/categories`);
  const categories = res.data;

  const rootCategories = categories
    .filter((category) => category.path.split(",").length == 1)
    .sort((a, b) => a.order - b.order);

  //we cannot return js map from getStaticProps, use array
  const flatCategoryMap = [];

  rootCategories.forEach((c) => {
    const pathString = c.path;
    const regex = new RegExp(`^${pathString},[^,]+$`);
    const subcategories = categories
      .filter((c) => {
        return c.path.match(regex) && c.path !== pathString;
      })
      .slice(0, 5);
    flatCategoryMap.push(c, ...subcategories);
  });

  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: {
      flatCategoryMap: flatCategoryMap,
      revalidate: HALF_AN_HOUR_IN_SECONDS,
    },
  };
}
