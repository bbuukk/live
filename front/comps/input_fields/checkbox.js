import { useEffect, useState } from "react";

const CheckBox = ({ id, label, checked, handleChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          handleChange(!isChecked, label);
          setIsChecked(!isChecked);
        }}
        id={id}
        role="button"
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
