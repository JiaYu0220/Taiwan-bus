import React from "react";

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <input
      className="align-self-end form-control ps-4"
      type="text"
      name="search"
      id="search"
      placeholder="選擇路線"
      inputMode="none"
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
      }}
    />
  );
};

export default SearchBar;
