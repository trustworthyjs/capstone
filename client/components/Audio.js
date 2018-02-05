import React, { Component } from 'react'
import Sound from 'react-sound'

const mp3sObject = {
  piano: '/audio/piano.mp3',
  guitar: '/audio/guitar.mp3',
  beach: '/audio/beach.mp3',
  rain: '/audio/rain.mp3'
}

class Audio extends Component {

  render () {

    return (
      <Sound
      url={mp3sObject[this.props.music]}
      playStatus={Sound.status.PLAYING}
      loop={true}
      volume={100}
      />
    )
  }
}

export default Audio
