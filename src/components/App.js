import React, { Component } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { fetchImg } from '../services/PixabayApi';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
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

  render() {
    const { images } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
      </div>
    );
  }
}

export default App;
