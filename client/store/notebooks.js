import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_NOTEBOOKS = 'GET_ALL_NOTEBOOKS'
const CREATE_NOTEBOOK = 'CREATE_NOTEBOOK'

/**
 * INITIAL STATE
 */
const defaultNotebooks = []

/**
 * ACTION CREATORS
 */
const getNotebooks = notebooks => ({type: GET_ALL_NOTEBOOKS, notebooks})
const createNotebook = notebook => ({type: CREATE_NOTEBOOK, notebook})

/**
 * THUNK CREATORS
 */
export const getNotebooksDb = (userId) =>
  dispatch =>
    axios.get(`/api/notebooks/user/${userId}`)
      .then(res =>
        dispatch(getNotebooks(res.data)))
      .catch(err => console.log(err))

export const createNotebookDb = notebook =>
  dispatch =>
    axios.post(`/api/notebooks`, notebook)
      .then(res => dispatch(createNotebook(res.data)))
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultNotebooks, action) {
  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      return action.notebooks
    case CREATE_NOTEBOOK:
      return [...state, action.notebook]
    default:
      return state
  }
}
