import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../style/pages/profile.css';

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
      loading ? null
        : (
          <div className="user-info">
            <Header />
            <Link to="/profile/edit" className="edit-btn">Editar perfil</Link>
            <div className="full-profile">
              <img alt={ imagem } src={ imagem } className="user-img" />
              <div className="info-card">
                <h1 className="user-name">{ nome }</h1>
                <h2 className="user-email">{ email }</h2>
                <p className="bio">
                  Descrição:
                  <br />
                  <br />
                  { descricao }
                </p>
              </div>
            </div>
          </div>
        )
    );
  }
}

export default Profile;
