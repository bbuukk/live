import { Modal } from "react-bootstrap";
import s from "./delete_account_modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteAccountModal } from "store/modalSlice";

import { balsamiqSans } from "pages/_app";

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const { deleteAccountModalOpen } = useSelector((state) => state.modals);

  const handleDelete = async (e) => {
    e.preventDefault();
    //todo implement delete account logic
    console.log("account deleted");
  };

  const toggleModal = () => dispatch(toggleDeleteAccountModal());

  return (
    <Modal
      id="DeleteAccountModalOpen"
      show={deleteAccountModalOpen}
      onHide={toggleModal}
      centered
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className="modal_header_title_center">
        <h3>Видалити акаунт ?</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <menu className={`${s.button_group}`}>
          <li>
            <button onClick={toggleModal}>Скасувати</button>
          </li>
          <li>
            <button
              onClick={(e) => {
                toggleModal();
                handleDelete(e);
              }}
            >
              Видалити акаунт
            </button>
          </li>
        </menu>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAccountModal;
