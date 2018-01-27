import React, {Component } from 'react'
import {connect} from 'react-redux'
import  {getNotebooksDb, me} from '../store'

export class Notebooks extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (!this.props.notebooks.length){
      this.props.getNotebooks(this.props.user.id)
    }
  }

  render(){
    return (
      <div>
      This will show your past notebooks
      { this.props.notebooks && this.props.notebooks.map((notebook) => {
        return (
          <div key={notebook.id}>
          {notebook.id}
          </div>
        )
      })}
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
