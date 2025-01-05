import React, { useState } from "react";
import "./Search.css";

export default function QuerySearch({onSearch}){
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <>
    <div className="search_container text-center">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search"
      />
      </div>
    </>
  );

}
