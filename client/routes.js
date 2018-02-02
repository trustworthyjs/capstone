import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, LandingPage, UserHome, DataAnalysis, WordCloud, Notebooks, SingleNotebook, SingleEntry, StreaksGraph, ToneGraph} from './components'
import {me, fetchDataAnalysis, toggleSubmitPopupThunk, getNotebooksDb, getEntriesDb} from './store'
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
    primary1Color: cyan500,
    primary2Color: cyan500,
    primary3Color: cyan500,
    accent1Color: cyan500,
    accent2Color: cyan500,
    accent3Color: '#c56000',
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepPurple300,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  fontFamily: 'Ubuntu Mono, monospace',
  appBar: {
    height: 50,
  },
});

class Routes extends Component {

  state = {
    existingEntry: '',
    existingEntryId: 0,
    existingEntryLoading: true,
  }

  componentDidMount () {
    this.props.loadInitialUser()
    .then(() => {
      const {isLoggedIn} = this.props
      if (this.props.isLoggedIn) {
        this.props.setInitialSubmitPopup(false)
        this.props.getNotebooks(this.props.user.id)
        this.props.getEntries(this.props.user.id)
      }
    })
  }


  setExistingEntry = () => {
    if (this.props.allEntries.length > 0) {
      let currentEntries = this.props.allEntries.filter(entry => !entry.submitted)
      if (currentEntries.length > 0) {
        let currentIDs = currentEntries.map(entry => entry.id)
        let latestID = Math.max(...currentIDs)
        let currentEntriesFiltered = currentEntries.filter(entry => entry.id === latestID)
        if (currentEntriesFiltered[0].content !== null) {
          this.setState({
            existingEntryLoading: false,
            existingEntry: currentEntriesFiltered[0].content,
            existingEntryId: latestID
          })
        } else {
          this.setState({
            existingEntryLoading: false
          })
        }
      } else {
        this.setState({
          existingEntryLoading: false
        })
      }
    }
  }

  render () {

    if (this.state.existingEntryLoading && (this.props.allEntries.length > 0)) {
      this.setExistingEntry()
    }

    console.log('existing entry loading: ', this.state.existingEntryLoading)

    const {isLoggedIn} = this.props

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
                  <Route path="/home"
                    render={() => !this.state.existingEntryLoading && <UserHome
                    existingEntry={this.state.existingEntry} existingEntryLoading={this.state.existingEntryLoading}
                    existingEntryId={this.state.existingEntryId} /> }
                  />
                  <Route path="/trends" component={DataAnalysis} />
                  <Route path="/streaks" component={StreaksGraph} />
                  <Route path="/word-cloud" component={WordCloud} />
                  <Route exact path="/notebooks" component={Notebooks} />
                  <Route exact path="/notebooks/:notebookId" component={SingleNotebook} />
                  <Route path="/notebooks/:notebookId/entry/:entryId" component={SingleEntry} />
                  <Route exact path="/" component={LandingPage} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={UserHome} />
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
    user: state.user,
    allEntries: state.allEntries
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialUser () {
      return dispatch(me())
    },
    setInitialSubmitPopup: (state) => {
      dispatch(toggleSubmitPopupThunk(state))
    },
    getNotebooks: (userId) => {
      dispatch(getNotebooksDb(userId))
    },
    getEntries: (userId) => {
      dispatch(getEntriesDb(userId))
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
