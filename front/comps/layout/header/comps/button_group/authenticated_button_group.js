import s from "./authenticated_button_group.module.scss";
import hs from "../../header.module.scss";

import { CustomTooltip } from "comps/tooltip";

import Image from "next/image";
import Link from "next/link";

const IconButton = ({ href, children, tooltipText }) => {
  return (
    <CustomTooltip tooltipText={tooltipText}>
      <Link className={`btn ${s.icon_btn}`} href={href}>
        {children}
      </Link>
    </CustomTooltip>
  );
};

//todo list of links with unordered list
const AuthenticatedButtonGroup = ({ session }) => {
  return (
    <div className={`order-sm-2 ${s.icon_btn_group} ${hs.icon_btn_group}`}>
      <IconButton
        href={"/profile/personal_data"}
        tooltipText={"Персональний кабінет"}
      >
        {session.user.image && (
          <Image
            className={`${s.profile_picture}`}
            src={session.user.image}
            width="50"
            height="50"
          />
        )}
      </IconButton>
      <IconButton
        href={"/profile/orders_list"}
        tooltipText={"Список замовлень"}
      >
        <i className={`bi bi-list-ul ${s.icon}`} />
      </IconButton>
      <IconButton href={"/profile/wish_list"} tooltipText={"Список бажаного"}>
        <i className={`bi bi-heart-fill ${s.icon}`} />
      </IconButton>
      <IconButton href={"/profile/cart"} tooltipText={"Кошик покупок"}>
        <i className={`bi bi-cart3 ${s.icon}`} />
      </IconButton>
    </div>
  );
};

export default AuthenticatedButtonGroup;
