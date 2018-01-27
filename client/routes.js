import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, LandingPage, UserHome, DataAnalysis, WordCloud, Notebooks} from './components'
import {me, fetchDataAnalysis} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialUser()
  }

  render () {
    const {isLoggedIn} = this.props

    if (this.props.isLoggedIn) {
      this.props.getInitialData(this.props.user.id);
    }
    return (
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
