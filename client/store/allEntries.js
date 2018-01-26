import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ENTRIES = 'GET_ALL_ENTRIES'

/**
 * INITIAL STATE
 */
const defaultEntries = []

/**
 * ACTION CREATORS
 */
const getEntries = entries => ({type: GET_ALL_ENTRIES, entries})

/**
 * THUNK CREATORS
 */
export const getEntriesDb = (userId) =>
  dispatch =>
    axios.get(`/api/entries/user/${userId}`)
      .then(res =>
        dispatch(getEntries(res.data)))
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultEntries, action) {
  switch (action.type) {
    case GET_ALL_ENTRIES:
      return action.entries
    default:
      return state
  }
}
