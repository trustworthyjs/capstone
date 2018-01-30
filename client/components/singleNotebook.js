import React from 'react';
import { getNotebooksDb, me } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {Link} from 'react-router-dom'

export class singleNotebook extends React.Component {

  componentDidMount() {
    if (!this.props.notebooks.length) {
      this.props.getNotebooks(this.props.user.id)
    }

  }
  render() {

    const notebookId = +this.props.match.params.notebookId
    return (
      <div>
        {
          this.props.notebooks && this.props.notebooks.length && this.props.notebooks.find(foundNotebook => {
            return foundNotebook.id === notebookId
          }).entries.map(entry => {
            return (
              <Link key={entry.id} to={`/my-notebooks/${notebookId}/entry/${entry.id}`}>
                <Card>
                  <CardTitle title={entry.title} subtitle={`Last Save: ${entry.id}`} />
                  <CardText>
                    {entry.content.slice(50)}
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
