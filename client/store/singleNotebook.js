import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_NOTEBOOK = 'GET_NOTEBOOK'

/**
 * INITIAL STATE
 */
const defaultNotebook = {}

/**
 * ACTION CREATORS
 */
const getNotebook = notebook => ({type: GET_NOTEBOOK, notebook})

/**
 * THUNK CREATORS
 */
export const getNotebookDb = (notebookId) =>
  dispatch =>
    axios.get(`/api/notebooks/${notebookId}`)
      .then(res => {
        dispatch(getNotebook(res.data))
      })
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultNotebook, action) {
  switch (action.type) {
    case GET_NOTEBOOK:
      return action.notebook
    default:
      return state
  }
}
