import React from 'react';
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import {WordCloud, PersonalityRadarChart} from './';
import FlatButton from 'material-ui/FlatButton'
import ToneGraph from './ToneGraph';

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
                      <WordCloud type="all-entries" singleEntryNouns={['none']} />
                  </div>
                }

                {
                  this.state.currentView === 'PERSONALITY TRAITS' &&
                  <div className="entry-page-data">
                    <h3>For current entry:</h3>
                      <PersonalityRadarChart
                        height={350}
                        width={350}
                        dataFor={this.props.singleEntry}
                        showChildren={false}
                        showToolTips={false}
                      />
                    <h3>For all entries to date:</h3>
                      <PersonalityRadarChart
                        height={350}
                        width={350}
                        dataFor={this.props.data}
                        showChildren={false}
                        showToolTips={false}
                      />
                  </div>
                }

                {
                  this.state.currentView === 'TONES' &&
                  <div className="entry-page-data">
                    <h3>For current entry:</h3>
                      <ToneGraph type="single" entryId={+this.props.match.params.entryId} />
                    <h3>For all entries to date:</h3>
                      <ToneGraph type="all" />
                  </div>
                }
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
    data: state.data
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

