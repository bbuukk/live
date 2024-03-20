import Image from "next/image";
import Link from "next/link";
import s from "./figure.module.scss";
import lcs from "../listing_card.module.scss";

const ProductFigure = ({ product, productUrl }) => {
  return (
    <Link className={`${lcs.figure}`} href={productUrl("about")}>
      <figure className={`${s.figure} `}>
        <Image
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          alt="product image"
          width={0}
          height={0}
          priority
        />
        <figcaption>{product.name}</figcaption>
      </figure>
    </Link>
  );
};

export default ProductFigure;
