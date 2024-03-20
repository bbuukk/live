import { useSignIn } from "hooks/useSignIn";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./sign_in_modal.module.scss";
import modal_s from "./modal.module.scss";
import VerticalSplitter from "./vertical_splitter";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SignInFormByCredentials from "./sign_in_form_by_credentials";
import SignFormByServices from "./sign_form_by_services";
import { useDispatch, useSelector } from "react-redux";

import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";

//todo input validation
//todo make modal responsive

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInModalOpen } = useSelector((state) => state.modals);

  const toggle = () => dispatch(toggleSignInModal());
  const toggleAlternative = () => dispatch(toggleSignUpModal());

  return (
    <>
      <Modal
        id="SignInModal"
        show={signInModalOpen}
        onHide={toggle}
        centered
        className={`${modal_s.modal}`}
      >
        <Modal.Header closeButton={true} className={`${modal_s.modal_header}`}>
          <h3 className={`${modal_s.heading}`}>Вхід</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleAlternative}
          />

          <VerticalSplitter />

          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
