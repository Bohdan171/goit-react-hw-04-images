import { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "./Modal/Modal";

import galeryAPI from '../services/galery-api';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [imagesHits, setImagesHits] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);


  useEffect(() => {
    
    if (!searchName) {
      return;
    }

    setStatus('pending');

    galeryAPI.fetchGalery(searchName, page)
      .then(imagesHits => setImagesHits(state => [ ...state, ...imagesHits.hits],
          setStatus('resolved'),
      ))
        }, [searchName, page])
  
  const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('Нажали ESC, нужно закрыть модалку');

        toggleModal();
     }

  }

  const handleIncrement = () => {
      setPage(state => state + 1)
    }



  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setImagesHits([]);
  }

  const toggleModal = (modalPhoto) => {
    setShowModal(state => !state);

    setModalPhoto(modalPhoto);
  }

  const modalBackdropClick = evt => {
    // console.log('кликнули в бекдроп');

    // console.log('evt.CurrentTarget ', evt.currentTarget);
    // console.log('evt.Target ', evt.target);

    if (evt.currentTarget === evt.target) {
      toggleModal();
    }

  }

  return (
      <main className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        {imagesHits && <ImageGallery items={imagesHits} toggleModal={toggleModal} />}
        {imagesHits.length > 0 && status !== 'pending' && <Button onIncrement={handleIncrement} >Load more</Button>}
        {status === 'pending' && <Loader />}
      {showModal && <Modal modalPhoto={modalPhoto} modalBackdropClick={modalBackdropClick} handleKeyDown={handleKeyDown} />}
      </main>
    );
  
}

