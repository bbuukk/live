import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";
import s from "./sort-group.module.scss";

const SortGroup = () => {
  const { dispatch } = useActiveFiltersContext();

  const handleChange = (event) => {
    console.log(`Selected option: ${event.target.id}`);
    dispatch({ type: "SET_SORT_BY", payload: event.target.id });
  };

  return (
    <div className={`${s.filters}`}>
      <p className="p-2">Сортування:</p>
      <div className={`${s.btn_group}`}>
        {/* <label className="btn">
          <input type="radio" name="options" id="option1" onChange={handleChange} /> За популярністю
        </label> */}
        {/* <hr /> */}
        <label className="btn">
          <input
            type="radio"
            name="options"
            id="price_asc"
            onChange={handleChange}
          />{" "}
          Спочатку дешевші
        </label>
        {/* <hr /> */}
        <label className="btn">
          <input
            type="radio"
            name="options"
            id="price_dsc"
            onChange={handleChange}
          />{" "}
          Спочатку дорожчі
        </label>
      </div>
    </div>
  );
};

export default SortGroup;
