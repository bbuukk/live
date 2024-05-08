import { useState } from "react";
import Link from "next/link";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useDispatch } from "react-redux";

import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";
import { balsamiqSans } from "pages/_app";

import s from "./auth_popover.module.scss";

import { AccountCircleRounded } from "@mui/icons-material";

const AuthPopover = () => {
  const dispatch = useDispatch();

  const closePopover = () => document.body.click();

  const handleSignIn = async (e) => {
    closePopover();
    dispatch(toggleSignInModal());
  };

  const handleSignUp = async (e) => {
    closePopover();
    dispatch(toggleSignUpModal());
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
          <button
            className={` ${s.sign_in_button} button_submit`}
            onClick={handleSignIn}
          >
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
    <li className={`${s.overlay_trigger}`} aria-label={"Персональний кабінет"}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={unsignedPopover}
        rootClose
        show={showPopover}
      >
        <AccountCircleRounded
          className={`${s.profile_icon}`}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
        />
      </OverlayTrigger>
    </li>
  );
};

export default AuthPopover;
