import React from "react";
import "./SearchBar.css";


const SearchBar = () => (
  <div id="wrap">
    <form action="" autoComplete="on">
      <input id="search" name="search" type="text" placeholder="Search for brewery, beer, type. . ." /><input id="search_submit" type="submit" />
    </form>
  </div>
);

export default SearchBar;