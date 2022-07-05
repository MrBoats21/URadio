import React, { Component } from 'react';
import PropType from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { name, previewUrl } = this.props;

    return (
      <div className="music">
        <span>{name}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropType.string.isRequired,
  previewUrl: PropType.string.isRequired,
};
