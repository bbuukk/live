import s from "./logo.module.scss";
import hs from "../header.module.scss";
import { pacifico } from "pages/_app";

import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link className={`${s.logo}  ${hs.logo} ${pacifico.className}`} href="/">
        Живий світ
      </Link>
    </>
  );
};

export default Logo;
