import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.clickLeft = this.clickLeft.bind(this)
  }

  clickLeft(){
    this.setState({
      open: !this.state.open
    })
  }

  handleClose = () => this.setState({open: false});

  render(){
    const {children, handleClick, isLoggedIn, user} = this.props
    return (
      <div>
        <AppBar
        title="Writer App"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.clickLeft}
        zDepth={1}
        >
        <Drawer
        docked={false}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
        containerStyle={{
          top: 50.67
        }}>
          <NavLink to="/home"><MenuItem>New Entry</MenuItem></NavLink>
          <NavLink to="/my-notebooks"><MenuItem>Notebooks</MenuItem></NavLink>
          <NavLink to="/data-analysis"><MenuItem>Trends</MenuItem></NavLink>
          <MenuItem>Streaks</MenuItem>
        </Drawer>
        <nav className="nav-stuff">
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="">{user.email}</Link>
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
        </nav>
        </AppBar>
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
