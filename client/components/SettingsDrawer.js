import React from 'react'
import {connect} from 'react-redux'
import {saveEntryDb, updateValues} from '../store'
import Toggle from 'material-ui/Toggle'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export class SettingsDrawer extends React.Component {
  state = {
    height: this.props.height,
    left: this.props.left,
    top: this.props.top,
    open: false,
    editorPrompt: null,
    display: false
  };

  componentDidMount() {
    this.setState({editorPrompt: document.getElementById('editor-with-settings')})
  }

  getSettings = () => {
    const defaultSettings = {
      settings: {
        timer: false,
        wordCount: false,
        prompts: false,
        visualCues: false,
        music: false,
        zoomIn: false
      }
    }
    if (this.props.singleEntry.content) {
      var checkSettings = {};
      if (this.props.singleEntry.settings){
        checkSettings = this.props.singleEntry.settings;
      } else {
        const updatedSettings = Object.assign({}, this.props.singleEntry, defaultSettings)
        this.props.dispatchUpdate(updatedSettings);
      }
      var entryMode = this.props.singleEntry.mode;
      return (
        <div>
          <div>
            <h5>Settings</h5>
            <button className="settings-icon" onClick={this.props.toggle} />
          </div>
          <div>
            {/* --------settings-------- */}
            <div className="setting">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="timer" checked={checkSettings.timer} onChange={this.handleChangeSettings}/>
                <label>Timer</label>
              </div>
              {checkSettings.timer && (
                <form onSubmit={this.handleSetTimer} style={{display: 'flex'}}>
                  <input type="text" name="minutes" style={{width: '15%'}}></input>
                  :
                  <input type="text" name="seconds" style={{width: '15%'}}></input>
                  <input type="submit" value="Set Timer" />
                </form>
              )}
            </div>
            <div className="setting">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="wordCount" checked={checkSettings.wordCount} onChange={this.handleChangeSettings}/>
                <label>Word Count</label>
              </div>
              {checkSettings.wordCount && (
                <form onSubmit={this.handleSetWordCount}>
                  <input type='text' name='wordCount' style={{width: '25%'}}/>
                  <input type='submit' value='Set Count' />
                </form>
              )}
            </div>
            <div className="ui toggle checkbox setting">
              <input type="checkbox" name="prompts" checked={checkSettings.prompts} onChange={this.handleChangeSettings}/>
              <label>Prompts</label>
            </div>
            <div className="ui toggle checkbox setting">
              <input type="checkbox" name="visualCues" checked={checkSettings.visualCues} onChange={this.handleChangeSettings}/>
              <label>Visual Cues</label>
            </div>
            <div className="ui toggle checkbox setting">
              <input type="checkbox" name="music" checked={checkSettings.music} onChange={this.handleChangeSettings}/>
              <label>Music</label>
            </div>
            {/*theme drop down menu - implemented later probably*/}
            <DropDownMenu>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
            </DropDownMenu>
            {/* --------mode radio buttons -------- */}
            <div className="ui form">
              <div className="radio-field">
                <div className="grouped fields">
                  <label>Change Mode: </label>
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
      )
    }
  }

  handleChangeSettings = (event) => {
    const settingToToggle = event.target.name
    let obj = {}
    obj[settingToToggle] = !this.props.singleEntry.settings[settingToToggle]
    const updatedSettings = Object.assign({}, this.props.singleEntry.settings, obj)
    const updatedEntry = Object.assign({}, this.props.singleEntry, {mode: 'custom', settings: updatedSettings})
    this.props.dispatchUpdate(updatedEntry);
  }

  handleModeChange = (event) => {
    const mode = event.target.name;
    const updatedEntry = Object.assign({}, this.props.singleEntry, {mode})
    this.props.dispatchUpdate(updatedEntry);
  }

  handleSetTimer = (event) => {
    event.preventDefault();
    const minutes = +event.target.minutes.value;
    const seconds = +event.target.seconds.value;
    const totalSeconds = minutes * 60 + seconds;
    this.props.dispatchSetTimer(totalSeconds);
  }

  handleSetWordCount = (event) => {
    event.preventDefault();
    const wordCount = +event.target.wordCount.value;
    this.props.dispatchSetWordCount(wordCount);
  }

  render() {
    const visible = this.props.visible ? 'visible' : 'hidden'

    const settings = this.getSettings();

    const editorPrompt = this.state.editorPrompt
    if (editorPrompt) {
      let domRect = editorPrompt.getBoundingClientRect();
      return (
        <div style={{height: domRect.height,
                      width: "225px",
                      overflowY: 'auto',
                      right: 0,
                      top: 0,
                      position: 'absolute',
                      zIndex: 5,
                      backgroundColor: "#e8e8e8",
                      boxShadow: "-3px 0px 5px -2px",
                      border: "1px solid #e8e8e8",
                      visibility: visible
                    }}
        >
        {settings}

        </div>
      );
    } else {
      return null;
    }
  }
}

const mapState = ({singleEntry}) => ({singleEntry})

const mapDispatch = dispatch => {
  return {
    dispatchUpdate: (updatedEntry => {
      dispatch(saveEntryDb(updatedEntry))
    }),
    dispatchSetTimer: (timeInSeconds => {
      dispatch(updateValues({timer: timeInSeconds}))
    }),
    dispatchSetWordCount: (wordCount => {
      dispatch(updateValues({wordCount}))
    })
  }
}

export default connect(mapState, mapDispatch)(SettingsDrawer)
