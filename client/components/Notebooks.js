import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotebooksDb, me } from '../store'
import { Link, NavLink } from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


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
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getNotebooks(this.props.user.id)
  }

  render() {
    let images = {
      blue: ['/images/004-agenda-4.png', '/images/006-agenda-3.png', '/images/007-agenda-2.png', '/images/011-notebook-1.png'],
      green: ['/images/012-notebook.png', '/images/005-agenda.png', '/images/004-book.png', '/images/002-agenda-2.png'],
      red: ['/images/001-agenda-6.png', '/images/006-notebook-1.png', '/images/003-agenda-1.png', '/images/001-agenda-3.png'],
      yellow: ['/images/003-agenda-5.png', '/images/008-agenda-1.png', '/images/007-notebook.png']
    }
    return (
      <div className="container">
        <h2>Notebooks</h2>
        <div className="notebooks-grid">
          {this.props.notebooks && this.props.notebooks.map((notebook) => {
            return (
              <NavLink to={`/notebooks/${notebook.id}`} key={notebook.id}>
                <div className="notebook-item">
                  <span style={{color: 'black', fontFamily: `'Ubuntu Mono', 'monospace'`}}className="notebook-text">
                  {notebook.title}
                  <br />
                  {new Date(notebook.updatedAt).toDateString()}
                  </span>
                  {notebook.cover === 'blue' && <img height={250} src={images.blue[Math.floor(Math.random() * images.blue.length)]} />}
                  {notebook.cover === 'red' && <img height={250} src={images.red[Math.floor(Math.random() * images.red.length)]} />}
                  {notebook.cover === 'green' && <img height={250} src={images.green[Math.floor(Math.random() * images.green.length)]} />}
                  {notebook.cover === 'yellow' && <img height={250} src={images.yellow[Math.floor(Math.random() * images.yellow.length)]} />}
                </div>
              </NavLink>
            )
          })}
        </div>
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

/*
GRIDLIST
<div style={style}>
<GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>Notebooks</Subheader>
          {this.props.notebooks && this.props.notebooks.map((notebook) => {
            return (
              <Link to={`/notebooks/${notebook.id}`} key={notebook.id}>
                <GridTile
                  title={notebook.title}
                  subtitle={<span><b>{new Date(notebook.updatedAt).toDateString()}</b></span>}
                  key={notebook.id}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  titleBackground="rgba(0,0,0,0.7), 0%"
                >
                  <img height={150} src={`/images/001-agenda-6.png`} />
                </GridTile>
              </Link>
            )
          })}
        </GridList>
      </div>
*/
