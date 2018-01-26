import React from 'react'
import {connect} from 'react-redux'
import {Calendar, ResponsiveCalendar} from '@nivo/calendar'


class Graph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      calendarData: [
        {
          "day": "2018-01-01",
          "value": 5
        },
        {
          "day": "2018-01-04",
          "value": 3
        },
        {
          "day": "2018-01-11",
          "value": 1
        },
        {
          "day": "2018-01-14",
          "value": 2
        },
        {
          "day": "2018-01-15",
          "value": 2
        }
      ]
    }
  }

  componentDidMount() {
    console.log('calendar', ResponsiveCalendar)
    console.log('this.props.data', this.props.data)
  }

  componentWillReceiveProps(){
    console.log('this.props.data', this.props.data)
  }

  componentDidUpdate() {
    console.log('componentdidupdate')
  }

  render() {
    return (
      <div>
        <h4>These are your streaks!</h4>
        <Calendar
        data={this.state.calendarData}
        width={800}
        height={400}
        from="2018-01-01"
        to="2019-01-01"
        emptyColor="#eeeeee"
        colors={[
            "#61cdbb",
            "#97e3d5",
            "#e8c1a0",
            "#f47560"
        ]}
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
                "itemCount": 4,
                "itemWidth": 34,
                "itemHeight": 20,
                "itemDirection": "top-to-bottom",
                "translateY": 80,
                "symbolShape": "square"
            }
        ]}
      />
      </div>
    )
  }
}

const mapState = ({data}) => ({data})

export default connect(mapState)(Graph)
