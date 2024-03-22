import FiltersAccordion from "features/products/listing/comps/filter/filters_accordion/filters_accordion";
import ProductGallery from "./comps/gallery/gallery";
import ProductsPagination from "./comps/gallery/pagination";

import s from "./product_listing_body.module.scss";

const ProductListingBody = ({
  filtersMap,
  minMaxPrice,
  currentMinMaxPrice,
  products,
  category,
  numPages,
  page,
}) => {
  return (
    <div className={`${s.body}`}>
      <div className={`${s.filters}`}>
        <FiltersAccordion
          filters={filtersMap}
          minMaxPrice={minMaxPrice}
          currentMinMaxPrice={currentMinMaxPrice}
        />
      </div>

      <div className={`${s.gallery}`}>
        <ProductGallery activeProducts={products} activeCategory={category} />
        <ProductsPagination numPages={numPages} activePageId={page} />
      </div>
    </div>
  );
};

export default ProductListingBody;
