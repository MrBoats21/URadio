import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Links from './Links';
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
              <Links />
            </>
          )}
      </header>
    );
  }
}
