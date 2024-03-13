import s from "./filters_accordion.module.scss";

import CheckBox from "./checkbox";
import { Accordion } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "store/filtersSlice";
import { useEffect, useState } from "react";
import { transliterate } from "@bbuukk/slugtrans/transliterate";
import { slugify } from "@bbuukk/slugtrans/slugify";
import { setFilter, deleteFilter } from "store/filtersSlice";

const FilterChecks = ({ filterLabel, options, idx }) => {
  const { filters } = useSelector((state) => state.filters);
  console.log("🚀 ~ filters:", filters);

  const slugFilterLabel = slugify(transliterate(filterLabel));
  const [activeOptions, setActiveOptions] = useState(filters[slugFilterLabel]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (activeOptions != null) {
      if (activeOptions.length > 0) {
        dispatch(
          setFilter({ filterName: slugFilterLabel, filterValue: activeOptions })
        );
      } else {
        dispatch(deleteFilter({ filterName: slugFilterLabel }));
      }
    }
  }, [activeOptions]);

  function handleChange(isChecked, option) {
    const slugOption = slugify(transliterate(option));
    if (isChecked) {
      if (activeOptions != null) {
        setActiveOptions([...activeOptions, slugOption]);
      } else {
        setActiveOptions([slugOption]);
      }
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
                checked={
                  filters[slugFilterLabel]?.includes(
                    slugify(transliterate(option))
                  )
                    ? true
                    : false
                }
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
