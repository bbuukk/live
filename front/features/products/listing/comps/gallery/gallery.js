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
          <ListingProductCard
            key={product._id}
            product={product}
            category={category}
            like={() => {}}
            isLiked={false}
          />
        );
      })}
    </section>
  );
};

export default ProductGallery;
