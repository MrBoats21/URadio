import React, { Component } from 'react';
import Header from '../components/Header';
import Links from '../components/Links';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Links />
        <Header />
        <h3>Pesquisa</h3>
      </div>
    );
  }
}
