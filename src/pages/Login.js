import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    loading: false,
    minLen: 3,
    done: false,
  }

  handleLogin = () => {
    const { name } = this.state;
    this.setState({ loading: true },
      async () => {
        await createUser({ name });
        this.setState({ loading: false, done: true });
      });
  }

  render() {
    const {
      name,
      loading,
      minLen,
      done,
    } = this.state;

    if (done) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form id="loginForm">
            <input
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ (event) => this.setState({
                name: event.target.value,
              }) }
            />

            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.handleLogin }
              disabled={ name.length < minLen }
            >
              Login
            </button>
          </form>
        )}
      </div>

    );
  }
}

export default Login;
