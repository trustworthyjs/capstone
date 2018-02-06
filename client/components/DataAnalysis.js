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
            <Tab label="Keywords" value="word-cloud"
            style={{backgroundColor: '#FFF9EC'}}
            >
              <div>
                <WordCloud type="all-entries" singleEntryNouns={['none']} />
              </div>
            </Tab>
          }

          {
            this.props.data.id &&
            <Tab label="Personality Radar" value="radar-chart"
            style={{backgroundColor: '#FFF9EC'}}
            >
              <div>
                <PersonalityRadarChart
                  width={500}
                  height={500}
                  showChildren={true}
                  showToolTips={true}
                  dataFor={this.props.data}/>
              </div>
            </Tab>
          }

          <Tab label="Tones Over Time" value="mood-chart"
          style={{backgroundColor: '#FFF9EC'}}
          >
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

export default  connect(mapState)(DataAnalysis)
