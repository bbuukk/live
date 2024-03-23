import s from "./filters_offcanvas.module.scss";
import Offcanvas from "comps/offcanvas/offcanvas";
import OffcanvasHeader from "comps/offcanvas/offcanvas_header";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";
import FiltersAccordion from "../filters_accordion/filters_accordion";

const FiltersOffcanvas = ({ id, filters, minMaxPrice, currentMinMaxPrice }) => {
  return (
    <Offcanvas id={id}>
      <OffcanvasHeader id={`${id}Header`}>
        <div className={`${s.offcanvas_filter_header}`}>
          <i className="bi bi-funnel-fill" />
          <h2>Фільтри</h2>
        </div>
      </OffcanvasHeader>

      <OffcanvasBody>
        <FiltersAccordion
          filters={filters}
          minMaxPrice={minMaxPrice}
          currentMinMaxPrice={currentMinMaxPrice}
        />
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default FiltersOffcanvas;
