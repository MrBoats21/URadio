import { shape } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
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
    // this.setState({
    //   loadingDisplay: true,
    // });
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    // console.log(tracks);
    this.setState({
      tracksList: tracks.slice(1),
      albumName: tracks[0].collectionName,
      artistName: tracks[0].artistName,
      // loadingDisplay: false,
    });
  }

  updateList = () => {
    console.log(this.state);
  }

  render() {
    const { tracksList, albumName, artistName, loadingDisplay,
      favoriteSongs } = this.state;

    return (
      <div>
        <Header />
        { loadingDisplay
          ? <Loading />
          : (
            <div>
              <p>{ artistName }</p>
              <h2>{ albumName }</h2>
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
