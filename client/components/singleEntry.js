import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 800,
  margin: 50,
  textAlign: 'center',
  display: 'inline-block'
}

export class SingleEntry extends React.Component {

  componentDidMount(){
    if (!this.props.singleEntry.submitted){
      this.props.getOneEntry(+this.props.match.params.entryId)
    }
  }

  render() {
    let entry = this.props.singleEntry
    return (
      <div>
        {entry.submitted ?
          <div>
            <Paper style={style} zDepth={1} rounded={false}>
              <h1>Title: {entry.title}</h1>
              <h2>Saved At: {entry.savedAt}</h2>
              <p>{entry.content}</p>
            </Paper>
          </div>
        :
        <h1>This entry is still in progress</h1>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    singleEntry: state.singleEntry
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOneEntry: (entryId) => {
      dispatch(getEntryDb(entryId))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(SingleEntry))
