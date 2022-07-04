import React, { Component } from 'react';
import Header from '../components/Header';
import Links from '../components/Links';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Links />
        <Header />
        <h3>Favoritas</h3>
      </div>
    );
  }
}
