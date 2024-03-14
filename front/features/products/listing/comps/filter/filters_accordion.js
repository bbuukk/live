import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./filter_item";
import s from "./filters_accordion.module.scss";
import { useEffect, useRef, useState } from "react";
import { useGetFilters } from "../../hooks/useGetFilters";
import { useRouter } from "next/router";

const FiltersAccordion = ({ products, category }) => {
  //todo make those filters active that are in url
  //todo filters got to recieve all products from filteration not only 50 first products
  // - hardcore filters for every category and get get minmax price in prop for page on every call
  //! todo make filters options only cyrylic
  //todo fix breadcrumps and pagination components navigations

  const router = useRouter();
  const { categoryPath } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const { getFilters, getMinMaxPrice } = useGetFilters();
  const [minMaxPrice, setMinMaxPrice] = useState(getMinMaxPrice(products));
  const [filters, setFilters] = useState(getFilters(products, category));

  useEffect(() => {
    // setMinMaxPrice([min, max]);
    // setFilters(filters);
    // setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    // console.log("filters update");
    // console.log(categoryPath);
    setIsLoading(true);
    setMinMaxPrice(getMinMaxPrice(products));
    setFilters(getFilters(products, category));
    setIsLoading(false);
  }, [categoryPath]);

  //todo
  // fetch products with query params
  return (
    <search className={`${s.filters_container}`}>
      {!isLoading && (
        <Accordion
          className={`${s.filter_accordion}`}
          defaultActiveKey={[0, 1, 2, 3, 4]}
          alwaysOpen
          flush
          // onSelect={() => {
          //   console.log("selecteds");
          // }}
          // bsPrefix={"acc"}
        >
          <Accordion.Item
            className={`${s.accordion_item} ${s.price_slider_item}`}
            eventKey={0}
          >
            <Accordion.Header>Ціна</Accordion.Header>
            <Accordion.Body>
              <div className={`${s.price_slider}`}>
                <PriceSlider
                  minPrice={minMaxPrice[0]}
                  maxPrice={minMaxPrice[1]}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {Array.from(filters, ([filterLabel, options], idx) => (
            <div key={filterLabel} className={`${s.filter_checks}`}>
              <FilterChecks
                filterLabel={filterLabel}
                options={options}
                idx={idx + 1}
              />
            </div>
          ))}
        </Accordion>
      )}
    </search>
  );
};

export default FiltersAccordion;
