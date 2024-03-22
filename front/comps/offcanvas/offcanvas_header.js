import s from "./offcanvas_header.module.scss";

const OffcanvasHeader = ({ id, style, children }) => {
  return (
    <div className={`offcanvas-header ${s.header}`} style={style}>
      <div className="offcanvas-title" id={id}>
        {children}
      </div>

      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default OffcanvasHeader;
