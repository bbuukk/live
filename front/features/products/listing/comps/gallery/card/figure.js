import Image from "next/image";
import Link from "next/link";
import s from "./listing_card.module.scss";

const ProductFigure = ({ product, productUrl }) => {
  return (
    <Link href={productUrl("about")} className={`${s.figure}`}>
      <figure>
        <Image
          src={
            //todo implement displaying many images on product
            product.images && product.images[0]
          }
          alt="product image"
          width={100}
          height={100}
          priority
        />
        <figcaption>{product.name}</figcaption>
      </figure>
    </Link>
  );
};

export default ProductFigure;
