import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';

export class SingleEntry extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (!this.props.passEntry){
      console.log('props pass entyr', this.props.passEntry)
      this.props.getOneEntry(+this.props.match.params.entryId)
    } else {
      console.log('i am here', this.props.passEntry)
      this.props.getOneEntry(+this.props.passEntry)
    }
  }

  render() {
    let entry = this.props.singleEntry
    return (
      <div className="container">
        {entry && entry.submitted ?
          <div>
            <h1>Title: {entry.title}</h1>
            <h2>Saved At: {new Date(entry.savedAt).toString()}</h2>
            <br />
            {entry.content}
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
