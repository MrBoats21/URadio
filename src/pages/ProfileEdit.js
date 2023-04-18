import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../style/pages/profileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
      loadingdisplay: true,
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
      <form className="edit-form">
        <input
          className="edit-name"
          placeholder="Nome"
          type="text"
          value={ userName }
          onChange={ this.onChangeHandler }
          name="userName"
        />
        <input
          className="edit-email"
          placeholder="Email"
          type="text"
          value={ userEmail }
          onChange={ this.onChangeHandler }
          name="userEmail"
        />
        <input
          className="edit-description"
          placeholder="Descrição"
          type="textarea"
          value={ userDescription }
          onChange={ this.onChangeHandler }
          name="userDescription"
        />
        <input
          className="edit-img"
          placeholder="Url da imagem"
          type="text"
          value={ userImage }
          onChange={ this.onChangeHandler }
          name="userImage"
        />
        <button
          className="save-btn"
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
