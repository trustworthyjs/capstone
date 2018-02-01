import React from 'react'
import {connect} from 'react-redux'
import {Calendar} from '@nivo/calendar'
import {getEntriesDb, me} from '../store'


class StreaksGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      calendarData: []
    }
    this.prepData = this.prepData.bind(this)
  }

  componentDidMount() {
    if (!this.props.user){
      this.props.getMe()
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

  render() {
    return (
      <div className="container">
        <h4>This is your recent activity!</h4>
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
    }
  }
}

export default connect(mapState, mapDispatch)(StreaksGraph)
