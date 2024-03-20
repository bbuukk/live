// import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./change_password_modal.module.scss";

// import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { toggleChangePasswordModal } from "store/modalSlice";

//todo input validation
//todo make modal responsive
const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { changePasswordModalOpen } = useSelector((state) => state.modals);

  return (
    <>
      <Modal
        id="changePasswordModalOpen"
        show={changePasswordModalOpen}
        onHide={() => dispatch(toggleChangePasswordModal())}
        centered
        className={`${s.modal}`}
      >
        <Modal.Header closeButton={true} className={`${s.modal_header}`}>
          <h3 className={`${s.heading}`}>Змінити пароль</h3>
        </Modal.Header>
        <Modal.Body className={`${s.modal_body}`}></Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
