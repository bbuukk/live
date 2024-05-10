import FiltersAccordion from 'features/products/listing/comps/filter/filters_accordion/filters_accordion'

import ProductGallery from './gallery/gallery'
import ProductsPagination from './gallery/pagination/pagination'
import SortGroup from './filter/sort-group'
import FiltersOffcanvasToggler from 'features/products/listing/comps/filter/filiters_offcanvas/filters_offcanvas_toggler'

import s from './product_listing_body.module.scss'
import FiltersOffcanvas from './filter/filiters_offcanvas/filters_offcanvas'
import Selected from './filter/selected'
import NoProductYet from '#root/comps/warnings/no_products.js'

const ProductListingBody = ({
  data: {
    filtersMap,
    minMaxPrice,
    products,
    productsCount,
    category,
    numPages,
    page,
  },
}) => {
  return (
    <>
      {productsCount > 0 ? (
        <>
          <FiltersOffcanvas
            filters={filtersMap}
            minMaxPrice={minMaxPrice}
            productsCount={productsCount}
          />
          <div className={`${s.body}`}>
            <div className={`${s.filters_offcanvas_toggler}`}>
              <FiltersOffcanvasToggler />
            </div>
            <div className={`${s.selected}`}>
              <Selected productsCount={productsCount} />
            </div>
            <div className={`${s.sort_group}`}>
              <SortGroup />
            </div>
            <div className={`${s.filters_decor_line}`}></div>
            <div className={`${s.filters}`}>
              <FiltersAccordion
                filters={filtersMap}
                minMaxPrice={minMaxPrice}
              />
            </div>

            <div className={`${s.gallery}`}>
              <div className={`${s.products}`}>
                <ProductGallery
                  activeProducts={products}
                  activeCategory={category}
                />
              </div>
              <ProductsPagination numPages={numPages} activePageId={page} />
            </div>
          </div>
        </>
      ) : (
        <div className={`${s.no_prodcuts}`}>
          <NoProductYet />
        </div>
      )}
    </>
  )
}

export default ProductListingBody
