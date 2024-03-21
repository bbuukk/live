import Image from "next/image";
import Link from "next/link";

import s from "./card.module.scss";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const SubcategoryCard = ({ category }) => {
  const { name, imagePath } = category;

  const categoryPathSlug = `/products/${slugify(
    transliterate(category.path)
  )}/page=1`;

  return (
    <Link href={categoryPathSlug} as={categoryPathSlug} className={`${s.card}`}>
      <Image
        src={imagePath}
        width={150}
        height={150}
        alt="subcategory image"
        priority
      />
      <div>
        <p> {name}</p>
      </div>
    </Link>
  );
};

export default SubcategoryCard;
