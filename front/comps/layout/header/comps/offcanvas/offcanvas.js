import hs from "../../header.module.scss";

import s from "./offcanvas.module.scss";
import OffcanvasHeader from "./offcanvas_header";
import OffcanvasBody from "./offcanvas_body";

export const Offcanvas = () => {
  return (
    <div
      className={`offcanvas offcanvas-start ${s.offcanvas}`}
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <OffcanvasHeader />
      <OffcanvasBody />
    </div>
  );
};

export const OffcanvasToggler = () => {
  return (
    <div className={`${s.offcanvas_toggler} ${hs.offcanvas_toggler}`}>
      <button
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list" />
      </button>
    </div>
  );
};
