import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loadingDisplay: true,
    };
  }

  async componentDidMount() {
    const favs = await getFavoriteSongs();
    this.setState({
      favorites: favs,
      loadingDisplay: false,
    });
  }

  // componentDidUpdate() {
  //   this.updateList();
  // }

  updateList = async () => {
    this.setState({
      loadingDisplay: true,
    });
    const favs = await getFavoriteSongs();
    this.setState({
      favorites: favs,
      loadingDisplay: false,
    });
  }

  render() {
    const { loadingDisplay, favorites } = this.state;
    const musicList = favorites.map((favorite) => (
      <MusicCard
        key={ favorite.trackId }
        name={ favorite.trackName }
        audio={ favorite.previewUrl }
        trackId={ favorite.trackId }
        music={ favorite }
        favorites={ favorites }
        updateList={ this.updateList }
      />
    ));

    return (
      <div data-testid="page-favorites">
        <Header />
        { loadingDisplay ? <Loading /> : musicList }
      </div>
    );
  }
}

export default Favorites;
