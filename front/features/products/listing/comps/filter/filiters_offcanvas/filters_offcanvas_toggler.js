const FiltersOffcanvasToggler = ({ id }) => {
  return (
    <button
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls={id}
    >
      <i className="bi bi-funnel" />
    </button>
  );
};

export default FiltersOffcanvasToggler;
