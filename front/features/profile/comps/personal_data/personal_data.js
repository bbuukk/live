import UserInfo from "./comps/user_info/user_info";
import s from "./personal_data.module.scss";
import Security from "./comps/security/security";
import DeleteAccount from "./comps/delete_account/delete_account";

const PersonalData = () => {
  return (
    <section className={`${s.personal}`}>
      <UserInfo />
      <Security />
      <DeleteAccount />
    </section>
  );
};

export default PersonalData;
