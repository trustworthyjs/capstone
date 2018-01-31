import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'quill'
import { setTimeout, clearTimeout } from 'timers';
import { getEntryDb, createEntryDb, saveEntryDb, toggleSubmitPopupThunk } from '../store'
import {default as SubmitEntryPopup} from './SubmitEntryPopup'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router'
import SettingsDrawer from './SettingsDrawer'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: null,
      showPopup: false,
      bounds: {},
      strokeSinceSave: 0,
      editor: '',
      entryToSubmit: {},
      dialogOpen: true,
      settingsOpen: false
    }

  }

  setEditor(editor) {
    this.setState({editor})
  }

  componentDidMount() {
    var toolbarOptions = [
      { 'size': ['small', false, 'large', 'huge'] },
      'bold', 'italic', 'underline',
      { 'list': 'ordered'}, { 'list': 'bullet' },
      'link'
    ]
    var options = {
      //debug: 'info',
      placeholder: 'Start writing...',
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow',
    }
    var editor = new Quill('.editor', options);
    this.setEditor(editor)
    //disable delete
    editor.keyboard.addBinding({
      key: 'Backspace',
      shiftKey: null,
      handler: function (range, context) {
        //do nothing
      }
    });

    //disable selections and cursor change
    editor.on('selection-change', function (range, oldRange, source) {
      if (range) {
        editor.getLength() - 1 !== range.index && editor.blur()
      }
    });

    //disable spellcheck
    editor.root.spellcheck = false;
    editor.root.focus();
    editor.root.blur();

    let userHome = this
    editor.on('text-change', function (delta, oldDelta, source) {
      const { timeout } = userHome.state
      clearTimeout(timeout)
      userHome.setState({
        showPopup: false,
        strokeSinceSave: userHome.state.strokeSinceSave + 1
      })
      //get the text and formatted text, send it through a thunk
      if (userHome.state.strokeSinceSave > 10) {
        let editedEntry = {
          id: +userHome.props.singleEntry.id,
          content: editor.getText(),
          formattedContent: editor.getContents().ops[0].insert
        }
        userHome.props.saveEntry(editedEntry)
        userHome.setState({
          strokeSinceSave: 0
        })
      }
      userHome.setState({
        timeout: setTimeout(() => {
          var range = editor.getSelection()
          if (range) {
            if (range.length === 0) {
              userHome.setState({
                bounds: editor.getBounds(range.index)
              })
            } else {
              var text = editor.getText(range.index, range.length);
            }
          }
          userHome.setState({
            showPopup: true
          })
        }, 3000)
      })
    });
  }

  toggleSubmitPopup = () => {
    let currentState = this.props.showSubmitPopup
    this.props.setSubmitPopup(!currentState)
    let editedEntry = {
      id: +this.props.singleEntry.id,
      content: this.state.editor.getText(),
      formattedContent: this.state.editor.getContents().ops[0].insert,
      mode: this.props.singleEntry.mode
    }
    this.setState({ entryToSubmit: editedEntry })
  }

  handleModeSelection = (event) => {
    const mode = event.target.name
    console.log('mode selected: ', event.target)
    //this will need to be hooked up with a prompt from the landing page to determine which notebook (old or new) it goes into
    this.props.createEntry({
      mode
    })
    this.setState({dialogOpen: false})
  }

  toggleSettingsVisible = () => {
    this.setState({settingsOpen: !this.state.settingsOpen})
  }

  render() {
    const { email } = this.props
    const { bounds } = this.state
    const styles = {
      top: bounds.top + 220,    // computed based on child and parent's height
      left: bounds.left + 10,   // computed based on child and parent's width
      right: bounds.right - 20,
      bottom: bounds.bottom + 300,
      backgroundColor: 'orange'
    }
    const SubmitEntryPopupWithRouter = withRouter(SubmitEntryPopup)
    const modeDialog = (
      <Dialog
        title="Choose your writing mode..."
        open={this.state.dialogOpen}>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <button className="mode-btn" id="free-write-btn" name="freeWrite" onClick={this.handleModeSelection}>
            <div className="mode-btn-label" name="freeWrite" onClick={this.handleModeSelection}>Free Writing</div>
          </button>
          <button className="mode-btn" id="mindful-journal-btn" name="mindfulJournal" onClick={this.handleModeSelection}>
            <div className="mode-btn-label" name="mindfulJournal" onClick={this.handleModeSelection}>Mindfulness Journal</div>
          </button>
          <button className="mode-btn" id="custom-btn" name="custom" onClick={this.handleModeSelection}>
            <div className="mode-btn-label" name="custom" onClick={this.handleModeSelection}>Custom</div>
          </button>
        </div>
      </Dialog>
    )

    return (
      <div>
        {modeDialog}
        <div id="editor-with-settings" className="editor-submit-button">
          <div className="editor-prompt">
            {this.state.showPopup &&
              <div className="popup" style={styles}>
                What did you do today?
            </div>
            }
            <div className="editor" />
            </div>
          <button className="settings-icon" onClick={this.toggleSettingsVisible} />
          <SettingsDrawer toggle={this.toggleSettingsVisible} visible={this.state.settingsOpen} />
        </div>
        <RaisedButton label="Submit Entry" onClick={this.toggleSubmitPopup} className="editor-submit-button" />
        {this.props.showSubmitPopup &&
          <SubmitEntryPopupWithRouter entry={this.state.entryToSubmit} />
        }
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    singleEntry: state.singleEntry,
    showSubmitPopup: state.submitPopup
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntry: (entryId) => {
      dispatch(getEntryDb(entryId))
    },
    createEntry: (newEntry) => {
      dispatch(createEntryDb(newEntry))
    },
    saveEntry: (editedEntry) => {
      dispatch(saveEntryDb(editedEntry))
    },
    setSubmitPopup: (state) => {
      dispatch(toggleSubmitPopupThunk(state))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
