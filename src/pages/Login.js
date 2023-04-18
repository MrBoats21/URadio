import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../style/pages/login.css';

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
      <div className="login-body">
        <div className="title">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3844/3844724.png"
            className="icon"
            alt="uradio-icon"
          />
          <h1>URadio</h1>
          <h3 className="greeting">Seja bem vindo!</h3>
        </div>
        { loading ? <Loading /> : (
          <form className="form">
            <input
              type="text"
              className="input1 it"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ (event) => this.setState({
                name: event.target.value,
              }) }
            />

            <button
              className="submit it"
              type="submit"
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
