import { signOut, useSession } from "next-auth/react";

import s from "./offcanvas_body.module.scss";
import NavItem from "./nav_item";
import NavLink from "./nav_link";

const OffcanvasBody = () => {
  const { data: session } = useSession();

  return (
    <div className={`offcanvas-body ${s.body}`}>
      <ul className="navbar-nav justify-content-end flex-grow-1">
        <NavItem href={"/"} icon={"bi-book"} text={"Усі категорії товарів"} />
        {session && (
          <>
            <NavItem
              href={"/profile/personal_data"}
              icon={"bi-person-circle"}
              text={"Особистий кабінет"}
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

export default OffcanvasBody;
