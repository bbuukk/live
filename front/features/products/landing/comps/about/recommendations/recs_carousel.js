import s from "features/products/landing/comps/about/recommendations/recs_carousel.module.scss";
import ProductCard from "features/products/listing/comps/gallery/card";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const RecsCarousel = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [recs, setRecs] = useState([]);

  useEffect(() => {
    let recsWorker = new Worker("/recsWorker.js");
    recsWorker.postMessage({ id: productId });
    recsWorker.onmessage = (event) => {
      setRecs(event.data);
    };

    return () => {
      if (recsWorker) {
        recsWorker.terminate();
      }
    };
  }, []);

  return (
    <section className={`${s.recs}`}>
      <h3>Також вас можуть зацікавити</h3>
      <div class={`container-fluid `}>
        <div
          class={`row flex-row flex-nowrap overflow-auto ${s.scroll_conteiner}`}
        >
          {recs.map((product) => (
            <div class="col-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecsCarousel;
