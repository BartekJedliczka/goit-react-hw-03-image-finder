import React, { Component } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {};

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
