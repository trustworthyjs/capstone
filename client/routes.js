import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, LandingPage, UserHome, DataAnalysis, WordCloud, Notebooks} from './components'
import {me, fetchDataAnalysis, toggleSubmitPopupThunk, getNotebooksDb} from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkBlack, fullBlack, white, cyan500, cyan700, grey300, grey400, grey100, grey500, deepPurple300, red500, pink200, pink300} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


/**
 * COMPONENT
 */
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ffcdd2',
    primary2Color: '#ffffff',
    primary3Color: '#cb9ca1',
    accent1Color: '#ff8f00',
    accent2Color: '#ffc046',
    accent3Color: '#c56000',
    textColor: darkBlack,
    alternateTextColor: '000000',
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepPurple300,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialUser()
  }

  render () {
    const {isLoggedIn} = this.props

    if (this.props.isLoggedIn) {
      this.props.getInitialData(this.props.user.id)
      this.props.setInitialSubmitPopup(false)
      this.props.getNotebooks(this.props.user.id)
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/landing" component={LandingPage} />
                  <Route path="/home" component={UserHome} />
                  <Route path="/data-analysis" component={DataAnalysis} />
                  <Route path="/word-cloud" component={WordCloud} />
                  <Route path="/my-notebooks" component={Notebooks} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
      </MuiThemeProvider>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialUser () {
      dispatch(me())
    },
    getInitialData: (userId) => {
      dispatch(fetchDataAnalysis(userId))
    },
    setInitialSubmitPopup: (state) => {
      dispatch(toggleSubmitPopupThunk(state))
    },
    getNotebooks: (userId) => {
      dispatch(getNotebooksDb(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
