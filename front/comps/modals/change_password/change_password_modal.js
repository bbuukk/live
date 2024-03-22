// import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./change_password_modal.module.scss";

// import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { toggleChangePasswordModal } from "store/modalSlice";

import PasswordInputField from "comps/input_fields/password_input_field";
import { useEffect, useState } from "react";
import { balsamiqSans } from "pages/_app";

//todo input validation
//todo make modal responsive
//todo make it really change password
const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { changePasswordModalOpen } = useSelector((state) => state.modals);

  const [hasBeenBeingModified, setHasBeenBeingModified] = useState(false);

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  });

  useEffect(() => {
    return () => {
      setPasswordInfo({
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      });
      setHasBeenBeingModified(false);
    };
  }, [changePasswordModalOpen]);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    console.log(passwordInfo);
  };

  return (
    <Modal
      id="changePasswordModalOpen"
      show={changePasswordModalOpen}
      onHide={() => dispatch(toggleChangePasswordModal())}
      centered
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Змінити пароль</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${s.input_group}`}>
            <PasswordInputField
              id="oldPasswordInputField"
              value={passwordInfo.oldPassword}
              onChange={(e) => {
                setHasBeenBeingModified(true);
                setPasswordInfo({
                  ...passwordInfo,
                  oldPassword: e.target.value,
                });
              }}
              label="Ваш старий пароль"
            />
            <PasswordInputField
              id="newPasswordInputField"
              value={passwordInfo.newPassword}
              onChange={(e) => {
                setHasBeenBeingModified(true);
                setPasswordInfo({
                  ...passwordInfo,
                  newPassword: e.target.value,
                });
              }}
              label="Новий пароль"
            />
            <PasswordInputField
              id="newPasswordRepeatInputField"
              value={passwordInfo.newPasswordRepeat}
              onChange={(e) => {
                setHasBeenBeingModified(true);
                setPasswordInfo({
                  ...passwordInfo,
                  newPasswordRepeat: e.target.value,
                });
              }}
              label="Новий пароль ще раз"
            />
          </div>
          <menu className={`${s.button_group}`}>
            <li>
              <button
                type="button"
                onClick={() => {
                  setHasBeenBeingModified(false);
                  dispatch(toggleChangePasswordModal());
                }}
              >
                Скасувати
              </button>
            </li>
            <li>
              <button
                data-toggle="tooltip"
                title={hasBeenBeingModified ? "" : "Дані не були змінені"}
                data-placement="bottom"
                type="submit"
                disabled={!hasBeenBeingModified}
                onClick={() => {
                  setHasBeenBeingModified(false);
                  dispatch(toggleChangePasswordModal());
                }}
              >
                Зберегти
              </button>
            </li>
          </menu>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
