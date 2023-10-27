import { useRouter } from "next/router";

import Navigation from "@/features/products/comps/mutual/navigation";
import Characteristics from "@/features/products/comps/mutual/characteristics";

const Product = () => {
  const router = useRouter();

  return (
    <>
      <div className="mt-5">
        <Navigation
          activePage={"characteristics"}
          productId={router.query.productId}
        />
      </div>
      <div>
        <Characteristics />
      </div>
    </>
  );
};

export default Product;
