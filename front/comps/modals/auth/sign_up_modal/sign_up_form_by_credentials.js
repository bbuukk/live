import { useSignUp } from "hooks/useSignUp";
import { useState } from "react";

import s from "./sign_up_form_by_credentials.module.scss";
import modal_s from "../modal.module.scss";
import Link from "next/link";
import InputField from "comps/input_fields/input_field";
import PasswordInputField from "comps/input_fields/password_input_field";

const SignUpForm = ({ toggleModal, toggleSignInModal }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(firstName, secondName, email, password);
    if (!error) {
      toggleModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${s.by_credentials} ${modal_s.left}`}
    >
      <div className={`${s.input_group}`}>
        <InputField
          type="text"
          id="signUpFirstNameInputField"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label="Ім'я*"
        ></InputField>
        <InputField
          type="text"
          id="signUpSecondNameInputField"
          value={secondName}
          onChange={(e) => {
            setSecondName(e.target.value);
          }}
          label="Прізвище"
        />
        <InputField
          type="email"
          id="signUpEmailInputField"
          value={email}
          onChange={(e) => {
            1;
            setEmail(e.target.value);
          }}
          label="Пошта*"
        />
        <PasswordInputField
          id="signUpPasswordInputField"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Пароль*"
        />
      </div>

      {/* <div id="passwordHelpBlock" className={`form-text`}>
              Ваш пароль має складатися з 8-20 символів, містити букви та чисел і
              не має містити пробілів, спеціальних символів або емодзі.
            </div> */}
      <div className={`form-text`}>
        Реєструючись, ви погоджуєтеся з умовами{" "}
        <Link href="/privacy-policy">
          положення про обробку і захист персональних даних
        </Link>
        {` `}та <Link href="/terms-of-usage">угодою користувача</Link>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-outline-success"
      >
        Зареєструватись
      </button>
      {/* signIn('credentials', { redirect: false, password: 'password' }) */}

      <Link
        className={`text-center d-block ${s.sign_in_link}`}
        href="#"
        onClick={() => {
          toggleModal();
          toggleSignInModal();
        }}
      >
        Я вже зареєстрований
      </Link>
      {error ? <div className={`${s.error}`}>{error}</div> : <></>}
    </form>
  );
};

export default SignUpForm;
