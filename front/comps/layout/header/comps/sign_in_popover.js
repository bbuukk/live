import { CustomTooltip } from "comps/tooltip";
import { useSignOut } from "hooks/useSingOut";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import s from "./sign_in_popover.module.scss";
import hs from "../header.module.scss";
import { useState, useRef } from "react";
import SignInModal from "features/authentication/comps/auth/sign_in_modal";
import SignUpModal from "features/authentication/comps/auth/sign_up_modal";

//todo refactor this component, it is an absolute mess
const SignInPopOver = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignIn = async (e) => {
    document.body.click();
    setShowSignInModal(!showSignInModal);
  };

  const handleSignUp = async (e) => {
    document.body.click();
    setShowSignUpModal(!showSignUpModal);
  };

  const closePopover = () => {
    document.body.click();
  };

  const [showPopover, setShowPopover] = useState(false);
  const ref = useRef(null);

  const handleShow = () => {
    setShowPopover(true);
  };

  let popoverhover = false;
  const handleHide = () => {
    setTimeout(() => {
      if (!popoverhover) {
        setShowPopover(false);
      }
    }, 250);
  };

  const unsignedPopover = (
    <Popover
      ref={ref}
      id="popover-basic"
      className={`${s.sign_in_popover}`}
      onMouseLeave={() => {
        setShowPopover(false);
        popoverhover = false;
      }}
      onMouseEnter={() => {
        popoverhover = true;
      }}
    >
      <Popover.Body>
        <div className={`${s.unsigned_popover}`}>
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
    <div className={`${hs.overlay_trigger}`}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={unsignedPopover}
        rootClose
        show={showPopover}
      >
        <i
          className={`bi bi-person-circle fs-1 ${hs.profile_icon}`}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
        ></i>
      </OverlayTrigger>

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
    </div>
  );
};

export default SignInPopOver;
