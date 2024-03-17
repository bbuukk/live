import { useState } from "react";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import SignInModal from "features/authentication/comps/auth/sign_in_modal";
import SignUpModal from "features/authentication/comps/auth/sign_up_modal";
import { balsamiqSans } from "pages/_app";

import s from "./auth_popover.module.scss";

const AuthPopover = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const closePopover = () => document.body.click();
  const toggleSignInModal = () => setShowSignInModal(!showSignInModal);
  const toggleSignUpModal = () => setShowSignUpModal(!showSignUpModal);

  const handleSignIn = async (e) => {
    closePopover();
    toggleSignInModal();
  };

  const handleSignUp = async (e) => {
    closePopover();
    toggleSignUpModal();
  };

  const [showPopover, setShowPopover] = useState(false);

  let popoverhover = false;
  const handleHide = () => {
    setTimeout(() => {
      if (!popoverhover) {
        setShowPopover(false);
      }
    }, 250);
  };

  const handleShow = () => {
    setShowPopover(true);
  };

  const unsignedPopover = (
    <Popover
      className={`${s.auth_popover}`}
      onMouseLeave={() => {
        setShowPopover(false);
        popoverhover = false;
      }}
      onMouseEnter={() => {
        popoverhover = true;
      }}
    >
      <Popover.Body>
        <div className={`${s.unsigned_popover} ${balsamiqSans.className}`}>
          <button className={`btn ${s.sign_in_button}`} onClick={handleSignIn}>
            <p>Увійти</p>
          </button>

          <p>
            <span>Не зареєстровані? </span>
            <Link
              href="/"
              onClick={handleSignUp}
              className={`${s.sign_up} icon-link`}
            >
              Зареєструватись
            </Link>
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <li className={`${s.overlay_trigger}`}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={unsignedPopover}
        rootClose
        show={showPopover}
      >
        <i
          className={`bi bi-person-circle ${s.profile_icon}`}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
        ></i>
      </OverlayTrigger>

      <SignInModal
        isOpen={showSignInModal}
        toggle={toggleSignInModal}
        toggleSignUpModal={toggleSignUpModal}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        toggle={toggleSignUpModal}
        toggleSignInModal={toggleSignInModal}
      />
    </li>
  );
};

export default AuthPopover;
