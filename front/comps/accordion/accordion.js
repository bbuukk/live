import s from "./accordion.module.scss";

const Accordion = ({ id, children }) => {
  return (
    <div className={`${s.filter_accordion} accordion accordion-flush`} id={id}>
      {children}
    </div>
  );
};

export default Accordion;
