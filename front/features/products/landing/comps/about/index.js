import React, { lazy, useEffect, useRef, useState } from "react";
import { Suspense } from "react";
// import { lazyLoad } from "utils/lazyLoad";
const RecsCarousel = lazy(() => import("./recommendations/recs_carousel"));

import Description from "./description";
import ProductCard from "./product-card";
import Characteristics from "../characteristics/characteristics";

const About = ({ product }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div>
      <ProductCard product={product} />
      <div className="d-flex">
        <div className="w-50">
          <Description product={product} />
          <div ref={ref}>
            <Characteristics title={"Характеристики:"} product={product} />
          </div>
        </div>
        {/* <ReviewsList /> */}
      </div>

      {isVisible && <RecsCarousel isVisible={isVisible} />}
    </div>
  );
};

export default About;
