import React from 'react'
import {PersonalityRadarChart, WordCloud, ToneGraph} from './'
import {Tabs, Tab} from 'material-ui/Tabs'
import { connect } from 'react-redux'
import {fetchDataAnalysis} from '.././store'

class DataAnalysis extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'word-cloud'
    }
  }

  componentDidMount() {
    this.props.getInitialData(this.props.userId)
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  render(){
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          {
            this.props.data.id &&
            <Tab label="Keywords" value="word-cloud">
              <div>
                <WordCloud />
              </div>
            </Tab>
          }

          {
            this.props.data.id &&
            <Tab label="Personality Radar" value="radar-chart">
              <div>
                <PersonalityRadarChart />
              </div>
            </Tab>
          }

          <Tab label="Tones Over Time" value="mood-chart">
            <ToneGraph />
          </Tab>

        </Tabs>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    data: state.data,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    getInitialData: (userId) => {
      dispatch(fetchDataAnalysis(userId))
    }
  }
}

export default  connect(mapState, mapDispatch)(DataAnalysis)
