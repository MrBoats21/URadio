import React, { Component } from 'react';
import PropType from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
  }

  componentDidMount() {
    this.showFavoriteMusics();
  }

  showFavoriteMusics = async () => {
    const { data } = this.props;
    const favoriteMusics = await getFavoriteSongs();
    const haveFavorite = favoriteMusics.some((music) => music.trackId === data.trackId);
    if (haveFavorite) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
  }

  favoriteMusic = async (event) => {
    this.setState({
      favorite: true,
      loading: true,
    });

    const { trackId } = this.props;

    if (event.target.checked === true) {
      await addSong(await getMusics(trackId));
    } else {
      this.setState({ favorite: false });
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { favorite, loading } = this.state;
    const { name, previewUrl, trackId } = this.props;

    return (
      <div>
        { loading ? <Loading /> : (
          <div className="music">
            <span>{name}</span>
            <div className="audio">
              <label htmlFor="favorite">
                ♥
                <input
                  type="checkbox"
                  name="favorite"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favorite }
                  onChange={ this.favoriteMusic }
                />
              </label>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropType.string,
  previewUrl: PropType.string,
  trackId: PropType.number,
  song: PropType.arrayOf(PropType.string),
}.isRequired;
