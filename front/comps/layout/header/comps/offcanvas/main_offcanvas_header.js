import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { pacifico } from "pages/_app";

import s from "./main_offcanvas_header.module.scss";

const MainOffcanvasHeader = () => {
  return (
    <div className={` ${s.header}`}>
      <Link className={`${s.logo} ${pacifico.className}`} href="/">
        <Image
          src={"/logo.svg"}
          alt="Logo of the site"
          width={50}
          height={50}
        />
        <p>Живий світ</p>
      </Link>
    </div>
  );
};

export default MainOffcanvasHeader;
