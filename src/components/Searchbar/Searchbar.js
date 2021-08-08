import React, { useState } from "react";
import style from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function SearchForm({onSubmit}) {
    const [query, setQuery] = useState("");


const handleChange = (e) => {
    setQuery( e.target.value );
}
 
const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(query);
    setQuery({ query: "" });
  }

    return (
      <header className={style.Searchbar}>
        <form onSubmit={handleSubmit} className={style.SearchForm}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    )
  }

SearchForm.protoType = {
  query: PropTypes.string,
};

