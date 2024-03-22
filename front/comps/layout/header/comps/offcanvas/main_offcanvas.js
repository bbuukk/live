import hs from "../../header.module.scss";

import s from "./main_offcanvas.module.scss";
import MainOffcanvasHeader from "./main_offcanvas_header";
import MainOffcanvasBody from "./main_offcanvas_body";

import Offcanvas from "comps/offcanvas/offcanvas";
import OffcanvasHeader from "comps/offcanvas/offcanvas_header";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";

export const MainOffcanvas = ({ id }) => {
  return (
    <Offcanvas id={id}>
      <OffcanvasHeader
        id={`${id}Header`}
        style={{ "--background-color": "#c8e59b" }}
      >
        <MainOffcanvasHeader />
      </OffcanvasHeader>

      <OffcanvasBody>
        <MainOffcanvasBody />
      </OffcanvasBody>
    </Offcanvas>
  );
};

export const OffcanvasToggler = ({ id }) => {
  return (
    <div className={`${s.offcanvas_toggler} ${hs.offcanvas_toggler}`}>
      <button
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#${id}`}
        aria-controls={id}
      >
        <i className="bi bi-list" />
      </button>
    </div>
  );
};
