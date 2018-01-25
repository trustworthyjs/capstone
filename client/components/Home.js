import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'quill'
import { setTimeout, clearTimeout } from 'timers';
import ReactDOM from 'react-dom';

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: null,
      showPopup: false,
      bounds: {},
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
        showPopup: false
      })
      userHome.setState({
        timeout: setTimeout(() => {
          var range = editor.getSelection()
          if (range) {
            if (range.length == 0) {
              userHome.setState({
                bounds: editor.getBounds(range.index)
              })
            } else {
              var text = editor.getText(range.index, range.length);
              console.log('User has highlighted: ', text);
            }
          } else {
            console.log('User cursor is not in editor');
          }
          //get the text and formatted text, send it through a thunk
          console.log('get contents', editor.getText())
          userHome.setState({
            showPopup: true
          })
        }, 3000)
      })
    });

    
  }

  render() {
    const { email } = this.props
    const { bounds } = this.state
    const styles = {
      top: bounds.top + 220,    // computed based on child and parent's height
      left: bounds.left + 10,   // computed based on child and parent's width
      right: bounds.right - 20,
      bottom: bounds.bottom + 300,
      backgroundColor: 'orange'
    };
    console.log('state bounds', bounds)
    return (
      <div className="editor-prompt">
        <h3>Welcome, {email}</h3>
        {this.state.showPopup &&
          <div className="popup" style={styles}>
          What did you do today?
        </div>
      }
        <div className="editor" />
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

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
