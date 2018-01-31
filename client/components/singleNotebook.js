import React from 'react';
import { getNotebookDb, me } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {Link} from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
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
        {<Subheader>{theNotebook && theNotebook.title}</Subheader>}
        {
          theNotebook && theNotebook.entries && theNotebook.entries.length > 0 ? theNotebook.entries.map(entry => {
            return (
              <Link key={entry.id} to={`/notebooks/${notebookId}/entry/${entry.id}`}>
                <Card>
                  <CardTitle title={entry.title} subtitle={`Last Save: ${new Date(entry.savedAt)}`} />
                  <CardText>
                    {entry.content.slice(0, 100) + '...'}
                  </CardText>
                </Card>
              </Link>
            )
          })
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
