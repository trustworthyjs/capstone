import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'quill'
import { setTimeout, clearTimeout } from 'timers';
import ReactDOM from 'react-dom';
import { getEntryDb, createEntryDb, saveEntryDb } from '../store'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
      dialogOpen: true
    }
    this.handleModeSelection = this.handleModeSelection.bind(this);

  }

  componentDidMount() {
    var options = {
      //debug: 'info',
      placeholder: 'Start writting...',
      theme: 'snow'

    };
    var editor = new Quill('.editor', options);

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
            if (range.length == 0) {
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

  handleModeSelection(event) {
    const mode = event.target.name
    console.log('mode selected: ',mode)
    //this will need to be hooked up with a prompt from the landing page to determine which notebook (old or new) it goes into
    this.props.createEntry({
      mode
    })
    this.setState({dialogOpen: false})
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
    };
    // const actions = [
      
    // ];
    return (
      <div>
        <Dialog 
          title="Choose your writing mode..."
          open={this.state.dialogOpen}>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <button className="mode-btn" id="free-write-btn" name="freeWrite" onClick={this.handleModeSelection}>
              <div className="mode-btn-label">Free Writing</div>
            </button>
            <button className="mode-btn" id="mindful-journal-btn" name="mindfulJournal" onClick={this.handleModeSelection}>
              <div className="mode-btn-label">Mindfulness Journal</div>
            </button>
            <button className="mode-btn" id="custom-btn" name="custom" onClick={this.handleModeSelection}>
              <div className="mode-btn-label">Custom</div>
            </button>
          </div>
        </Dialog>
        <div className="editor-prompt">
          <h3>Welcome, {email}</h3>
          {this.state.showPopup &&
            <div className="popup" style={styles}>
              What did you do today?
          </div>
          }
          <div className="editor" />
        </div>
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
    singleEntry: state.singleEntry
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
