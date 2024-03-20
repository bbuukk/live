import s from "./password_input_filed.module.scss";
import InputField from "./input_field";

import { useState } from "react";

const PasswordInputField = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  error,
}) => {
  const [isPasswordPlainText, setIsPasswordPlainText] = useState(false);

  return (
    <div className={`form-floating mb-2 ${s.password_input_container}`}>
      <InputField
        type={isPasswordPlainText ? "text" : "password"}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        label={label}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        className={`${s.eye_button} btn`}
        type="button"
        onClick={() => {
          setIsPasswordPlainText(!isPasswordPlainText);
        }}
      >
        <i className={`bi bi-eye-${isPasswordPlainText ? "" : "slash-"}fill`} />
      </button>
    </div>
  );
};

export default PasswordInputField;
