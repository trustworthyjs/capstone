import React from 'react'
import {connect} from 'react-redux'
import {Graph} from '../components'

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
          <Graph />
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
