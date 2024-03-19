import Link from "next/link";
import s from "./listing_card.module.scss";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import ProductFigure from "./figure";
import ProductRating from "./rating";
import BuyInfo from "./buy_info";
import LikeButton from "./like_btn";

const ListingProductCard = ({ product, like, isLiked }) => {
  const productUrl = (activeTab) =>
    `/product/${slugify(transliterate(product.name))}/${
      product._id
    }/${activeTab}`;

  return (
    <article className={`${s.product_card} `}>
      <LikeButton isLiked={false} />
      <ProductFigure product={product} productUrl={productUrl} />
      <ProductRating product={product} productUrl={productUrl} />
      <BuyInfo product={product} />
    </article>
  );
};

export default ListingProductCard;
