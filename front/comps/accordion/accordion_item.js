import s from "./accordion_item.module.scss";

const AccordionItem = ({ id, label, show = false, children }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="true"
          aria-controls={id}
        >
          {label}
        </button>
      </h2>
      <div
        id={id}
        className={`accordion-collapse collapse ${show ? "show" : ""}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
