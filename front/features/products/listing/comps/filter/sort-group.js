import s from "./sort-group.module.scss";

//todo add funcitonality
const SortGroup = () => {
  const handleChange = (event) => {};

  const ascLabel = "Від дешевших до дорогих";
  const dscLable = "Від дорогих до дешевих";
  return (
    <search className={`${s.filters}`}>
      <div className={`${s.btn_group}`}>
        <label className="btn">
          <input
            type="radio"
            name="sort_options"
            id="price_asc"
            onChange={handleChange}
          />
          {ascLabel}
        </label>
        <label className="btn">
          <input
            type="radio"
            name="sort_options"
            id="price_dsc"
            onChange={handleChange}
          />{" "}
          {dscLable}
        </label>
      </div>
      <select className={`form-select ${s.select}`} onChange={handleChange}>
        <option value="price_asc">{ascLabel}</option>
        <option value="price_dsc">{dscLable}</option>
      </select>
    </search>
  );
};

export default SortGroup;
