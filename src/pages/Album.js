import React, { Component } from 'react';
import Header from '../components/Header';
import Links from '../components/Links';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Links />
        <Header />
        <h3>Album</h3>
      </div>
    );
  }
}
