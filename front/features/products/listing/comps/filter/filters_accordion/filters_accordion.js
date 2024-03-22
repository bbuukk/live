import PriceSlider from "./price-slider";
import FilterChecks from "./filter_item";
import s from "./filters_accordion.module.scss";
import Accordion from "comps/accordion/accordion";
import AccordionItem from "comps/accordion/accordion_item";

const FiltersAccordion = ({
  filters,
  minMaxPrice: minMax,
  currentMinMaxPrice: currentMinMax,
}) => {
  return (
    <search>
      <Accordion id={"filtersAccordion"}>
        <AccordionItem id={"priceSlicerAccItem"} label="Ціна" show={true}>
          <PriceSlider minMax={minMax} currentMinMax={currentMinMax} />
        </AccordionItem>
        {filters.map(([filterLabel, options], idx) => {
          return (
            <AccordionItem
              key={filterLabel}
              id={filterLabel}
              label={filterLabel}
              show={true}
            >
              <FilterChecks
                filterLabel={filterLabel}
                options={options}
                idx={idx + 1}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </search>
  );
};

export default FiltersAccordion;

// const FiltersAccordion = ({
//   filters,
//   minMaxPrice: minMax,
//   currentMinMaxPrice: currentMinMax,
// }) => {
//   //todo sometimes it changes filterValues when another one is chosen
//   //todo fix all remaining english options in filters
//   //todo why filters render in wrong order, brand got to be first
//   //todo price does not refresh on categoryPath change

//   return (
//     <Accordion
//       className={`${s.filter_accordion}`}
//       defaultActiveKey={[0, 1, 2, 3, 4]}
//       alwaysOpen
//       flush
//     >
//       <Accordion.Item
//         className={`${s.accordion_item} ${s.price_slider_item}`}
//         eventKey={0}
//       >
//         <Accordion.Header>Ціна</Accordion.Header>
//         <Accordion.Body>
//           <PriceSlider minMax={minMax} currentMinMax={currentMinMax} />
//         </Accordion.Body>
//       </Accordion.Item>
//       {filters.map(([filterLabel, options], idx) => {
//         return (
//           <FilterChecks
//             key={filterLabel}
//             filterLabel={filterLabel}
//             options={options}
//             idx={idx + 1}
//           />
//         );
//       })}
//     </Accordion>
//   );
// };

// export default FiltersAccordion;
