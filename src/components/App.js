import React, { Component } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { fetchImg } from '../services/PixabayApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    webformatURL: '',
  };

  onSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ images: [], page: 1, query }, () => {
        this.fetchQuery(query);
      });
    }
  };

  fetchQuery = async valueQuery => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetchImg(valueQuery, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...response],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 600);
    }
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchQuery(this.state.query);
    });
  };

  render() {
    const { images, isLoading, largeImageURL, showModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onShow={this.onShow} />
        {images.length && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.onClose} image={largeImageURL} />}
      </div>
    );
  }
}

export default App;
