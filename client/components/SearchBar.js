import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import history from '../history';
import TextField from 'material-ui/TextField';
import {List, ListItem, makeSelectable} from 'material-ui/List';


export class SearchBar extends Component {

  state = {
    entries: [],
    notebooks: [],
    inputValue: ''
  };

  handleInput = event => {
    this.setState({inputValue: event.target.value})
  }

  getFilteredList = () => {
    if (this.props.allEntries.length > 0){
      return this.props.allEntries.filter(entry => {
        if (entry.content && this.state.inputValue !== '') return entry.content.match(this.state.inputValue);
        else return false;
      })
    } else return [];
  }

  getListItemText = (input, firstIdx, lastIdx, content) => {
    if (content.length < 30) {
      return (
        <span style={{backgroundColor: "rgb(0,188,212)"}}>{content}</span>
      )
    } else if (firstIdx <= 20) {
      return (
        <span>{content.slice(0,firstIdx)}<span style={{backgroundColor: "rgb(0,188,212)"}}>{input}</span>{`${content.slice(lastIdx,lastIdx + 20 - input.length / 2)}...`}</span>
      )
    } else if (lastIdx > content.length - 20) {
      return (
        <span>{`...${content.slice(firstIdx-(20-input.length / 2), firstIdx)}`}<span style={{backgroundColor: "rgb(0,188,212)"}}>{input}</span>{`${content.slice(lastIdx + 1,content.length)}`}</span>
      )
    }
    else {
      return (
        <span>{`...${content.slice(firstIdx-(20-input.length / 2), firstIdx)}`}<span style={{backgroundColor: "rgb(0,188,212)"}}>{input}</span>{`${content.slice(lastIdx,lastIdx + 20 - input.length / 2)}...`}</span>
      )
    }
  }

  render() {
    let filteredList = [];
    const inputValue = this.state.inputValue;
    if (this.props.allEntries.length) filteredList = this.getFilteredList();
    return (
      <div>
        <TextField 
          hintText="Search entries or notebooks"
          onChange={this.handleInput}
        />
        <List
          style={{maxHeight: '300px', maxWidth: '350px', fontSize: '1rem', overflowY: 'auto'}}
        >
          {filteredList.map(entry => {
            let firstIdx = entry.content.indexOf(this.state.inputValue);
            let lastIdx = firstIdx + inputValue.length;
            let text = this.getListItemText(inputValue, firstIdx, lastIdx, entry.content);
            
            return (
              <ListItem
                onClick={() => history.push(`/notebooks/${entry.notebookId}/entry/${entry.id}`)}>
                {text}
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
  
}

const mapState = (state) => {
  return {
    allEntries: state.allEntries
  }
}

export default connect(mapState)(withRouter(SearchBar))