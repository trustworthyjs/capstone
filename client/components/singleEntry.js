import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import {WordCloud} from './';
import FlatButton from 'material-ui/FlatButton'

export class SingleEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: 'WORD CLOUD'
    }
  }

  componentDidMount(){
    if (!this.props.passEntry){
      this.props.getOneEntry(+this.props.match.params.entryId)
    } else {
      this.props.getOneEntry(+this.props.passEntry)
    }
  }

  handleDataTypeChange = (evt) => {
    evt.preventDefault()
    let dataType = evt.target.innerText
    this.setState({
      currentView: dataType
    })
  }

  render() {
    let entry = this.props.singleEntry

    return (
      <div className="container">
        {entry && entry.submitted ?
          <div className="entry-page-container">

            <div>
              <h1>Title: {entry.title}</h1>
              <h2>Saved At: {new Date(entry.savedAt).toString()}</h2>
              <br />
              {entry.content}
            </div>

            <div className="entry-page-right-column">
              <div>
                <div className="entry-page-buttons">
                  {['Word Cloud', 'Personality Traits', 'Tones'].map(dataType => {
                    return (<FlatButton
                              key={dataType}
                              label={`${dataType}`}
                              value={`${dataType}`}
                              onClick={this.handleDataTypeChange}
                              secondary={true} />)
                  })}
                </div>

                {
                  this.state.currentView === 'WORD CLOUD' &&
                  <div>
                    <h1>Word Cloud Placeholder</h1>
                    <h3>For current entry:</h3>
                    <h3>For all entries to date:</h3>
                  </div>
                }

                {
                  this.state.currentView === 'PERSONALITY TRAITS' &&
                  <div>
                    <h1>Personality Traits Placeholder</h1>
                    <h3>For current entry:</h3>
                    <h3>For all entries to date:</h3>
                  </div>
                }

                {
                  this.state.currentView === 'TONES' &&
                  <div>
                    <h1>Tones Placeholder</h1>
                    <h3>For current entry:</h3>
                    <h3>For all entries to date:</h3>
                  </div>
                }
              </div>
            </div>

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

// <WordCloud type="single-entry" singleEntryNouns={entry.wcNouns} />
// <WordCloud type="all-entries" />

