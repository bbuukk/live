import { signOut, useSession } from "next-auth/react";

import s from "./main_offcanvas_body.module.scss";
import NavItem from "./comps/nav_item";
import NavLink from "./comps/nav_link";
import UserItem from "./comps/user_item";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";

const MainOffcanvasBody = () => {
  const { data: session } = useSession();
  return (
    <div className={`${s.body}`}>
      <UserItem />
      <ul className="navbar-nav justify-content-end flex-grow-1">
        {session ? (
          <>
            <NavItem
              href={"/"}
              icon={"bi-book"}
              text={"Усі категорії товарів"}
            />
            <NavItem
              href={"/profile/wish_list"}
              icon={"bi-heart"}
              text={"Список бажань"}
            />
            <NavItem
              href={"/profile/orders_list"}
              icon={"bi-list-ul"}
              text={"Мої замовлення"}
            />
          </>
        ) : (
          <NavItem href={"/"} icon={"bi-book"} text={"Усі категорії товарів"} />
        )}

        <NavItem href={"#"} icon={"bi-cart3"} text={"Кошик покупок"} />
      </ul>
      <ul
        className={`navbar-nav justify-content-end flex-grow-1 ${s.link_section}`}
      >
        <h5>Інформація про магазин</h5>
        <NavLink text={"Про нас"} href={"/info"} />
        <NavLink text={"Політика приватності"} href={"/privacy-policy"} />
        <NavLink text={"Умови використання сайту"} href={"/info"} />
      </ul>
      {session && (
        <ul className="navbar-nav justify-content-end flex-grow-1">
          <NavItem
            href={"#"}
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            icon={"bi-box-arrow-left"}
            text={"Вихід з акаунту"}
          />
        </ul>
      )}
    </div>
  );
};

export default MainOffcanvasBody;
