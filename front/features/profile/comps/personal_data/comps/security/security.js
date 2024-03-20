import s from "./security.module.scss";
import card_s from "./../card.module.scss";
import { Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toggleChangePasswordModal } from "store/modalSlice";
import { signOut } from "next-auth/react";

const Security = () => {
  const dispatch = useDispatch();
  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header}`}>
        <i className="bi bi-lock-fill"></i>
        <h5>Безпека</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body} ${s.security}`}>
        <button onClick={() => dispatch(toggleChangePasswordModal())}>
          Змінити пароль?
        </button>
        <button onClick={() => {}}>Видалити акаунт</button>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Вийти з акаунту
        </button>
      </Card.Body>
    </Card>
  );
};

export default Security;
