import ListingProductCard from "./card/listing_card";

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  return (
    <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
      {products.map((product) => {
        return (
          <div key={product._id} className="col">
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
