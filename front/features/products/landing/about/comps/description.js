import { useEffect, useRef, useState } from "react";
import s from "./description.module.scss";

//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";

const Description = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef();

  const toggleExpanded = () => {
    if (!expanded) {
      textRef.current.style.maxHeight = `${textRef.current.scrollHeight}px`;
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!expanded) {
      textRef.current.style.maxHeight = null;
    }
  }, [expanded]);

  return (
    <>
      <div id="description" className={`${s.description}`}>
        <div
          ref={textRef}
          className={`${s.text} ${expanded ? s.expanded : s.fade_out}`}
        >
          {parse(product.description)}
        </div>
        <button onClick={toggleExpanded}>
          {expanded ? (
            <>
              <p>Згонути</p>
              <i class="bi bi-chevron-up" />
            </>
          ) : (
            <>
              <p>Читати більше</p>
              <i class="bi bi-chevron-down" />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Description;
