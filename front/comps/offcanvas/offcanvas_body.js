import s from "./offcanvas_body.module.scss";

const OffcanvasBody = ({ children }) => {
  return <div className={`offcanvas-body ${s.body}`}>{children}</div>;
};

export default OffcanvasBody;
