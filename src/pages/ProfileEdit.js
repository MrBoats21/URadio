import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
      loadingdisplay: true,
      // buttonDisabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      userName: user.name,
      userEmail: user.email,
      userDescription: user.description,
      userImage: user.image,
      loadingdisplay: false,
    });
  }

  onChangeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateButton = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    if (
      userName !== ''
      && userEmail.match(/\S+@\S+\.\S+/)
      && userDescription !== ''
      && userImage !== ''
    ) {
      return false;
    }
    return true;
  }

  buttonClickHandler = async () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const updateInput = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({
      loadingdisplay: true,
    });
    await updateUser(updateInput);
    const { history: { push } } = this.props;
    push('/profile');
  }

  render() {
    const { userName, userEmail, userDescription, userImage,
      loadingdisplay } = this.state;
    const editForm = (
      <form>
        <input
          placeholder="Nome"
          type="text"
          value={ userName }
          onChange={ this.onChangeHandler }
          name="userName"
        />
        <input
          placeholder="Email"
          type="text"
          value={ userEmail }
          onChange={ this.onChangeHandler }
          name="userEmail"
        />
        <input
          placeholder="Descrição"
          type="textarea"
          value={ userDescription }
          onChange={ this.onChangeHandler }
          name="userDescription"
        />
        <input
          placeholder="Url da imagem"
          type="text"
          value={ userImage }
          onChange={ this.onChangeHandler }
          name="userImage"
        />
        <button
          type="button"
          disabled={ this.validateButton() }
          onClick={ this.buttonClickHandler }
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div>
        <Header />
        { loadingdisplay ? null : editForm }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default ProfileEdit;
