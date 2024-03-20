import Link from "next/link";
import s from "./rating.module.scss";
import lcs from "../listing_card.module.scss";
import Image from "next/image";
import StarRating from "./star_rating";

//use rating from product
const ProductRating = ({ product, productUrl }) => {
  return (
    <section className={` ${lcs.rating}`}>
      <Link className={`${s.rating}`} href={productUrl("characteristics")}>
        <StarRating rating={4.1} />
        <i className="bi bi-chat-left-text" />
        <p>{10}</p>
      </Link>
    </section>
  );
};

export default ProductRating;
