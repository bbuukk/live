import Link from "next/link";

import s from "./index.module.scss";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab";
import ProfileTab from "./profile-tab";

const Tabs = () => {
  return (
    <nav className={`${s.tabs_section}`}>
      <ul>
        <ProfileTab />
        <Tab href="/profile/personal_data">
          <i className="bi bi-person-circle" />
          <p>Персональні дані</p>
        </Tab>

        <Tab href="/profile/wish_list">
          <i className="bi bi-heart-fill" />
          <p>Список бажань</p>
        </Tab>
        <Tab href="/profile/wish_list" disabled>
          <i className="bi bi-list-check" />
          <p>Мої замовлення</p>
        </Tab>

        <Tab
          href="#"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <i className="bi bi-box-arrow-left" />
          <p>Вийти з акаунту</p>
        </Tab>
      </ul>
    </nav>
  );
};

export default Tabs;
