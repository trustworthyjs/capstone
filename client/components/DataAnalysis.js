import React from 'react'
import {connect} from 'react-redux'
import {PersonalityRadarChart} from './'


/**
 * COMPONENT
 */
export const DataAnalysis = (props) => {
  const data = props.data

  return (
    <div>
      <h3>Heres your data!</h3>
      <PersonalityRadarChart />
/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({data}) => ({data})

export default connect(mapState)(DataAnalysis)
