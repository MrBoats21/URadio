import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    music: '',
  }

  render() {
    const { music } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h3>Pesquisa</h3>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome da música"
            onChange={ (event) => this.setState({
              music: event.target.value,
            }) }
          />
          <input
            data-testid="search-artist-button"
            type="submit"
            value="Pesquisar"
            disabled={ music.length < 2 }
          />
        </form>
      </div>
    );
  }
}
