import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react'
import { saveEntryDb, toggleSubmitPopupThunk, createNotebookDb } from '../store'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  errorStyle: {
    color: blue500,
  }
}


//class NonReactComponent {
//  constructor(name, greeting) {
//    this.name = name
//    this.greeting = greeting
//  }
//
//  render () {
//    console.log(`${this.greeting} ${this.world}`)
//  }
//}
//
//function NonReactComponent (name, greeting) {
//  this.name = name
//  this.greeting = greeting
//}
//
//NonReactComponent.prototype.render = function () {
//  console.log(`${this.greeting} ${this.world}`)
//}
//
//thing = new NonReactComponent('collin', 'hello')
//thing.render()


class SubmitEntryPopup extends Component {
  state = {
    value: 1,
    notebookColorValue: '',
    newNotebookName: ''
  }

  handleNotebookSelection = (event, index, value) => this.setState({value})
  handleNotebookColorChange = (event, index, value) => this.setState({notebookColorValue: value})
  handleNewNotebookNameChange = event => this.setState({newNotebookName: event.target.value})

  toggleSubmitPopup  = () => {
    let currentState = this.props.showSubmitPopup
    this.props.setSubmitPopup(!currentState)
  }

  saveEntry = (evt) => {
    evt.preventDefault()
    let notebookId = +this.state.value
    let entryToSave = {
      id: this.props.entry.id,
      content: this.props.entry.content,
      formattedContent: this.props.entry.formattedContent,
      notebookId,
      submitted: true,
      mode: this.props.entry.mode
    }
    this.props.saveEntry(entryToSave)
  }

  handleNewNotebookClick = (evt) => {
    evt.preventDefault()
    let currentClassName = document.getElementById("addNotebookField").className
    currentClassName.includes("Off") ? document.getElementById("addNotebookField").className = "toggleOn" : document.getElementById("addNotebookField").className = "toggleOff"
  }

  saveNotebook = (evt) => {
    evt.preventDefault()
    let notebook = {
      title: this.state.newNotebookName,
      cover: this.state.notebookColorValue,
      userId: this.props.userId
    }
    this.props.createNewNotebook(notebook)
    document.getElementById('addNotebookField').className = 'toggleOff'
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.toggleSubmitPopup}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.saveEntry}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Select a notebook to submit an entry"
          actions={actions}
          modal={false}
          open={this.props.showSubmitPopup}
          onRequestClose={this.handleClose}
        >
            { this.props.notebooks.length > 0 ?
              <DropDownMenu value={this.state.value} onChange={this.handleNotebookSelection}>
                {this.props.notebooks.map(notebook =>
                  <MenuItem value={notebook.id} key={notebook.id} primaryText={notebook.title} /> )}
              </DropDownMenu> : <div>You don't have any existing notebooks</div>
            }
            <FloatingActionButton mini={true} onClick={this.handleNewNotebookClick}>
              <ContentAdd />
            </FloatingActionButton>
            <div id="addNotebookField" className="toggleOff">
                <TextField
                  hintText="Enter new notebook name"
                  errorText="This field is required."
                  errorStyle={styles.errorStyle}
                  onChange={this.handleNewNotebookNameChange}
                /><br />
                <div>Cover color:</div>
                <DropDownMenu value={this.state.notebookColorValue} onChange={this.handleNotebookColorChange}>
                    <MenuItem value={'#FF0000'} primaryText="Red" />
                    <MenuItem value={'#008000'} primaryText="Green" />
                    <MenuItem value={'#0000FF'} primaryText="Blue" />
                </DropDownMenu>
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

const mapDispatch = (dispatch) => {
  return {
    saveEntry: (editedEntry) => {
      dispatch(saveEntryDb(editedEntry))
    },
    setSubmitPopup: (state) => {
      dispatch(toggleSubmitPopupThunk(state))
    },
    createNewNotebook: (notebook) => {
      dispatch(createNotebookDb(notebook))
    }
  }
}

export default connect(mapState, mapDispatch)(SubmitEntryPopup)
