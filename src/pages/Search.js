import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../style/pages/login.css';
import '../style/pages/search.css';

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
          <h2>
            {`Resultado de: ${search}`}
          </h2>
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
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                        className="album-cover"
                      />
                    </Link>
                    <div className="info">
                      <h2 className="album-name">
                        {`${collectionName}`}
                      </h2>
                      <h3 className="artist-name">
                        {`${artistName}`}
                      </h3>
                    </div>
                  </div>))

          }
        </div>
      </div>
    );
  }
}
