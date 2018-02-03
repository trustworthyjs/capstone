import React from 'react';
import { getNotebookDb, me } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import SingleEntry from './singleEntry';
import Paper from 'material-ui/Paper';


const style = {
  height: 130,
  width: 100,
  margin: 20,
  fontSize: '6px',
  // textAlign: 'center',
  // display: 'inline-block',
};

export class singleNotebook extends React.Component {

  componentDidMount() {
    this.props.getNotebook(+this.props.match.params.notebookId)
  }
  render() {
    const notebookId = +this.props.match.params.notebookId
    let theNotebook = this.props.singleNotebook
    return (
      <div className="container">
        <h2>Notebook: {theNotebook.title}</h2>
        {
          theNotebook && theNotebook.entries && theNotebook.entries.length > 0 ?
          <div className="entries-grid">
          {theNotebook.entries.map(entry => {
            return (
              <Link key={entry.id} to={`/notebooks/${notebookId}/entry/${entry.id}`}>
                <div className="entry-item">
                  <Paper style={style} zDepth={1}>
                    <div className="entry-text">
                      {entry.content.slice(0, 200)}
                    </div>
                  </Paper>
                  <div>
                  {entry.title}
                  </div>
                </div>
              </Link>
            )
          })}
          </div>
            :
            <h4>This notebook does not have any entries!</h4>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleNotebook: state.singleNotebook,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getNotebook: (notebookId) => {
      dispatch(getNotebookDb(notebookId))
    },
    getMe: () => {
      dispatch(me())
        .then((userAction) => {
          dispatch(getNotebookDb(userAction.user.id))
        })
    }
  }
}
export default connect(mapState, mapDispatch)(withRouter(singleNotebook))
