import ListingProductCard from "./card/listing_card";
import s from "./gallery.module.scss";

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  return (
    <section className={`${s.gallery}`}>
      {products.map((product) => {
        return (
          <div key={product._id} className={`${s.col}`}>
            <ListingProductCard
              product={product}
              category={category}
              like={() => {}}
              isLiked={false}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ProductGallery;
