import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getEntriesDb, getEntryDb} from '../store';
import {withRouter} from 'react-router';
import history from '../history';
import TextField from 'material-ui/TextField';
import {List, ListItem, makeSelectable} from 'material-ui/List';


class SearchBar extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      notebooks: [],
      inputValue: ''
    };
  }

  componentDidMount() {
    this.props.getEntries(this.props.userId)
  }

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
    if (this.props.allEntries) {
      if (this.props.allEntries.length) filteredList = this.getFilteredList();
      return (
        <div 
          style={{
            position: 'absolute',
            right: '265px',
            maxWidth: '300px',
            top: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div>
            <TextField 
              hintText="Search for an entry"
              onChange={this.handleInput}
              underlineStyle= {{
                borderColor: '#000000'
              }}
            />
            <List
              style={{
                maxHeight: '300px', 
                maxWidth: '256px', 
                fontSize: '1rem', 
                overflowY: 'auto',
                top: '10rem'
              }}
            >
              {filteredList.map(entry => {
                let firstIdx = entry.content.indexOf(this.state.inputValue);
                let lastIdx = firstIdx + inputValue.length;
                let text = this.getListItemText(inputValue, firstIdx, lastIdx, entry.content);
                let title = entry.title;

                return (
                  <ListItem
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    }}
                    onClick={() => {
                      history.push(`/notebooks/${entry.notebookId}/entry/${entry.id}`);
                      this.props.getEntry(entry.id)
                      this.setState({inputValue: ''});
                    }}
                  >
                    <h4 style={{fontWeight: 'bold'}}>{title}</h4>
                    <p>{text}</p>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </div>
      )
    } else return null
  }
  
}

const mapState = (state) => {
  return {
    allEntries: state.allEntries,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getEntries: (userId) => {
      dispatch(getEntriesDb(userId))
    },
    getEntry: (entryId) => {
      dispatch(getEntryDb(entryId))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(SearchBar))
