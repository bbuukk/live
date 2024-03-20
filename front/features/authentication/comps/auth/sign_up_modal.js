import { useSignUp } from "hooks/useSignUp";
import { useState } from "react";
import { Modal } from "react-bootstrap";

import s from "./sign_up_modal.module.scss";
import modal_s from "./modal.module.scss";
import Link from "next/link";
import SignFormByServices from "./sign_form_by_services";
import VerticalSplitter from "./vertical_splitter";
import SignUpForm from "./sign_up_form_by_credentials";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";

//todo input validation

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { signUpModalOpen } = useSelector((state) => state.modals);

  const toggle = () => dispatch(toggleSignUpModal());
  const toggleAlternative = () => dispatch(toggleSignInModal());

  return (
    <>
      <Modal
        id="changePasswordModal"
        show={signUpModalOpen}
        onHide={toggle}
        centered
        className={`${modal_s.modal}`}
      >
        <Modal.Header className={`${modal_s.modal_header}`} closeButton={true}>
          <h3 className={`${modal_s.heading}`}>Реєстрація</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignUpForm
            toggleModal={toggle}
            toggleSignInModal={toggleAlternative}
          />
          <VerticalSplitter />
          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
