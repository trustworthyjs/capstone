import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { logout } from '../store'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
// import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.clickLeft = this.clickLeft.bind(this)
  }

  clickLeft() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose = () => this.setState({ open: false });

  render() {
    const { children, handleClick, isLoggedIn, user } = this.props
    return (
      <div>
      <img src="favicon.ico" className="logo" />
        {
          isLoggedIn ?
            <AppBar
              title="Mindful Pirate"
              onLeftIconButtonClick={this.clickLeft}
              zDepth={1}
              iconElementRight={<FlatButton href="/account" label={`${user.email}`}

              />}
            >
              <Drawer
                docked={true}
                open={this.state.open}
                onRequestChange={(open) => this.setState({ open })}
                containerStyle={{
                  top: 50
                }}>
                <NavLink onClick={this.handleClose} to="/home"><MenuItem>New Entry</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/notebooks"><MenuItem>Notebooks</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/streaks"><MenuItem>Streaks</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/trends"><MenuItem>Trends</MenuItem></NavLink>
              </Drawer>
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem primaryText="Account" href="/account" />
                <MenuItem primaryText="Logout" onClick={handleClick} />
              </IconMenu>
            </AppBar> :
            //This AppBar will appear after login
            <AppBar
              title={<span>Mindful Pirate</span>}
              iconElementLeft={<div />}
              iconElementRight={
                <FlatButton label="Login / Sign up" href="/login" />
              }
            />
        }
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
    handleClick() {
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
