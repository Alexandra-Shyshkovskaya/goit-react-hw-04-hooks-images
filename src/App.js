import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./App.module.css";
import searchApi from "./services/searchApi";
import Modal from "./components/Modal";
import SearchForm from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";

class App extends Component {
  state = {
    query: "",
    pictures: [],
    page: 1,
    loading: false,
    showModal: false,
    largeImage: "",
    imgTags: "",
    error: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.fetchPictures();
    }
    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  onChangeQuery = (query) => {
    this.setState({ query: query, page: 1, pictures: [], error: null });
  };

  fetchPictures = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    searchApi(query, page)
      .then((pictures) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error: "Picture not found" }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  bigImage = (largeImage = "") => {
    this.setState({ largeImage });

    this.toggleModal();
  };

  render() {
    const { pictures, loading, error, showModal, largeImage, imgTags } =
      this.state;

    return (
      <div className={style.App}>
        <SearchForm onSubmit={this.onChangeQuery} />

        {error && <h1>{error}</h1>}

        <ImageGallery pictures={pictures} bigImage={this.bigImage} />
        {loading && <Loader />}
        {pictures.length > 11 && !loading && (
          <Button onClick={this.fetchPictures} />
        )}
        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}
App.propTypes = {
  pictures: PropTypes.array,
  page: PropTypes.number,
  query: PropTypes.string,
  largeImage: PropTypes.string,
  imgTags: PropTypes.string,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
};
export default App;
