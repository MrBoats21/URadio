import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../style/pages/login.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: '',
      search: '',
      loading: false,
      result: false,
      albumResults: [],
      showAlbuns: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchAlbum = async (e) => {
    e.preventDefault();
    const { info } = this.state;
    this.setState({ loading: true });
    this.setState({ albumResults: await searchAlbumsAPI(info), result: true });
    this.setState({ loading: false, search: info });
    this.setState({ info: '', showAlbuns: true });
  }

  render() {
    const { info,
      loading,
      result,
      search,
      albumResults,
      showAlbuns } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <Header />
        <div>
          <form className="form">
            <input
              type="text"
              className="input1 it"
              placeholder="Artista / Álbum"
              value={ info }
              onChange={ (event) => {
                this.setState({
                  info: event.target.value,
                });
              } }
            />
            <button
              className="submit it"
              type="submit"
              disabled={ info.length < 2 }
              onClick={ this.searchAlbum }

            >
              Encontrar
            </button>
          </form>
        </div>
        { result && (
          <h3>
            {`Resultado de álbuns de: ${search}`}
          </h3>
        ) }
        <div className="album-list">
          {
            (albumResults.length === 0 && showAlbuns)
              ? <h3>Nenhum álbum foi encontrado</h3>
              : albumResults
                .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
                  <div key={ collectionId } className="album-list-item">
                    <Link
                      to={ `/album/${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                    </Link>
                    <h4>
                      {`Álbum: ${collectionName}`}
                    </h4>
                    <h5>
                      {`Artista: ${artistName}`}
                    </h5>

                  </div>))

          }
        </div>
      </div>
    );
  }
}
