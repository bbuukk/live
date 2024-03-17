import { useSession } from "next-auth/react";
import Image from "next/image";

import hs from "../../header.module.scss";

import IconButton from "./icon_button";
import AuthPopover from "./auth_popover";
import s from "./button_group.module.scss";

//todo list of links with unordered list
const AuthenticatedButtonGroup = () => {
  const { data: session } = useSession();

  return (
    <nav className={` ${s.auth_btn_group} ${hs.icon_btn_group}`}>
      <ul>
        {session ? (
          session.user.image && (
            <IconButton
              href={"/profile/personal_data"}
              tooltipText={"Персональний кабінет"}
            >
              <Image
                src={session.user.image}
                alt="Profile picture"
                width="0"
                height="0"
              />
            </IconButton>
          )
        ) : (
          <AuthPopover />
        )}

        {session && (
          <>
            <IconButton
              href={"/profile/orders_list"}
              tooltipText={"Список замовлень"}
            >
              <i className={`bi bi-list-ul `} />
            </IconButton>
            <IconButton
              href={"/profile/wish_list"}
              tooltipText={"Список бажаного"}
            >
              <i className={`bi bi-heart-fill`} />
            </IconButton>
          </>
        )}
        <IconButton href={"/profile/cart"} tooltipText={"Кошик покупок"}>
          <i className={`bi bi-cart3`} />
        </IconButton>
      </ul>
    </nav>
  );
};

export default AuthenticatedButtonGroup;
