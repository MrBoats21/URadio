import React, { Component } from 'react';
import Header from '../components/Header';
import Links from '../components/Links';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Links />
        <Header />
        <h3>Editar Perfil</h3>
      </div>
    );
  }
}
