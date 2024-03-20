import s from "./security.module.scss";
import card_s from "./../card.module.scss";
import { Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toggleChangePasswordModal } from "store/modalSlice";

const Security = () => {
  const dispatch = useDispatch();
  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header}`}>
        <i className="bi bi-lock-fill"></i>
        <h5>Безпека</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body}`}>
        <section className={`${s.security}`}>
          <button onClick={() => dispatch(toggleChangePasswordModal())}>
            Змінити пароль?
          </button>
          {/* <Link href={"/"}>Вийти</Link> */}
        </section>
      </Card.Body>
    </Card>
  );
};

export default Security;
