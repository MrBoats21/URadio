import { arrayOf, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checkedValidation: false,
      loadingDisplay: false,
    };
  }

  componentDidMount() {
    const { favorites, trackId } = this.props;
    if (favorites.some((favorite) => favorite.trackId === trackId)) {
      this.setState({
        checkedValidation: true,
      });
    }
  }

  favoriteChangeHandler = async () => {
    this.setState({
      loadingDisplay: true,
    });
    const { music } = this.props;
    const { checkedValidation } = this.state;
    // console.log(music);
    if (checkedValidation) {
      await removeSong(music);
      this.setState({
        checkedValidation: false,
        loadingDisplay: false,
      });
    } else {
      await addSong(music);
      this.setState({
        checkedValidation: true,
        loadingDisplay: false,
      });
    }
    const { updateList } = this.props;
    updateList();
  }

  render() {
    const { name, audio, trackId } = this.props;
    const { loadingDisplay, checkedValidation } = this.state;
    return (
      <div>
        <h3>{ name }</h3>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <form>
          <label htmlFor={ `checkbox-music-${trackId}` } id="favorita">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favoriteChangeHandler }
              checked={ checkedValidation }
              name={ `checkbox-music-${trackId}` }
              aria-labelledby="favorita"
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: string.isRequired,
  audio: string.isRequired,
  trackId: number.isRequired,
  music: shape({}).isRequired,
  favorites: arrayOf(shape({})).isRequired,
  updateList: func.isRequired,
};

export default MusicCard;
