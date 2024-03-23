import s from "./filters_offcanvas_toggler.module.scss";

const FiltersOffcanvasToggler = ({ id }) => {
  return (
    <button
      className={`${s.filters_offcanvas_toggler}`}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls={id}
    >
      <p>Фільтри</p>
      <i className="bi bi-funnel" />
    </button>
  );
};

export default FiltersOffcanvasToggler;
