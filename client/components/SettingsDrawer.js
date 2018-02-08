import React from 'react'
import {connect} from 'react-redux'
import {saveEntryDb, updateValues, updateUserTheme} from '../store'
import Toggle from 'material-ui/Toggle'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui'
import {Audio} from './'

export class SettingsDrawer extends React.Component {
  state = {
    left: this.props.left,
    top: this.props.top,
    open: false,
    editorPrompt: null,
    display: false
  };

  componentDidMount() {
    this.setState({ editorPrompt: document.getElementById('editor-with-settings') })
  }

  getSettings = () => {
    const defaultSettings = {
      settings: {
        timer: false,
        wordCount: false,
        prompts: false,
        visualCues: false,
        music: 'none',
        zoomIn: false
      }
    }

    let minutes = []
    let seconds = []
    for (let i = 0; i < 60; i++) {
      if (i <= 30) minutes.push(i);
      seconds.push(i);
    }

    if (this.props.singleEntry.id) {

      var checkSettings = {};
      if (this.props.singleEntry.settings) {
        checkSettings = this.props.singleEntry.settings;
        const entryMode = this.props.singleEntry.mode;
        return (
          <div
            className="settings-drawer"
            style={{height: 'max-content'}}
          >
            <div
              style={{padding: '10px', height: '60vh', overflowY: 'auto'}}
            >
              <h4 style={{fontWeight: 'bold'}}>Settings</h4>
            <div>
              <div className="setting">
                <label>Select a theme: </label>
                <div className="ui compact menu">
                  <div className="ui simple dropdown item">
                    {this.props.user.theme}
                    <i className="dropdown icon"></i>
                    <div className="menu">
                      {['basic', 'pirate', 'beach', 'forest', 'mountains'].map(theme => {
                        if (theme !== this.props.user.theme){
                          return (
                            <div
                              key={theme}
                              name={theme}
                              value={theme}
                              className="input-font item"
                              onClick={this.handleChangeTheme}>
                                {theme}
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* --------settings-------- */}
              <div>
                <div className="setting">
                  <div className="ui toggle checkbox">
                    <input type="checkbox" name="timer" checked={checkSettings.timer} onChange={this.handleChangeSettings}/>
                    <label>Timer</label>
                  </div>
                  {checkSettings.timer &&
                    this.props.visible && (
                    <div className="set-setting">
                      <select className="input-font ui dropdown" onChange={this.handleSetTimerMinutes}>
                          {minutes.map((minute) => {
                            if (Math.floor(this.props.editorValues.timer / 60) === minute) {
                              return (
                                <option key={minute} value={minute} selected="selected">{minute}</option>
                              )
                            } else {
                              return (
                                <option key={minute} value={minute}>{minute}</option>
                              )
                            }
                          })}
                      </select>
                      <span>:</span>
                      <select className="input-font ui dropdown" onChange={this.handleSetTimerSeconds}>
                          {seconds.map((second) => {
                            if (Math.floor(this.props.editorValues.timer % 60) === second) {
                              return (
                                <option key={second} value={second} selected="selected">{`0${second}`.slice(-2)}</option>
                              )
                            } else {
                              return (
                                <option key={second} value={second}>{`0${second}`.slice(-2)}</option>
                              )
                            }
                          })}
                      </select>
                    </div>
                  )}
                </div>
                <div className="setting">
                  <div className="ui toggle checkbox">
                    <input type="checkbox" name="wordCount" checked={checkSettings.wordCount} onChange={this.handleChangeSettings}/>
                    <label>Word Count</label>
                  </div>
                  {checkSettings.wordCount && (
                    <form onSubmit={this.handleSetWordCount} className="set-setting">
                      <div className="input-font ui input focus" style={{width: '35%', marginLeft: '0', marginTop: '0', marginBottom: '0', marginRight: '15px'}}>
                        <input className="input-font" type='text' name='wordCount' />
                      </div>
                      <input className='input-font ui primary basic button' type='submit' value='Set'/>
                    </form>
                  )}
                </div>
                <div className="ui toggle checkbox setting">
                  <input type="checkbox" name="prompts" checked={checkSettings.prompts} onChange={this.handleChangeSettings}/>
                  <label>Prompts</label>
                </div>

                <div className="setting">
                  <label>Select background music: </label>
                  <div className="ui compact menu">
                    <div className="ui simple dropdown item">
                      {this.props.singleEntry.settings.music}
                      <i className="dropdown icon"></i>
                      <div className="menu">
                        {['none', 'piano', 'guitar', 'beach', 'rain'].map(music => {
                          if (this.props.singleEntry.settings) {
                            if (music !== this.props.singleEntry.settings.music) {
                              return (
                                <div
                                  key={music}
                                  name='music'
                                  value={music}
                                  className="input-font item"
                                  onClick={this.handleChangeMusic}>
                                  {music}
                                </div>
                              )
                            }
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------mode radio buttons -------- */}
                <div className="ui form">
                  <div className="radio-field">
                    <div className="grouped fields">
                      <label className="input-font">Change Mode: </label>
                      <div className="field">
                        <div className="ui radio checkbox">
                          <input type="radio" name="freeWrite" onChange={this.handleModeChange} checked={entryMode === 'freeWrite'}/>
                          <label>Free Write</label>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui radio checkbox">
                          <input type="radio" name="mindfulJournal" onChange={this.handleModeChange} checked={entryMode === 'mindfulJournal'}/>
                          <label>Mindful Journal</label>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui radio checkbox">
                          <input type="radio" name="custom" onChange={this.handleModeChange} checked={entryMode === 'custom'}/>
                          <label>Custom</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      } else if (this.props.singleEntry.id) {
        const updatedSettings = Object.assign({}, this.props.singleEntry, defaultSettings)
        this.props.dispatchUpdate(updatedSettings);
      }
    }
  }

  handleChangeSettings = (event) => {
    const settingToToggle = event.target.name
    let obj = {}
    obj[settingToToggle] = !this.props.singleEntry.settings[settingToToggle]
    const updatedSettings = Object.assign({}, this.props.singleEntry.settings, obj)
    const updatedEntry = Object.assign({}, this.props.singleEntry, { mode: 'custom', settings: updatedSettings })
    this.props.dispatchUpdate(updatedEntry);
  }

  handleModeChange = (event) => {
    const mode = event.target.name;
    const updatedEntry = Object.assign({}, this.props.singleEntry, { mode })
    this.props.dispatchUpdate(updatedEntry);
  }

  handleSetTimerMinutes = (event) => {
    event.preventDefault();
    const minutes = +event.target.value;
    const totalSeconds = minutes * 60 + this.props.editorValues.timer % 60;
    this.props.dispatchSetTimer(totalSeconds);
  }

  handleSetTimerSeconds = (event) => {
    event.preventDefault();
    const seconds = +event.target.value;
    const totalSeconds = seconds + this.props.editorValues.timer - this.props.editorValues.timer%60;
    this.props.dispatchSetTimer(totalSeconds);
  }

  handleSetWordCount = (event) => {
    event.preventDefault();
    const wordCount = +event.target.wordCount.value;
    this.props.dispatchSetWordCount(wordCount);
  }

  handleChangeTheme = (event) => {
    event.preventDefault();
    const newTheme = event.target.innerText
    this.props.dispatchChangeUserTheme(this.props.user.id, newTheme)
  }

  handleChangeMusic = (event) => {
    event.preventDefault()
    const newMusic = event.target.innerText
    let obj = {
      music: newMusic
    }
    const updatedSettings = Object.assign({}, this.props.singleEntry.settings, obj)
    const updatedEntry = Object.assign({}, this.props.singleEntry, { mode: 'custom', settings: updatedSettings })
    this.props.dispatchUpdate(updatedEntry)
  }

  render() {
    const visible = this.props.visible ? 'visible' : 'hidden'

    const settings = this.getSettings()

    let playMusic = false
    if (this.props.singleEntry.settings) {
      playMusic = this.props.singleEntry.settings.music !== 'none'
    }

    const editorPrompt = this.state.editorPrompt
    if (editorPrompt) {
      let domRect = editorPrompt.getBoundingClientRect();
      return (
        <div style={{
          height: domRect.height,
          width: "225px",
          overflowY: 'auto',
          right: 0,
          top: 0,
          position: 'absolute',
          zIndex: 5,
          backgroundColor: "#e8e8e8",
          border: "1px solid #e8e8e8",
          visibility: visible
        }}
        >
          {settings}
          {playMusic && <Audio music={this.props.singleEntry.settings.music} />}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapState = (state) => {
  return {
    singleEntry: state.singleEntry,
    user: state.user,
    editorValues: state.editorValues
  }
}

const mapDispatch = dispatch => {
  return {
    dispatchUpdate: (updatedEntry => {
      dispatch(saveEntryDb(updatedEntry))
    }),
    dispatchSetTimer: (timeInSeconds => {
      dispatch(updateValues({ timer: timeInSeconds }))
    }),
    dispatchSetWordCount: (wordCount => {
      dispatch(updateValues({wordCount}))
    }),
    dispatchChangeUserTheme: (userId, newTheme) => {
      dispatch(updateUserTheme(userId, newTheme))
    }
  }
}

export default connect(mapState, mapDispatch)(SettingsDrawer)
