import Link from "next/link";

import s from "./nav_link.module.scss";

const NavLink = ({ href, text }) => {
  return (
    <li className={`${s.nav_link}`} data-bs-dismiss="offcanvas">
      <Link href={href}>
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default NavLink;
