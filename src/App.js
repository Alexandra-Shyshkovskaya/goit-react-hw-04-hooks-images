import React, { useState, useEffect } from 'react';
import style from "./App.module.css";
import searchApi from "./services/searchApi";
import Modal from "./components/Modal";
import SearchForm from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

const fetchPictures = () => {   
setLoading(true)
  searchApi(query, page)
   .then(newPictures => {
      setPictures([...pictures, ...newPictures])
      setPage(page + 1);
      }) 
    
    .catch(error => setError({ error: "Picture not found" }))
  .finally(() => setLoading(false));

};
   
  
  useEffect(() => {
    if (!query) {
      return;
    }
     fetchPictures();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  
 useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }); 

  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
    setError(null)
}

const toggleModal = () => {
    setShowModal(!showModal);
  };

const bigImage = largeImage => {
    setLargeImage( largeImage );
    toggleModal();
  };
  
 return (
  <div className={style.App}>
    <SearchForm onSubmit={onChangeQuery} />
    {error && <h1>{error}</h1>}
    <ImageGallery pictures={pictures} bigImage={bigImage} />
      {loading && <Loader />}
      {pictures.length > 11 && !loading && (
        <Button onClick={fetchPictures} />
      )}
      {showModal && (
        <Modal showModal={bigImage}>
          <img src={largeImage} alt={largeImage} />
        </Modal>
        )}
      </div>
    );
}
  


