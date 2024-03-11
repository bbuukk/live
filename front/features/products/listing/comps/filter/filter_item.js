import s from "./filters_accordion.module.scss";

import CheckBox from "./checkbox";
import { Accordion } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addFilter } from "store/filtersSlice";
import { useState } from "react";

const FilterChecks = ({ filterLabel, options, idx }) => {
  const [activeOption, setActiveOptions] = useState([]);

  const dispatch = useDispatch();
  function handleConfirm(event, newValue) {
    dispatch(
      setFilter({
        filterName: "price",
        filterValue: [minMaxPrice[0], minMaxPrice[1]],
      })
    );
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
              <CheckBox id={option} label={option} checked={false} />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
