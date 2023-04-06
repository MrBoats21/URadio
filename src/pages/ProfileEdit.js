import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
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
          data-testid="edit-input-name"
          value={ userName }
          onChange={ this.onChangeHandler }
          name="userName"
        />
        <input
          placeholder="Email"
          type="text"
          data-testid="edit-input-email"
          value={ userEmail }
          onChange={ this.onChangeHandler }
          name="userEmail"
        />
        <input
          placeholder="Descrição"
          type="textarea"
          data-testid="edit-input-description"
          value={ userDescription }
          onChange={ this.onChangeHandler }
          name="userDescription"
        />
        <input
          placeholder="Url da imagem"
          type="text"
          data-testid="edit-input-image"
          value={ userImage }
          onChange={ this.onChangeHandler }
          name="userImage"
        />
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ this.validateButton() }
          onClick={ this.buttonClickHandler }
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loadingdisplay ? <Loading /> : editForm }
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
