import { useDispatch, useSelector } from "react-redux";
import s from "./card.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const Card = ({ category, subcategories }) => {
  const categoryPathSlug = (path) => {
    return `/products/${slugify(transliterate(path))}/page=1`;
  };

  return (
    <div className={`${s.cat_card}`}>
      <Link href={categoryPathSlug(category.path)}>
        <Image
          className={``}
          src={category.imagePath}
          alt="Category image"
          width={300}
          height={150}
          priority
        />
        <h2 className={`${s.naming} `}>{category.name}</h2>
      </Link>

      <ul className={`${s.subcat_list}`}>
        {subcategories
          .sort((a, b) => a.order - b.order)
          .map(({ _id, path, name }, index) => {
            return (
              <li key={_id}>
                <Link href={categoryPathSlug(path)}>
                  {index == 4 ? `${name}` : `${name}`}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Card;
