import { shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracksList: [],
      albumName: '',
      artistName: '',
      loadingDisplay: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.getTracks();
    const favorites = await getFavoriteSongs();
    console.log(favorites);
    this.setState({
      favoriteSongs: favorites,
      loadingDisplay: false,
    });
  }

  getTracks = async () => {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    this.setState({
      tracksList: tracks.slice(1),
      albumName: tracks[0].collectionName,
      artistName: tracks[0].artistName,
    });
  }

  updateList = () => {
    console.log(this.state);
  }

  render() {
    const { tracksList, albumName, artistName, loadingDisplay,
      favoriteSongs } = this.state;

    return (
      <div className="full-page">
        <Header />
        { loadingDisplay
          ? null
          : (
            <div className="album-body">
              <h3 className="album-info">{ artistName }</h3>
              <h1 className="album-info">{ albumName }</h1>
              { tracksList.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  name={ song.trackName }
                  audio={ song.previewUrl }
                  trackId={ song.trackId }
                  music={ song }
                  favorites={ favoriteSongs }
                  updateList={ this.updateList }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({}).isRequired,
};

export default Album;
