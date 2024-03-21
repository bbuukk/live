import Image from "next/image";
import s from "./card.module.scss";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { setActiveCategory } from "store/categoriesSlice";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const SubcategoryCard = ({ category }) => {
  const { name, imagePath } = category;

  function saveActiveCategory() {
    if (typeof window !== "undefineid") {
      localStorage.setItem("activeCategory", JSON.stringify(category));
    }
  }

  const categoryPathSlug = `/products/${slugify(
    transliterate(category.path)
  )}/page=1`;

  return (
    <Link
      href={categoryPathSlug}
      as={categoryPathSlug}
      onMouseDown={saveActiveCategory}
      className={`${s.card}`}
    >
      <Image
        src={imagePath}
        width={150}
        height={150}
        alt="subcategory image"
        className={`${s.image}`}
        priority
      />
      <p className={`${s.name}`}> {name}</p>
    </Link>
  );
};

export default SubcategoryCard;
