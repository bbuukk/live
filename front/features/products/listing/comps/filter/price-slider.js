import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import s from "./price-slider.module.scss";
// import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const PriceSlider = ({ minPrice, maxPrice }) => {
  const [value, setValue] = useState([minPrice, maxPrice]);
  // const { dispatch } = useActiveFiltersContext();

  const minDistance = 50; // Define your minimum distance here

  function handleConfirm(event, newValue) {
    // dispatch({
    //   type: "SET_MIN_MAX_PRICE",
    //   payload: value,
    // });
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPrice - minDistance);

        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  const handleInputChange = (index) => (event) => {
    const newValues = [...value];
    newValues[index] =
      event.target.value === "" ? 0 : Number(event.target.value);
    setValue(newValues);
  };

  return (
    <div className={`${s.price_slider}`}>
      <div className={`${s.header}`}>
        <input
          value={value[0]}
          onChange={handleInputChange(0)}
          className={`form-control ${s.input} ${s.left}`}
        />
        <span>—</span>
        <input
          value={value[1]}
          onChange={handleInputChange(1)}
          className={`form-control ${s.input} ${s.right}`}
        />
        <button onClick={handleConfirm} className="btn btn-outline-success">
          Ok
        </button>
      </div>
      <div className={`${s.body}`}>
        <Slider
          range="true"
          min={minPrice}
          max={maxPrice}
          step={10}
          value={value}
          onChange={handleChange}
          className={s.slider}
          disableSwap
        />
      </div>
    </div>
  );
};

export default PriceSlider;
