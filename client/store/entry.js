import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ENTRY = 'GET_ENTRY'
const CREATE_ENTRY = 'CREATE_ENTRY'
const SAVE_ENTRY = 'SAVE_ENTRY'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultEntry = {}

/**
 * ACTION CREATORS
 */
const getEntry = entry => ({type: GET_ENTRY, entry})
const createEntry = entry => ({type: CREATE_ENTRY, entry})
const saveEntry = entry => ({type: SAVE_ENTRY, entry})

/**
 * THUNK CREATORS
 */
export const getEntryDb = () =>
  dispatch =>
    axios.get(`/api/something`)
      .then(res =>
        dispatch(getEntry(res.data || defaultEntry)))
      .catch(err => console.log(err))

export const createEntryDb = (newEntry) =>
  dispatch =>
    axios.post(`/api`, newEntry)
      .then(res =>
        dispatch(createEntry(res.data)))
      .catch(err => console.log(err))

export const saveEntryDb = (editedEntry) =>
  dispatch =>
    axios.put(``, editedEntry)
      .then(res =>
        dispatch(saveEntry(res.data)))
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultEntry, action) {
  switch (action.type) {
    case GET_ENTRY:
      return action.entry
    case CREATE_ENTRY:
      return action.entry
    case SAVE_ENTRY:
      return action.entry
    default:
      return state
  }
}
