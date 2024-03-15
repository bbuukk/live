import s from "./product-header.module.scss";
import Breadcrumbs from "comps/breadcrumbs";

const ProductHeader = ({ category }) => {
  return (
    <>
      <div className={`${s.product_header}`}>
        <Breadcrumbs category={category} />
        <h2>{category.name}</h2>
      </div>
    </>
  );
};

export default ProductHeader;
