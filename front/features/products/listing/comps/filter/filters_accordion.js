import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./filter_item";
import s from "./filters_accordion.module.scss";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

const FiltersAccordion = ({
  filters,
  minMaxPrice: minMax,
  currentMinMaxPrice: currentMinMax,
}) => {
  //todo sometimes it changes filterValues when another one is chosen
  //todo fix all remaining english options in filters
  //todo why filters render in wrong order, brand got to be first

  const router = useRouter();
  const { categoryPath } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const [minMaxPrice, setMinMaxPrice] = useState(minMax);

  useEffect(() => {
    setIsLoading(true);
    setMinMaxPrice(minMax);
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
                <PriceSlider minMax={minMax} currentMinMax={currentMinMax} />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {filters.map(([filterLabel, options], idx) => {
            return (
              <div key={filterLabel} className={`${s.filter_checks}`}>
                <FilterChecks
                  filterLabel={filterLabel}
                  options={options}
                  idx={idx + 1}
                />
              </div>
            );
          })}
        </Accordion>
      )}
    </search>
  );
};

export default FiltersAccordion;
