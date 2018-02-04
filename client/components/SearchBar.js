import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import TextField from 'material-ui/TextField'
import {List, ListItem, makeSelectable} from 'material-ui/List';


//sorting function
function quickSort(arr) {

  if (arr.length < 2) return arr;
  
  var pivot = arr[0];
  var lesser = [];
  var greater = [];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i].content < pivot.content) {
        lesser.push(arr[i]);
    } else {
        greater.push(arr[i])
    }
  }

  return quickSort(lesser).concat(pivot, quickSort(greater));
}

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
              <ListItem>{text}</ListItem>
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
