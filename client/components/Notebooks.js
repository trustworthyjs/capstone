import React, {Component } from 'react'
import {connect} from 'react-redux'
import  {getNotebooksDb, me} from '../store'
import RaisedButton from 'material-ui/RaisedButton';


function NotebooksList ({ notebooks }) {
  if (notebooks.length) {
    return this.props.notebooks.map((notebook) => <NotebookItem notebook={notebook}/>)
  }
  else {
    return <h1>HEy there are not any notebooks yet</h1>
  }
}

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
      <RaisedButton label="Default" />
      This will show your past notebooks
      <NotebooksList notebooks={this.props.notebooks}/>
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
