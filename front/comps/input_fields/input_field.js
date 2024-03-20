import s from "./input_field.module.scss";

const InputField = ({
  type,
  id,
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div className="form-floating w-100">
      <input
        type={type}
        id={id}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className={`form-label ${s.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default InputField;
