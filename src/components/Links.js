import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
  render() {
    return (
      <div id="header">
        <div>
          <h1>TRYBETUNES</h1>
        </div>
        <div>
          <Link to="/search">
            <p data-testid="link-to-search">Buscar</p>
          </Link>
          <Link to="/favorites">
            <p data-testid="link-to-favorites">Favoritas</p>
          </Link>
          <Link to="/profile">
            <p data-testid="link-to-profile">Perfil</p>
          </Link>
        </div>
      </div>
    );
  }
}
