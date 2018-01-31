import React from 'react'
import {connect} from 'react-redux'

export const Timer = (props) => {
    return (
        <div>
            <label>Timer: </label>
            <div>{props.timer}</div>
        </div>
    )
}

const mapState = (state) => {
    return {
        timer: state.editorValues.timer
    }
}

export default connect(mapState)(Timer)