import s from "./breadcrumbs.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import { useDispatch, useSelector } from "react-redux";
import { useFindCategoryByPath } from "../hooks/useFindCategoryByPath";

const Breadcrumbs = ({ category }) => {
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );
  //todo fix using categories from redux, it should not be fetched on start of application

  const { findCategoryByPath } = useFindCategoryByPath();

  return (
    <>
      <nav className={`${s.breadcrumbs} mt-3`} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className={`breadcrumb-item ms-5`}>
            <Link className="link" href="/">
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
                    className="link"
                    href={{
                      pathname: `/products/${categoryPathSlug}/page=1`,
                      query: {
                        category: JSON.stringify(
                          findCategoryByPath(clickedCategoryPath, allCategories)
                        ),
                      },
                    }}
                    as={`/products/${categoryPathSlug}/page=1`}
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
