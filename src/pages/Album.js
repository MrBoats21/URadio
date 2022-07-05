import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    info: {},
    musics: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;

    const [info, ...musics] = await getMusics(id);

    this.setState({
      info,
      musics,
    });
  }

  render() {
    const { info, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">
          {info.artistName}
        </h2>
        <p data-testid="album-name">
          {info.collectionName}
        </p>
        {musics.map((music) => (
          <MusicCard
            name={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            key={ music.trackId }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.objectOf(PropType.any).isRequired,
};
