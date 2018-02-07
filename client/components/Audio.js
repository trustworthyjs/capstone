import React, { Component } from 'react'
import Sound from 'react-sound'

const mp3sObject = {
  piano: '/audio/piano.mp3',
  guitar: '/audio/guitar.mp3',
  beach: '/audio/beach.mp3',
  rain: '/audio/rain.mp3',
}

class Audio extends Component {

  render () {

    let urlVar = mp3sObject[this.props.music] ? mp3sObject[this.props.music] : ''

    return (
      <Sound
        url={urlVar}
        playStatus={Sound.status.PLAYING}
        loop={true}
        volume={100}
      />
    )
  }
}

export default Audio
