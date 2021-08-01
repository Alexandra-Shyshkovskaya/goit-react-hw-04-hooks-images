import { Component } from "react";
import style from "./Searchbar.module.css";
import PropTypes from "prop-types";

class SearchForm extends Component {
  state = { qwery: "" };

  handleChange = (e) => {
    this.setState({ qwery: e.currentTarget.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.qwery);
    this.setState({ qwery: "" });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={this.handleSubmit} className={style.SearchForm}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchForm.protoType = {
  qwery: PropTypes.string,
};

export default SearchForm;
