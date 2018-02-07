import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { logout } from '../store'
import {Footer, SearchBar} from './'
import Badge from 'material-ui/Badge'
import FireIcon from 'material-ui/svg-icons/social/whatshot';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import SearchIcon from 'material-ui/svg-icons/action/search'
import FlatButton from 'material-ui/FlatButton';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Kaushan Script']
  }
})

let styles = {
  title: {
    maxHeight: '80px',
    fontFamily: 'Kaushan Script',
    fontSize: '3rem',
    fontWeight: 'bold'
  }
}

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
      <img src="pen.png" className="logo" />
      <div>
        {
          isLoggedIn ?
          // this appbar will appear if logged in
            <AppBar
              title="Unblock"
              onLeftIconButtonClick={this.clickLeft}
              zDepth={1}
              titleStyle={styles.title}
              >
              <Drawer
                docked={false}
                open={this.state.open}
                onRequestChange={(open) => this.setState({ open })}
                modal={false}
                containerStyle={{
                  top: 50
                }}>
                <NavLink onClick={this.handleClose} to="/home"><MenuItem>New Entry</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/notebooks"><MenuItem>Notebooks</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/streaks"><MenuItem>Streaks</MenuItem></NavLink>
                <NavLink onClick={this.handleClose} to="/trends"><MenuItem>Trends</MenuItem></NavLink>
              </Drawer>
              <div className="nav-items">
                <SearchBar />
                <SearchIcon />
                {user.streakGoalDate && user.currentStreak > 1 &&
                  <Link to="/streaks">
                    <Badge
                      badgeContent={user.currentStreak}
                      secondary={true}
                      badgeStyle={{top: 4, right: 2, width: 17, height: 17}}
                      style={{padding: 2}}
                    >
                      <IconButton
                        tooltip="Streaks">
                      <FireIcon />
                      </IconButton>
                    </Badge>
                  </Link>
                }
                <FlatButton href="/account" label={`${user.email}`} />
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
              </div>
            </AppBar> :
            //This AppBar will appear if you are not logged in
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
      <Footer />
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
