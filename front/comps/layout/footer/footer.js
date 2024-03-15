import s from "./footer.module.scss";
import AboutUs from "./comps/about_us";
import WorkHours from "./comps/work_hours";
import Contacts from "./comps/contacts";
import Location from "./comps/location";
import { balsamiqSans } from "pages/_app";

const Footer = () => (
  <>
    <div className={`${s.decor_line}`} />
    <footer className={` ${s.footer} ${balsamiqSans.className}`}>
      <ol className={`row`}>
        <li className={`col-sm-12 col-md-6 col-xl-4`}>
          <AboutUs />
        </li>

        <li className={`col-sm-12 col-md-6 col-xl-3 `}>
          <WorkHours />
        </li>

        <li className={`col-sm-12 col-md-6 col-xl-3 `}>
          <Contacts />
        </li>

        <li className={`col-sm-12 col-md-6 col-xl-2`}>
          <Location />
        </li>
      </ol>
    </footer>
  </>
);

export default Footer;
