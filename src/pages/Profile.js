import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nome: '',
      email: '',
      descricao: '',
      imagem: '',
    };
  }

  componentDidMount() {
    this.chamarAPI();
  }

  chamarAPI = async () => {
    this.setState({ loading: false });
    const nameLogin = this.props;
    const infos = await getUser(nameLogin);
    this.set(infos);
  }

  set = (infos) => {
    this.setState({
      loading: false,
      nome: infos.name,
      email: infos.email,
      descricao: infos.description,
      imagem: infos.image,
    });
  }

  render() {
    const { loading, nome, email, descricao, imagem } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-profile">
            <Header />
            <Link to="/profile/edit">Editar perfil</Link>
            <h1>{ nome }</h1>
            <h1>{ email }</h1>
            <h1>{ descricao }</h1>
            <img alt={ imagem } src={ imagem } data-testid="profile-image" />
          </div>
        )
    );
  }
}

export default Profile;
