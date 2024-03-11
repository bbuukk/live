import s from "./filters_accordion.module.scss";

import CheckBox from "./checkbox";
import { Accordion } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "store/filtersSlice";
import { useEffect, useState } from "react";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { setFilter } from "store/filtersSlice";

const FilterChecks = ({ filterLabel, options, idx }) => {
  const { filters } = useSelector((state) => state.filters);
  const slugFilterLabel = slugify(transliterate(filterLabel));
  const [activeOptions, setActiveOptions] = useState(
    filters[slugFilterLabel] || []
  );

  console.log("🚀 ~ filters:", filters);

  const dispatch = useDispatch();
  function handleConfirm(event, newValue) {
    dispatch(
      setFilter({
        filterName: slugify(transliterate(filterLabel)),
        filterValue: [minMaxPrice[0], minMaxPrice[1]],
      })
    );
  }

  useEffect(() => {
    if (activeOptions.length > 0) {
      dispatch(
        setFilter({ filterName: slugFilterLabel, filterValue: activeOptions })
      );
    }
  }, [activeOptions]);

  function handleChange(isChecked, option) {
    const slugOption = slugify(transliterate(option));
    console.log("🚀 ~ isChecked:", isChecked);
    if (isChecked) {
      setActiveOptions([...activeOptions, slugOption]);
    } else {
      setActiveOptions(
        activeOptions.filter((activeOption) => activeOption !== slugOption)
      );
    }
  }

  return (
    <Accordion.Item
      className={`${s.accordion_item}`}
      eventKey={idx}
      // bsPrefix="filter_acc_item"
    >
      <Accordion.Header>{filterLabel}</Accordion.Header>
      <Accordion.Body>
        {Array.from(options).map((option) => {
          return (
            <div key={option}>
              <CheckBox
                id={option}
                label={option}
                checked={false}
                handleChange={handleChange}
              />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
