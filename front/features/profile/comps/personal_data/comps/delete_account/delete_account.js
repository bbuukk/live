import s from "./delete_account.module.scss";
import card_s from "./../card.module.scss";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleDeleteAccountModal } from "store/modalSlice";

const DeleteAccount = () => {
  const dispatch = useDispatch();

  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header} ${s.header}`}>
        <i className="bi bi-trash3-fill" />
        <h5>Видалити акаунт</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body} ${s.body}`}>
        <p>
          Якщо ви видалите свій обліковий запис, повернути його назад неможливо.
          Будь ласка, будьте впевненими.
        </p>
        <button
          onClick={() => {
            //todo delete account
            dispatch(toggleDeleteAccountModal());
            // signOut({ callbackUrl: "/" });
          }}
        >
          Видалити акаунт
        </button>
      </Card.Body>
    </Card>
  );
};

export default DeleteAccount;
