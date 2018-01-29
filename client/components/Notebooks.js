import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotebooksDb, me } from '../store'
import { Link } from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 700,
    overflowY: 'auto',
    cellHeight: 'auto'
  },
};

export class Notebooks extends Component {


  componentDidMount() {
    if (!this.props.notebooks.length) {
      this.props.getNotebooks(this.props.user.id)
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >

          {this.props.notebooks && this.props.notebooks.map((notebook) => {
            return (
              <Link to={`/my-notebooks/${notebook.id}`} key={notebook.id}>
                <GridTile
                  title={notebook.title}
                  subtitle={<span><b>{new Date(notebook.updatedAt).toDateString()}</b></span>}
                  key={notebook.id}

                  titleBackground="rgba(0,0,0,0.7), 0%"
                >
                  <img height={150} src={`/images/001-agenda-6.png`} />
                </GridTile>
              </Link>
            )
          })}
        </GridList>
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
export default connect(mapState, mapDispatch)(Notebooks)
