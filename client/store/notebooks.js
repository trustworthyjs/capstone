import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_NOTEBOOKS = 'GET_ALL_NOTEBOOKS'

/**
 * INITIAL STATE
 */
const defaultNotebooks = []

/**
 * ACTION CREATORS
 */
const getNotebooks = notebooks => ({type: GET_ALL_NOTEBOOKS, notebooks})

/**
 * THUNK CREATORS
 */
export const getNotebooksDb = (userId) =>
  dispatch =>
    axios.get(`/api/notebooks/user/${userId}`)
      .then(res =>
        dispatch(getNotebooks(res.data)))
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultNotebooks, action) {
  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      return action.notebooks
    default:
      return state
  }
}
