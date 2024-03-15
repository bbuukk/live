import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import { useSelector } from "react-redux";


const Breadcrumbs = ({ category }) => {
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );
  
  return (
    <>
      <nav className={`${s.breadcrumbs}`} aria-label="Category path breadcrumbs">
        <ol className="breadcrumb">
          <li>
            <Link href="/">
              Головна
            </Link>
          </li>

          {allCategories &&
            category.path.split(",").map((pathPart, index, pathParts) => {
              const clickedCategoryIndex = index + 1;
              const clickedCategoryPath = pathParts
                .slice(0, clickedCategoryIndex)
                .join(",");
              const categoryPathSlug = slugify(
                transliterate(clickedCategoryPath)
              );

              const isActiveCategory = index === pathParts.length - 1;
              return (
                <li
                  className={`breadcrumb-item ${
                    isActiveCategory ? "active" : ""
                  }`}
                  key={pathPart}
                >
                  <Link
                    href={`/products/${categoryPathSlug}/page=1`}
                  >
                    {pathPart}
                  </Link>
                </li>
              );
            })}
        </ol>
      </nav>
    </>
  );
};
          

export default Breadcrumbs;
