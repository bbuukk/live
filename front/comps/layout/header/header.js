import s from "./header.module.scss";

import { CustomTooltip } from "comps/tooltip";

import SignInModal from "features/authentication/comps/auth/sign_in_modal";
import SignUpModal from "features/authentication/comps/auth/sign_up_modal";

import SignInPopOver from "./comps/sign_in_popover";
import SearchBar from "./comps/search-bar";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { Offcanvas, OffcanvasToggler } from "./comps/offcanvas";
import Logo from "./comps/logo";

//todo add shopping cart, when user is not auth
//todo make it responsive
const Header = () => {
  // const { data: session } = useSession();
  // const { user } = useSelector((state) => state.user);
  const { data: session } = useSession();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <nav className={`navbar ${s.header}`}>
        <OffcanvasToggler />
        <Offcanvas />
        <Logo />
        <SearchBar />

        {!session ? (
          <>
            <SignInPopOver
              toggleSignInModal={() => setShowSignInModal(!showSignInModal)}
              toggleSignUpModal={() => setShowSignUpModal(!showSignUpModal)}
            />
          </>
        ) : (
          <IconButtonGroup session={session} />
        )}

        <SignInModal
          isOpen={showSignInModal}
          toggle={() => {
            setShowSignInModal(!showSignInModal);
          }}
          toggleSignUpModal={() => {
            setShowSignUpModal(!showSignUpModal);
          }}
        />

        <SignUpModal
          isOpen={showSignUpModal}
          toggle={() => {
            setShowSignUpModal(!showSignUpModal);
          }}
          toggleSignInModal={() => {
            setShowSignInModal(!showSignInModal);
          }}
        />
      </nav>
      <div className={`${s.underline}`}></div>
    </>
  );
};

export default Header;

const IconButton = ({ href, children, tooltipText }) => {
  return (
    <CustomTooltip tooltipText={tooltipText}>
      <Link className={`btn ${s.icon_btn}`} href={href}>
        {children}
      </Link>
    </CustomTooltip>
  );
};

const IconButtonGroup = ({ session }) => {
  return (
    <div className={`order-sm-2 ${s.icon_btn_group}`}>
      <IconButton
        href={"/profile/personal_data"}
        tooltipText={"Персональний кабінет"}
      >
        {session.user.image && (
          <Image
            className={`${s.profile_picture}`}
            src={session.user.image}
            width="50"
            height="50"
          />
        )}
      </IconButton>
      <IconButton
        href={"/profile/orders_list"}
        tooltipText={"Список замовлень"}
      >
        <i className={`bi bi-list-ul ${s.icon}`} />
      </IconButton>
      <IconButton href={"/profile/wish_list"} tooltipText={"Список бажаного"}>
        <i className={`bi bi-heart-fill ${s.icon}`} />
      </IconButton>
      <IconButton href={"/profile/cart"} tooltipText={"Кошик покупок"}>
        <i className={`bi bi-cart3 ${s.icon}`} />
      </IconButton>
    </div>
  );
};
