import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userData: '',
  }

  componentDidMount = async () => {
    const userData = await getUser();
    this.setState({
      userData,
    });
  }

  render() {
    const {
      userData,
    } = this.state;

    return (
      <header data-testid="header-component">
        { !userData ? <Loading />
          : (
            <>
              <div id="greetings">
                <h1>TrybeTunes</h1>
                <p data-testid="header-user-name">
                  {`Olá, ${userData.name}`}
                </p>
              </div>
              <div className="links">
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
            </>
          )}
      </header>
    );
  }
}
