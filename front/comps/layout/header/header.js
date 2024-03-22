import SearchBar from "./comps/search-bar";
import ButtonGroup from "./comps/button_group/button_group";
import Logo from "./comps/logo";
import {
  MainOffcanvas,
  OffcanvasToggler,
} from "./comps/offcanvas/main_offcanvas";
import s from "./header.module.scss";

//todo add shopping cart, when user is not auth
//todo make it responsive
const Header = () => {
  return (
    <header>
      <nav className={`navbar ${s.header}`}>
        <OffcanvasToggler id="mainOffcanvas" />
        <MainOffcanvas id="mainOffcanvas" />
        <Logo />
        <SearchBar />
        <ButtonGroup />
      </nav>
      <div className={`${s.underline}`}></div>
    </header>
  );
};

export default Header;
