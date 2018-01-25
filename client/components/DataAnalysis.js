import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const DataAnalysis = (props) => {
  const data = props.data

  return (
    <div>
      <h3>Heres your data!</h3>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({data}) => ({data})

export default connect(mapState)(DataAnalysis)
