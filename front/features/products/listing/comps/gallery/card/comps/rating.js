import Link from "next/link";
import s from "./rating.module.scss";
import lcs from "../listing_card.module.scss";

const ProductRating = ({ product, productUrl }) => {
  return (
    <section className={`${s.rating} ${lcs.rating}`}>
      <Link href={productUrl("characteristics")}>
        <i className="bi bi-chat-left-text"></i>
        <p>{10}</p>
      </Link>
    </section>
  );
};

export default ProductRating;
