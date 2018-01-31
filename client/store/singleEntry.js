import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ENTRY = 'GET_ENTRY'
const CREATE_ENTRY = 'CREATE_ENTRY'
const SAVE_ENTRY = 'SAVE_ENTRY'
const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
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
export const getEntryDb = (entryId) =>
  dispatch =>
    axios.get(`/api/entries/${entryId}`)
      .then(res =>
        dispatch(getEntry(res.data)))
      .catch(err => console.log(err))

export const createEntryDb = (newEntry) =>
  dispatch => 
    axios.post(`/api/entries`, newEntry)
      .then(res =>
        dispatch(createEntry(res.data)))
      .catch(err => console.log(err))

export const saveEntryDb = (editedEntry) =>
  dispatch =>
    axios.put(`/api/entries/${editedEntry.id}`, editedEntry)
      .then(res =>
        dispatch(saveEntry(res.data)))
      .catch(err => console.log(err))

export const updateSettingsDb = (settings) => {
  dispatch => {
    axios.put(`/api/entries/${editedEntry.id}`, settings)
      .then(res => 
        dispatch(getEntry(res.data)))
      .catch(err => console.log(err))
  }
}

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
    case UPDATE_SETTINGS:
      return Object.assign({}, state, {settings: action.settings})
    default:
      return state
  }
}
