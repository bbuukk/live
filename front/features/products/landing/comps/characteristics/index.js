import Navigation from "features/products/landing/comps/layout/navigation";
import Characteristics from "features/products/landing/comps/characteristics/characteristics";
import SmallCard from "features/products/landing/comps/characteristics/small_card";
import SmallBuyArea from "features/products/landing/comps/characteristics/small_buy_area";
import { useSelector } from "react-redux";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import DecorLine from "comps/decor/decor_line";
import Breadcrumbs from "comps/navigation/breadcrumbs";
import { useRouter } from "next/router";
import LandingProuductLayout from "features/products/landing/comps/layout/layout";

//todo add Head like in about page
const ProductCharacteristics = ({ product }) => {
  return (
    <>
      <DecorLine />
      <div className="container">
        <div className="d-flex justify-content-between">
          <Characteristics
            title={`Характеристики ${product.name}`}
            product={product}
          />
          <div className="d-flex flex-column gap-2">
            <SmallCard product={product} />
            <SmallBuyArea product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCharacteristics;
