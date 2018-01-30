import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 300,
  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    display: 'flex',
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc',
  },
};
function getColorsFromTheme(theme) {
  if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
  const {
      palette: {
          primary1Color,
    accent1Color,
      },
    } = theme;
  return { primary1Color, accent1Color };
}
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, theme, handleSubmit, error, submitting } = props
  const muiTheme = getMuiTheme(theme);
  let { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);
  accent1Color = pinkA200;
  return (
    <div style={{ ...styles.main, backgroundColor: primary1Color }}>
      <Card style={styles.card}>
        <div style={styles.avatar}>
          <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
        </div>
        <form onSubmit={handleSubmit} name={name}>
          <div style={styles.form}>
            <p style={styles.hint}>Hint: murphy@email.com / 123</p>
            <div style={styles.input} >
              <TextField
                floatingLabelText="Username"
                name="email"
              />
            </div>
            <div style={styles.input}>
              <TextField
                floatingLabelText="Password"
                type="password"
                name="password"
              />
            </div>
          </div>
          <CardActions>
          <RaisedButton type="submit" primary disabled={submitting} label={'login'} fullWidth />
        </CardActions>
        </form>

      </Card>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
AuthForm.defaultProps = {
  theme: {},
};
