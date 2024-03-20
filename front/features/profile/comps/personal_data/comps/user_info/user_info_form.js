import { useEffect, useState } from "react";
import s from "./user_info.module.scss";
import { Accordion, Form, Card, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import InputField from "comps/input_fields/input_field";
import Image from "next/image";
import ProfileImage from "./profile_image";

const UserInfoForm = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [isBeingModified, setIsBeingModified] = useState(false);
  const [hasBeenBeingModified, setHasBeenBeingModified] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    secondName: "",
    email: "",
  });

  useEffect(() => {
    setUserInfo({
      firstName: user?.firstName || "",
      secondName: user?.secondName || "",
      email: user?.email || "",
    });
  }, [session, isBeingModified]);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    setIsBeingModified(false);
  };

  return (
    <form className={`${s.user_info_form}`} onSubmit={handleSubmit}>
      <div className={`${s.input_group}`}>
        <InputField
          type="text"
          id="profileFirstNameInput"
          label="Ім'я:"
          value={userInfo.firstName}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, firstName: e.target.value });
          }}
        />
        <InputField
          type="text"
          id="profileSecondNameInput"
          label="Прізвище:"
          value={userInfo.secondName}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, secondName: e.target.value });
          }}
        />

        <InputField
          type="email"
          id="profileEmailInput"
          label="Пошта:"
          value={userInfo.email}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>

      <div className={`${s.button_group}`}>
        {!isBeingModified && (
          <button
            type="button"
            className={`${s.edit_btn}`}
            onClick={() => setIsBeingModified(true)}
          >
            Редагувати
          </button>
        )}
        {isBeingModified && (
          <>
            <button
              data-toggle="tooltip"
              title={hasBeenBeingModified ? "" : "Дані не були змінені"}
              data-placement="bottom"
              type="submit"
              className={`${s.save_btn}`}
              disabled={!hasBeenBeingModified}
              onClick={() => {
                setHasBeenBeingModified(false);
              }}
            >
              Зберегти
            </button>
            <button
              type="button"
              className={`${s.cancel_btn}`}
              onClick={() => {
                setHasBeenBeingModified(false);
                setIsBeingModified(false);
              }}
            >
              Скасувати
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserInfoForm;
