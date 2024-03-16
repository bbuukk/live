import s from "./header.module.scss";

import AuthPopover from "./comps/auth_popover";
import SearchBar from "./comps/search-bar";
import UnauthenticatedButtonGroup from "./comps/button_group/unatenticated_button_group";

import { useSession } from "next-auth/react";

import Logo from "./comps/logo";
import { Offcanvas, OffcanvasToggler } from "./comps/offcanvas";

//todo add shopping cart, when user is not auth
//todo make it responsive
const Header = () => {
  // const { data: session } = useSession();
  // const { user } = useSelector((state) => state.user);
  const { data: session } = useSession();

  return (
    <header>
      <nav className={`navbar ${s.header}`}>
        <OffcanvasToggler />
        <Offcanvas />
        <Logo />
        <SearchBar />

        {!session ? (
          <>
            <AuthPopover />
          </>
        ) : (
          <UnauthenticatedButtonGroup session={session} />
        )}
      </nav>
      <div className={`${s.underline}`}></div>
    </header>
  );
};

export default Header;
