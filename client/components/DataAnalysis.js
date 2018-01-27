import React from 'react'
import {connect} from 'react-redux'
import {StreaksGraph} from '../components'
import {PersonalityRadarChart} from './'

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
        <div>
          <h3>Heres your data!</h3>
          <StreaksGraph />
          <div>{JSON.stringify(data)}</div>
        </div>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = ({data}) => ({data})

export default connect(mapState)(DataAnalysis)
