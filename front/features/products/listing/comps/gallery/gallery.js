import ListingProductCard from "./card/listing_card";
import s from "./gallery.module.scss";

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  return (
    <div className="row gy-4">
      {products.map((product) => {
        return (
          <div
            key={product._id}
            //todo why do we need to use g-4 here? refactor and delete
            className={`col col-12 col-sm-6 col-md-4 col-lg-3 ${s.col}`}
          >
            <ListingProductCard
              product={product}
              category={category}
              like={() => {}}
              isLiked={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductGallery;
