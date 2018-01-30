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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const singleEntry = this.props.singleEntry;

    const visible = this.props.visible ? 'visible' : 'hidden'

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
          <div>
            <h5>Settings</h5>
            <button className="settings-icon" onClick={this.props.toggle}/>
          </div>
          <div>
            <Toggle 
              label="Timer"
              defaultToggled={singleEntry.mode === "freeWrite"}
            />
            <Toggle 
              label="Word Count"
              defaultToggled={singleEntry.mode === "freeWrite"}
            />
            <Toggle 
              label="Visual Cues"
              defaultToggled={singleEntry.mode === "freeWrite"}
            />
            <Toggle 
              label="Music"
              defaultToggled={singleEntry.mode === "freeWrite"}
            />
            <Toggle 
              label="Zoom into Line"
              defaultToggled={singleEntry.mode === "freeWrite"}
            />
            <DropDownMenu>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
              <MenuItem value={'pirate'} primaryText="PIRATE"/>
            </DropDownMenu>
          </div>
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