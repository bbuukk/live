import s from "./offcanvas.module.scss";

export const Offcanvas = ({ id, children }) => {
  return (
    <aside
      className={`offcanvas offcanvas-start ${s.offcanvas}`}
      tabIndex="-1"
      id={id}
    >
      {children}
    </aside>
  );
};

export default Offcanvas;
