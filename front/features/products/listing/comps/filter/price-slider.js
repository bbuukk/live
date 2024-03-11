import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import s from "./price-slider.module.scss";
import { useDispatch } from "react-redux";
import { setFilter } from "store/filtersSlice";

const PriceSlider = ({ minPrice, maxPrice }) => {
  const [minMaxPrice, setMinMaxPrice] = useState([minPrice, maxPrice]);

  const minDistance = 50; // Define your minimum distance here

  const dispatch = useDispatch();
  function handleConfirm(event, newValue) {
    dispatch(
      setFilter({
        filterName: "price",
        filterValue: [minMaxPrice[0], minMaxPrice[1]],
      })
    );
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPrice - minDistance);

        setMinMaxPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setMinMaxPrice([clamped - minDistance, clamped]);
      }
    } else {
      setMinMaxPrice(newValue);
    }
  };

  const handleInputChange = (index) => (event) => {
    const newValues = [...minMaxPrice];
    newValues[index] =
      event.target.value === "" ? 0 : Number(event.target.value);
    setMinMaxPrice(newValues);
  };

  return (
    <div className={`${s.price_slider}`}>
      <div className={`${s.header}`}>
        <input
          value={minMaxPrice[0]}
          onChange={handleInputChange(0)}
          className={`form-control ${s.input} ${s.left}`}
        />
        <span>—</span>
        <input
          value={minMaxPrice[1]}
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
          value={minMaxPrice}
          onChange={handleChange}
          className={s.slider}
          disableSwap
        />
      </div>
    </div>
  );
};

export default PriceSlider;
