import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react'
import { submitEntryDb, toggleSubmitPopupThunk, createNotebookDb } from '../store'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {red500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


const styles = {
  menuStyle: {
    padding: 0
  }
}

class SubmitEntryPopup extends Component {

  state = {
      value: 1,
      notebookColorValue: 'red',
      newNotebookName: '',
      entryTitle: ''
  }

  handleNotebookSelection = (event, index, value) => {
    this.setState({value})
    let currentClassName = document.getElementById("addNotebookField").className = "toggleOff"
  }

  handleNotebookColorChange = (event, index, value) => this.setState({notebookColorValue: value})
  handleNewNotebookNameChange = event => this.setState({newNotebookName: event.target.value})
  handleEntryTitleChange = event => this.setState({entryTitle: event.target.value})

  toggleSubmitPopup = () => {
    let currentState = this.props.showSubmitPopup
    this.props.setSubmitPopup(!currentState)
  }

  submitEntry = (evt) => {
    evt.preventDefault()
    let notebookId = +this.state.value
    let entryToSave = {}
    if (this.state.entryTitle) {
      entryToSave = {
        id: this.props.entry.id,
        title: this.state.entryTitle,
        content: this.props.entry.content,
        formattedContent: this.props.entry.formattedContent,
        notebookId,
        submitted: true,
        mode: this.props.entry.mode
      }
    } else {
      entryToSave = {
        id: this.props.entry.id,
        content: this.props.entry.content,
        formattedContent: this.props.entry.formattedContent,
        notebookId,
        submitted: true,
        mode: this.props.entry.mode
      }
    }

    this.props.submitEntry(entryToSave, notebookId, this.props.userId)
    this.toggleSubmitPopup()
   }

  handleNewNotebookClick = (evt) => {
    evt.preventDefault()
    this.setState({
      value: 1
    })
    let currentClassName = document.getElementById("addNotebookField").className
    currentClassName.includes("Off") ? document.getElementById("addNotebookField").className = "toggleOn" : document.getElementById("addNotebookField").className = "toggleOff"
  }

  saveNotebook = (evt) => {
    evt.preventDefault()
    if (this.state.newNotebookName.trim() !== '') {
      let notebook = {
        title: this.state.newNotebookName,
        cover: this.state.notebookColorValue,
        userId: this.props.userId
      }
      this.props.createNewNotebook(notebook)
      // code for getting the new notebook to show up as the default value in the dropdown menu - doesn't work currently
      // .then((action) => {
      //     this.setState({
      //       value: action.notebook.id
      //     })
      // })
      document.getElementById('addNotebookField').className = 'toggleOff'
    } else {
      document.getElementById('submitError').className = 'toggleOn'
    }
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
      style={{color: '#1595A3'}}
        onClick={this.toggleSubmitPopup}
      />,
      <FlatButton
        label="Submit"
      style={{color: '#1595A3'}}
        keyboardFocused={true}
        onClick={this.submitEntry}
      />,
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.showSubmitPopup}
          onRequestClose={this.handleClose}
        >
          <div className="submit-popup-div">
            <div>Select a notebook to submit your entry to:</div>
              <div id="submit-menu-button">
                { this.props.notebooks.length > 0 ?
                  <DropDownMenu
                      menuStyle={styles.menuStyle}
                      value={this.state.value}
                      onChange={this.handleNotebookSelection}>
                    <MenuItem disabled={true} value={1} primaryText="Select A Notebook" />
                    {this.props.notebooks.map(notebook =>
                    <MenuItem value={notebook.id} key={notebook.id} primaryText={notebook.title} /> )}
                  </DropDownMenu> : <div>You don't have any existing notebooks</div>
                }
                <br />
                <FlatButton
                  onClick={this.handleNewNotebookClick}
                  label="Create New Notebook"
                  secondary={true}
                  icon={<ContentAdd />}
                /><br />
              </div>
          </div>

          <div className="submit-popup-div">
            <div>Enter entry title:</div>
            <TextField
                  hintText="Default value is today's date."
                  onChange={this.handleEntryTitleChange}
                  id="entry-title"
            />
          </div>

          <div id="addNotebookField" className="toggleOff">
              <div>Enter notebook name:</div>
              <TextField
                onChange={this.handleNewNotebookNameChange}
                id="notebook-name"
              /><br />
              <div className="toggleOff" id="submitError">This field is required.</div>
              <div>Cover color:</div>
              <DropDownMenu
                menuStyle={styles.menuStyle}
                value={this.state.notebookColorValue}
                onChange={this.handleNotebookColorChange} >
                  <MenuItem disabled={true} primaryText="Select A Color" />
                  <MenuItem value={'red'} primaryText="Red" />
                  <MenuItem value={'green'} primaryText="Green" />
                  <MenuItem value={'blue'} primaryText="Blue" />
                  <MenuItem value={'yellow'} primaryText="Yellow" />
              </DropDownMenu><br />
              <RaisedButton
                label="Create new notebook"
                primary={true}
                onClick={this.saveNotebook}
              />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    notebooks: state.notebooks,
    showSubmitPopup: state.submitPopup,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    submitEntry: (editedEntry, notebookId, userId) => {
      dispatch(submitEntryDb(editedEntry, notebookId, ownProps.history, userId))
    },
    setSubmitPopup: (state) => {
      dispatch(toggleSubmitPopupThunk(state))
    },
    createNewNotebook: (notebook) => {
      return dispatch(createNotebookDb(notebook))
    }
  }
}

export default connect(mapState, mapDispatch)(SubmitEntryPopup)
