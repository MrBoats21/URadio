import { arrayOf, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../style/components/musicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checkedValidation: false,
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
    const { music } = this.props;
    const { checkedValidation } = this.state;
    if (checkedValidation) {
      await removeSong(music);
      this.setState({
        checkedValidation: false,
      });
    } else {
      await addSong(music);
      this.setState({
        checkedValidation: true,
      });
    }
    const { updateList } = this.props;
    updateList();
  }

  render() {
    const { name, audio, trackId } = this.props;
    const { checkedValidation } = this.state;
    return (
      <div className="music">
        <h3 className="music-name">{ name }</h3>
        <audio src={ audio } controls>
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
