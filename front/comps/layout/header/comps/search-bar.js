import { useState } from "react";
import s from "./search-bar.module.scss";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    // console.log(`searching...${searchText}`);
  };

  return (
    <form className={`${s.search_bar}`} role="search" onSubmit={handleSearch}>
      <input
        className={`form-control ${s.search_field}`}
        type="search"
        placeholder="шукати..."
        aria-label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className={`btn ${s.search_button}`} type="submit">
        <p>знайти</p>
        <i className="bi bi-search-heart" />
      </button>
    </form>
  );
};

export default SearchBar;
