import Link from "next/link";
import s from "./card.module.scss";
import Image from "next/image";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

//todo make link dry

const ProductCard = ({ product, category, like, isLiked }) => {
  // console.log(product);
  // console.log(product.brand);
  const productUrl = (activeTab) =>
    `/product/${slugify(transliterate(product.name))}/${
      product._id
    }/${activeTab}`;

  const saveActiveProductInfo = () => {};

  return (
    <div className={`${s.product_card} `}>
      <button
        className={`${s.like_button} btn`}
        onMouseDown={() => like(product._id)}
      >
        {!isLiked && <i className="bi bi-heart" />}
        {isLiked && <i className={`bi bi-heart-fill ${s.liked}`} />}
      </button>

      <Link
        href={productUrl("about")}
        className={`${s.image_link}`}
        onMouseDown={saveActiveProductInfo}
      >
        <Image
          className={`${s.image}`}
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          alt="product image"
          width={100}
          height={100}
          priority
        />
      </Link>

      <Link
        href={productUrl("about")}
        className={`${s.name}`}
        onMouseDown={saveActiveProductInfo}
      >
        {product.name}
      </Link>

      <Link
        href={productUrl("characteristics")}
        className={`${s.rating}`}
        onMouseDown={saveActiveProductInfo}
      >
        {/* //todo get back starRating */}
        {/* <StarRating /> */}
        <p className={`${s.amount_reviews}`}>
          <i className="bi bi-chat-left-text"></i>
          <span>{10}</span>
        </p>
      </Link>

      <div className={`${s.buy_info}`}>
        <p className={`${s.price}`}>
          {product.price} <span>₴</span>
        </p>

        <button className={`${s.buy_button}`}>
          <i className="bi bi-cart4"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

const StarRating = ({ ratingNumber }) => {
  let starArray = [];
  let star = <i className={`bi bi-star-fill  ${s.star}`} />;
  starArray.push(...new Array(5).fill(star));

  return <div className={`${s.stars}`}>{starArray}</div>;
};
