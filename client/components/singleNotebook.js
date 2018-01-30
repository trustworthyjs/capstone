import React from 'react';
import { getNotebooksDb, me } from '../store'
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
    if (!this.props.notebooks.length) {
      this.props.getNotebooks(this.props.user.id)
    }

  }
  render() {
    const notebookId = +this.props.match.params.notebookId
    let theNotebook = this.props.notebooks.find(foundNotebook => {
      return foundNotebook.id === notebookId
    })
    return (
      <div className="notebookContainer">
        {<Subheader>{this.props.notebooks && this.props.notebooks.length > 0 && theNotebook.title}</Subheader>}
        {
          this.props.notebooks && this.props.notebooks.length > 0 && theNotebook.entries.map(entry => {
            return (
              <Link key={entry.id} to={`/my-notebooks/${notebookId}/entry/${entry.id}`}>
                <Card>
                  <CardTitle title={entry.title} subtitle={`Last Save: ${entry.savedAt}`} />
                  <CardText>
                    {entry.content.slice(0, 100) + '...'}
                  </CardText>
                </Card>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    notebooks: state.notebooks,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getNotebooks: (userId) => {
      dispatch(getNotebooksDb(userId))
    },
    getMe: () => {
      dispatch(me())
        .then((userAction) => {
          dispatch(getNotebooksDb(userAction.user.id))
        })
    }
  }
}
export default connect(mapState, mapDispatch)(withRouter(singleNotebook))
