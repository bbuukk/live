import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { toggleSignInModal, toggleSignUpModal } from "store/modalSlice";

import s from "./user_item.module.scss";

const UserItem = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const AuthUserItem = () => {
    const user = session?.user;
    return (
      <div data-bs-dismiss="offcanvas">
        <Link
          className={`${s.auth_user_item} ${s.user_item}`}
          href={"/profile/personal_data"}
        >
          {user && user.image && (
            <Image
              src={user.image}
              width={50}
              height={50}
              sizes="100vw"
              alt="User profile picture"
            />
          )}
          <div>
            <p>{`${user?.firstName}  ${user?.secondName}`}</p>
            <p>{user?.email}</p>
          </div>
        </Link>
      </div>
    );
  };

  //todo check if user has auth cookies, and auth immediately if so
  const NotAuthUserItem = () => {
    return (
      <div className={`${s.not_auth_user_item} ${s.user_item}`}>
        <i className={`bi bi-person-circle ${s.icon}`}></i>
        <p>
          <Link
            href={"#"}
            data-bs-dismiss="offcanvas"
            onClick={() => dispatch(toggleSignInModal())}
          >
            Увійти
          </Link>
          <span>{" або "}</span>
          <Link
            href={"#"}
            data-bs-dismiss="offcanvas"
            onClick={() => dispatch(toggleSignUpModal())}
          >
            Зареєструватись
          </Link>
        </p>
      </div>
    );
  };

  return <>{session ? <AuthUserItem /> : <NotAuthUserItem />}</>;
};

export default UserItem;
