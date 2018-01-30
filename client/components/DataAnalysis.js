import React from 'react'
import {connect} from 'react-redux'
import {PersonalityRadarChart, WordCloud} from './'

/**
 * COMPONENT
 */
class DataAnalysis extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    const data = this.props.data
      return (
        <div className="container">
          <h3>Heres your data!</h3>
          <div>
            <WordCloud />
          </div>
          <br />
          <div>
            <PersonalityRadarChart />
          </div>
        </div>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = ({data}) => ({data})

export default connect(mapState)(DataAnalysis)
