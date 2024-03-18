import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { pacifico } from "pages/_app";

import s from "./offcanvas_header.module.scss";

const OffcanvasHeader = () => {
  return (
    <div className={`offcanvas-header ${s.header}`}>
      <div className="offcanvas-title" id="offcanvasNavbarLabel">
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

      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default OffcanvasHeader;
