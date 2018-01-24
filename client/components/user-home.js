import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'quill'
import { setTimeout, clearTimeout } from 'timers';


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: null,
      showPopup: false
    }

  }

  componentDidMount() {
    var options = {
      //debug: 'info',
      placeholder: 'Start writting...',
      theme: 'snow'
    };

    var editor = new Quill('.editor', options);

    let userHome = this
    editor.on('text-change', function(delta, oldDelta, source) {
      const { timeout } = userHome.state
      clearTimeout(timeout)
      userHome.setState({
        timeout: setTimeout(() => {userHome.setState({showPopup: true})}, 5000)
      })
    });
  }

  render() {
    const { email } = this.props
    return (
      <div className="editor-prompt">
        <h3>Welcome, {email}</h3>
        <div className="editor" />
        <div className="popup">
          this is the popup
        </div>
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
