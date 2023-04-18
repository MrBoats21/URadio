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
      <header>
        { !userData ? <Loading />
          : (
            <>
              <div className="greetings">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3844/3844724.png"
                  className="icon"
                  alt="uradio-icon"
                />
                <h1>URadio</h1>
                <p className="user">
                  {`Olá, ${userData.name}!`}
                </p>
              </div>
              <div className="links">
                <Link to="/search">
                  <p>Buscar</p>
                </Link>
                <Link to="/favorites">
                  <p>Favoritas</p>
                </Link>
                <Link to="/profile">
                  <p>Perfil</p>
                </Link>
              </div>
            </>
          )}
      </header>
    );
  }
}
