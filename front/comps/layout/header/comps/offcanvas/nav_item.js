import Link from "next/link";

import s from "./nav_item.module.scss";

const NavItem = ({ href, text, icon, onClick }) => {
  return (
    <li
      className={`nav-item ${s.nav_item}`}
      data-bs-dismiss="offcanvas"
      onClick={onClick}
    >
      <Link className="nav-link" href={href}>
        <i className={`bi ${icon}`} />
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default NavItem;
