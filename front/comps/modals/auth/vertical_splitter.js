import s from "./modal.module.scss";

const VerticalSplitter = () => {
  return (
    <div className={`${s.vertical_splitter}`}>
      <div className={`${s.line}`}></div>
      <p>або</p>
      <div className={`${s.line}`}></div>
    </div>
  );
};

export default VerticalSplitter;
