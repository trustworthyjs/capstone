import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb, getNotebookDb} from '../store';
import {withRouter} from 'react-router';
import history from '../history'
import {WordCloud, PersonalityRadarChart} from './';
import ToneGraph from './ToneGraph';
import FlatButton from 'material-ui/FlatButton'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconButton from 'material-ui/IconButton';


/* Utility Functions */

function getFormattedDate(date) {
  date = new Date(date).toString()
  let currentDate = date.substring(0, date.length - 23)
  let currentTimeConverted = getFormattedTime(date.substring(date.length - 23, date.length - 18).split(':').join(''))
  currentDate = currentDate + currentTimeConverted
  return currentDate
}

function getFormattedTime (fourDigitTime) {
  var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
  var hours = ((hours24 + 11) % 12) + 1;
  var amPm = hours24 > 11 ? 'pm' : 'am';
  var minutes = fourDigitTime.substring(2);
  return hours + ':' + minutes + ' ' + amPm;
}

/* Utility Functions */


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
    this.props.getOneNotebook(this.props.match.params.notebookId)
  }

  handleDataTypeChange = (evt) => {
    evt.preventDefault()
    let dataType = evt.target.innerText
    this.setState({
      currentView: dataType
    })
  }

  turnNextPage = () => {
    const entries = this.props.singleNotebookEntries.sort();
    let nextEntryId = this.props.singleNotebook.id;
    for (let i = 0; i < entries.length; i++){
      if (entries[i].id === this.props.singleEntry.id) {
        let nextIdx = (i + 1) % entries.length;
        nextEntryId = entries[nextIdx].id;
      }
    }
    history.push(`/notebooks/${this.props.singleNotebook.id}/entry/${nextEntryId}`)
    this.props.getOneEntry(nextEntryId)
  }

  turnLastPage = () => {
    const entries = this.props.singleNotebookEntries.sort();
    let lastEntryId = this.props.singleNotebook.id;
    for (let i = 0; i < entries.length; i++){
      if (entries[i].id === this.props.singleEntry.id) {
        let lastIdx = i === 0 ? entries.length-1 : i-1;
        lastEntryId = entries[lastIdx].id;
      }
    }
    history.push(`/notebooks/${this.props.singleNotebook.id}/entry/${lastEntryId}`)
    this.props.getOneEntry(lastEntryId)
  }

  render() {

    let entry = this.props.singleEntry
    return (
      <div className="container">
        {entry && entry.submitted ?
          <div className="entry-page-container">
            <IconButton
              style={{
                position: 'fixed',
                left: '5px',
                top: '50%',
                width: 50,
                height: 50,
                padding: 5,
                zIndex: 10
              }}
              onClick={this.turnLastPage}
            >
              <ArrowLeft />
            </IconButton>
            <IconButton
              style={{
                position: 'fixed',
                right: '5px',
                top: '50%',
                width: 50,
                height: 50,
                padding: 5,
                zIndex: 10
              }}
              onClick={this.turnNextPage}
            >
              <ArrowRight />
            </IconButton>
            <div className="entry-page-left">
              <h1 className="bold-text">Title: {entry.title}</h1>
              <h2>Saved At: {getFormattedDate(entry.savedAt)}</h2>
              <br />
              {entry.content}
            </div>

            <div className="entry-page-right-column">

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
                            style={{color: '#1595A3'}} />
                          }
                        </div>)
                  })}
                </div>
                <div className="single-entry-charts-container">
                {
                  this.state.currentView === 'WORD CLOUD' &&
                  <div className="entry-page-data">

                    <h3>For current entry:</h3>
                    <div className="single-entry-word-cloud">
                      <WordCloud isSingleEntryView={true} type="single-entry"  singleEntryNouns={entry.wcNouns} />
                    </div>
                    <h3 className="single-word-title">For all entries to date:</h3>
                    <div className="all-entry-word-cloud">
                      <WordCloud type="all-entries"  isSingleEntryView={true} singleEntryNouns={['none']} />
                    </div>
                  </div>
                }

                {
                  this.state.currentView === 'PERSONALITY TRAITS' &&
                  <div className="entry-page-data">
                    <h3>For current entry:</h3>
                      <div className="single-radar-container">
                        <PersonalityRadarChart
                          height={280}
                          width={350}
                          dataFor={entry}
                          type='single'
                          showChildren={false}
                          showTooltips={false}
                          padding={45}
                        />
                      </div>
                    <h3>For all entries to date:</h3>
                      <div className="single-radar-container">
                        <PersonalityRadarChart
                          height={280}
                          width={350}
                          dataFor={this.props.data}
                          type='all'
                          showChildren={false}
                          showTooltips={false}
                          padding={45}
                        />
                      </div>
                  </div>
                }

                {
                  this.state.currentView === 'TONES' &&
                  <div className="entry-page-data">
                    <h3>For current entry:</h3>
                    <div className="single-tone-view" >
                      <ToneGraph type="single" entryId={+this.props.match.params.entryId} />
                    </div>
                    <h3>For all entries to date:</h3>
                    <div className="single-tone-view" >
                      <ToneGraph type="all" />
                    </div>
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
    singleEntry: state.singleEntry,
    data: state.data,
    singleNotebook: state.singleNotebook,
    singleNotebookEntries: state.singleNotebook.entries
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOneEntry: (entryId) => {
      dispatch(getEntryDb(entryId))
    },
    getOneNotebook : (notebookId) => {
      dispatch(getNotebookDb(notebookId))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(SingleEntry))
