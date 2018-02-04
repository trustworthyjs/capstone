import React from 'react'
import {connect} from 'react-redux'
import {Calendar} from '@nivo/calendar'
import {getEntriesDb, me, updateUserStreak} from '../store'
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  toggle: {
    marginBottom: 16,
  },
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
    if (this.props.user.streakGoal){
      this.setState({
        streaks: true
      })
    }
    this.props.getEntriesForUser(this.props.user.id, this.prepData)
  }

  prepData(entries){
    let calData = {}
    entries.forEach((entry) => {
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

  render() {
    let streakGoal = this.props.user.streakGoal
    return (
      <div className="container">
        <h2>Streaks</h2>
        <Toggle
          label={this.state.streaks ? `Streak Goals are On!` : `Streak Goals are Off!`}
          labelPosition="right"
          style={styles.toggle}
          defaultToggled={true}
          onToggle={this.onToggle}
        />
        {this.state.streaks && this.props.user && streakGoal ?
        <div>
        Your current streak goal: {streakGoal.slice(0, streakGoal.indexOf('T'))}
        </div> :
        <div>
        You do not have a streak goal set.
        </div>}
        {this.state.streaks &&
          <div>
            Set or change streak goal
            <DatePicker
            hintText={streakGoal ? `${streakGoal.slice(0, streakGoal.indexOf('T'))}` : `Pick a Date`}
            mode="landscape"
            onChange={this.editStreak}/>
          </div>}
        {this.state.calendarData && this.state.calendarData.length > 0 &&
          <Calendar
            data={this.state.calendarData}
            width={800}
            height={400}
            from="2018-01-01"
            to="2019-01-01"
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{
                "top": 35,
                "right": 30,
                "bottom": 10,
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
                    "itemCount": 2,
                    "itemWidth": 34,
                    "itemHeight": 20,
                    "itemDirection": "top-to-bottom",
                    "translateY": 80,
                    "symbolShape": "square"
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
