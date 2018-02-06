import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import {WordCloud} from './';
import FlatButton from 'material-ui/FlatButton'
import ToneGraph from './ToneGraph';

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
              <h1 className="bold-text">Title: {entry.title.substring(0, entry.title.length - 18)}</h1>
              <h2>Saved At: {(new Date(entry.savedAt).toString()).substring(0, new Date(entry.savedAt).toString().length - 18)}</h2>
              <br />
              {entry.content}
            </div>

            <div className="entry-page-right-column">
              <div>
                <div className="entry-page-buttons">
                  {['WORD CLOUD', 'PERSONALITY TRAITS', 'TONES'].map(dataType => {
                    return (
                        <div key={dataType}>
                          {
                            this.state.currentView === dataType ?
                            <FlatButton
                            label={`${dataType}`}
                            value={`${dataType}`}
                            onClick={this.handleDataTypeChange}
                            secondary={true} /> :
                            <FlatButton
                            label={`${dataType}`}
                            value={`${dataType}`}
                            onClick={this.handleDataTypeChange}
                            primary={true} />
                          }
                        </div>)
                  })}
                </div>

                {
                  this.state.currentView === 'WORD CLOUD' &&
                  <div className="entry-page-data">
                    <h3>For current entry:</h3>
                    <WordCloud type="single-entry" singleEntryNouns={entry.wcNouns} />
                    <h3>For all entries to date:</h3>
                    <WordCloud type="all-entries" />
                  </div>
                }

                {
                  this.state.currentView === 'PERSONALITY TRAITS' &&
                  <div className="entry-page-data">
                    <h1>Personality Traits Placeholder</h1>
                    <h3>For current entry:</h3>
                    <h3>For all entries to date:</h3>
                  </div>
                }

                {
                  this.state.currentView === 'TONES' &&
                  <div className="entry-page-data">
                    <h1>Tones Placeholder</h1>
                  <div>
                    <h1>Entry Tones</h1>
                    <h3>For current entry:</h3>
                      <ToneGraph type="single" entryId={+this.props.match.params.entryId} />
                    <h3>For all entries to date:</h3>
                      <ToneGraph type="all" />
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

