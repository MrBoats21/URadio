import React, { Component } from 'react';
import Header from '../components/Header';
import Links from '../components/Links';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Links />
        <Header />
        <h3>Perfil</h3>
      </div>
    );
  }
}
