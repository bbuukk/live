import Link from "next/link";

import { useSignOut } from "root/hooks/useSingOut";

import s from "./tab-layout.module.scss";

const TabLayout = ({ children }) => {
  const { signOut } = useSignOut();

  const handleSignOut = (e) => {
    window.location.reload(true);
    signOut();
  };

  return (
    <div className={`${s.profile_tabs_layout}  `}>
      <TabMenu handleSignOut={handleSignOut} />
      <div className="w-100 h-100">{children}</div>
    </div>
  );
};

const TabMenu = ({ handleSignOut }) => {
  return (
    <nav className={`nav ${s.tabs}`}>
      <Tab
        href="/profile/personal_data"
        text="Personal Data"
        icon={<i className="bi bi-person-circle"></i>}
      />
      <Tab
        href="/profile/wish_list"
        text="Wish List"
        icon={<i className="bi bi-heart-fill"></i>}
      />
      <Tab
        href="/profile/orders_list"
        text="My orders"
        icon={<i className="bi bi-list-check"></i>}
      />
      <Tab
        onClick={handleSignOut}
        href="/"
        text="Sign Out"
        icon={<i className="bi bi-box-arrow-left"></i>}
      />
    </nav>
  );
};

const Tab = ({ text, icon, href }) => {
  return (
    <Link className={`${s.tab}`} href={href}>
      <div className={s.foo}>
        {icon}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default TabLayout;
