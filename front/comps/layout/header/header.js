import SearchBar from "./comps/search-bar";

import AuthenticatedButtonGroup from "./comps/button_group/button_group";
import Logo from "./comps/logo";
import { Offcanvas, OffcanvasToggler } from "./comps/offcanvas";
import s from "./header.module.scss";

//todo add shopping cart, when user is not auth
//todo make it responsive
const Header = () => {
  return (
    <header>
      <nav className={`navbar ${s.header}`}>
        <OffcanvasToggler />
        <Offcanvas />
        <Logo />
        <SearchBar />
        <AuthenticatedButtonGroup />
      </nav>
      <div className={`${s.underline}`}></div>
    </header>
  );
};

export default Header;
