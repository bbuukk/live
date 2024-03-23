import FiltersAccordion from "features/products/listing/comps/filter/filters_accordion/filters_accordion";
import ProductGallery from "./comps/gallery/gallery";
import ProductsPagination from "./comps/gallery/pagination";
import SortGroup from "./comps/filter/sort-group";
import FiltersOffcanvasToggler from "features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas_toggler";

import s from "./product_listing_body.module.scss";
import FiltersOffcanvas from "./comps/filter/filiters_offcanvas/filters_offcanvas";

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
    <>
      <FiltersOffcanvas
        id="filtersOffcanvas"
        filters={filtersMap}
        minMaxPrice={minMaxPrice}
        currentMinMaxPrice={currentMinMaxPrice}
      />
      <div className={`${s.body}`}>
        <div className={`${s.filters_offcanvas_toggler}`}>
          <FiltersOffcanvasToggler id="filtersOffcanvas" />
        </div>
        <div className={`${s.sort_group}`}>
          <SortGroup />
        </div>
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
    </>
  );
};

export default ProductListingBody;
