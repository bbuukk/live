import Slider from "@mui/material/Slider";
import React, { useState } from "react";
import s from "./price-slider.module.scss";

const PriceSlider = () => {
  const [value, setValue] = useState([0, 3500]);

  const minDistance = 300; // Define your minimum distance here

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 3500 - minDistance);
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
        <button className="btn btn-outline-success">Ok</button>
      </div>
      <div className={`${s.body}`}>
        <Slider
          range="true"
          min={0}
          max={3500}
          step={50}
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
