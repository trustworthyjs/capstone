import React from 'react'
import {connect} from 'react-redux'
import {Calendar} from '@nivo/calendar'
import {getEntriesDb, me, updateUserStreak} from '../store'
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router-dom'

const styles = {
  toggle: {
    marginBottom: 16,
  },
  off: {
    backgroundColor: 'rgb(238, 238, 238)',
  },
  thumbSwitched: {
    backgroundColor: 'rgb(235, 154, 48)'
  },
  trackSwitched: {
    backgroundColor: 'rgb(235, 154, 48)',
    opacity: 0.5
  }
};

class StreaksGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      calendarData: [],
      streaks: false
    }
    this.prepData = this.prepData.bind(this)
  }

  componentDidMount() {
    if (!this.props.user){
      this.props.getMe()
    }
    if (this.props.user.streakGoalDate){
      this.setState({
        streaks: true
      })
    }
    this.props.getEntriesForUser(this.props.user.id, this.prepData)
  }

  prepData(entries){
    let filtered = entries.filter(entry => entry.submitted === true)
    let calData = {}
    filtered.forEach((entry) => {
      let formattedDate = entry.savedAt.slice(0, entry.savedAt.indexOf('T'))
      if (calData.hasOwnProperty(formattedDate)){
        calData[formattedDate].value = calData[formattedDate].value + 1
      } else {
        calData[formattedDate] = {
          day: formattedDate,
          value: 1
        }
      }
    })
    this.setState({
      calendarData: Object.values(calData)
    })
    return Object.values(calData)
  }

  onToggle = () => {
    this.setState({
      streaks: !this.state.streaks
    })
    this.props.updateStreak(this.props.user.id)
  }

  editStreak = (e, date) => {
    this.props.updateStreak(this.props.user.id, date)
  }

  checkForStreaks = (entries, startDate, endDate) => {
    let entriesInRange = entries.filter((entry) => {
      return entry.savedAt >= startDate && entry.savedAt <= endDate
    })
    let entryDatesObj = {}
    entriesInRange.forEach((entry) => {
      let savedAtSlice = entry.savedAt.slice(0, entry.savedAt.indexOf('T'))
      if (!entryDatesObj[savedAtSlice]){
        entryDatesObj[savedAtSlice] = 1
      } else {
        entryDatesObj[savedAtSlice]++
      }
    })
    //now entryDatesObj is an object with dates in range and amount of entries day
  }

  render() {
    let streakGoal = this.props.user.streakGoalDate
    let streakGoalStart = this.props.user.streakGoalStart
    let maxStreak = this.props.user.maxStreak
    let currentStreak = this.props.user.currentStreak
    this.checkForStreaks(this.props.allEntries, streakGoalStart, streakGoal)
    return (
      <div className="container">
        <h2>Streaks</h2>
        <Toggle
          label={this.state.streaks ? `Streak Goals are On!` : `Streak Goals are Off!`}
          labelPosition="right"
          style={styles.toggle}
          defaultToggled={this.state.streaks}
          onToggle={this.onToggle}
          thumbStyle={styles.off}
          trackStyle={styles.off}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
        />
        {this.state.streaks && this.props.user && streakGoal ?
        <div>
        <b>Your current streak goal:</b> <br />Write one entry daily until {streakGoal.slice(0, streakGoal.indexOf('T'))}
        <br />
        <b>Started On:</b>
        <br />
        {streakGoalStart.slice(0, streakGoalStart.indexOf('T'))}
        </div> :
        <div>
        You do not have a streak goal set.
        </div>}
        <br />
        {this.state.streaks &&
          <div>
            <b>Set or change streak goal:</b>
            <DatePicker
            hintText={streakGoal ? `${streakGoal.slice(0, streakGoal.indexOf('T'))}` : `Pick a Date`}
            mode="landscape"
            minDate={new Date()}
            onChange={this.editStreak}/>
          </div>}
        {this.state.streaks &&
          <div><b>Your Progress:</b>
            <br />
            { currentStreak > 1 ?
              <div>Current Streak: {currentStreak}<br />
              Max Streak: {maxStreak}</div>
              :
              <div>You haven't submitted enough entries to have a streak :( <Link to="/home">Write one now!</Link></div>
            }
          </div>}
        {this.state.calendarData && this.state.calendarData.length > 0 &&
          <Calendar
            data={this.state.calendarData}
            width={800}
            height={300}
            from="2018-12-31"
            to="2018-12-31"
            // domain={[1,8]}
            emptyColor="#eeeeee"
            colors={["#ACD3F2", "#EB97BE", "#1595A3", "rgb(235, 154, 48)"]}
            margin={{
                "top": 80,
                "right": 30,
                "bottom": 80,
                "left": 30
            }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            monthLegendOffset={10}
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    "anchor": "center",
                    "direction": "row",
                    "itemCount": 4,
                    "itemWidth": 34,
                    "itemHeight": 20,
                    "itemDirection": "top-to-bottom",
                    "translateY": 80,
                }
            ]}
          />
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    allEntries: state.allEntries,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntriesForUser: (userId, dataFunc) => {
      return dispatch(getEntriesDb(userId))
      .then((actionType) => {
        dataFunc(actionType.entries)
      })
    },
    getMe: () => {
      return dispatch(me())
    },
    updateStreak: (userId, newStreak) => {
      return dispatch(updateUserStreak(userId, newStreak))
    }
  }
}

export default connect(mapState, mapDispatch)(StreaksGraph)
