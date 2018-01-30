import React from 'react'
import {connect} from 'react-redux'
import {updateSettings} from '../store'
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
    if (this.props.singleEntry.settings) {
      var checkSettings = this.props.singleEntry.settings
      return (
        <div>
          <div>
            <h5>Settings</h5>
            <button className="settings-icon" onClick={this.props.toggle}/>
          </div>
          <div>
            <div>
              <div className="ui toggle checkbox">
                <label>Timer</label>
                <input type="checkbox" name="timer" checked={checkSettings.timer} onChange={this.changeSettings}/>
              </div>
              {checkSettings.timer && (
                <div style={{display: 'flex'}}>
                  <input name="minutes" style={{width: '15%'}}></input>
                  :
                  <input name="seconds" style={{width: '15%'}}></input>
                  <button onClick={() => {console.log('tryin to set the timer')}}>Set Timer</button>
                </div>
              )}
            </div>  
            <div className="ui toggle checkbox">
              <label>Word Count</label>
              <input type="checkbox" name="wordCount" checked={checkSettings.wordCount}/>
            </div>
            {checkSettings.wordCount && (
              <div>
                <input name='wordCount' style={{width: '25%'}}/>
                <button onClick={() => {console.log('tryin to set the count')}}>Set Count</button>
              </div>
            )}

            <div className="ui toggle checkbox">
              <label>Prompts</label>
              <input type="checkbox" name="public" checked={checkSettings.prompts}/>
            </div>
            {checkSettings.prompts && (
              <div>prompts</div>
            )}
            <div className="ui toggle checkbox">
              <label>Visual Cues</label>
              <input type="checkbox" name="public" checked={checkSettings.visualCues}/>
            </div>
            <div className="ui toggle checkbox">
              <label>Music</label>
              <input type="checkbox" name="public" checked={checkSettings.music}/>
            </div>
            <DropDownMenu>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
            </DropDownMenu>
          </div>
        </div>
      )
    }
  }

  changeSettings = (event) => {
    
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
    dispatchSettings: (settings => {
      dispatch(updateSettings(settings))
    })
  }
}

export default connect(mapState, mapDispatch)(SettingsDrawer)