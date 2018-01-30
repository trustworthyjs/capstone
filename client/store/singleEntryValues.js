import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_VALUES = 'GET_VALUES'
const UPDATE_VALUES = 'UPDATE_VALUES'

/**
 * INITIAL STATE
 */
const defaultValues = {
    timer: 600, //seconds left
    wordsWritten: 0, 
    wordCount: 300 //default word count goal
    // need to add default prompts, visual cues, music, etc. here
}

/**
 * ACTION CREATORS
*/
const getValues = values => ({type: GET_VALUES, values})
const updateValues = value => ({type: UPDATE_VALUES, value})

// /**
//  * REDUCER
//  */
export default function (state = defaultEntry, action) {
  switch (action.type) {
    case GET_VALUES:
      return action.entry
    case CREATE_ENTRY:
      return action.entry
    case SAVE_ENTRY:
      return action.entry
    case UPDATE_Values:
      return Object.assign({}, state, {settings: action.settings})
    default:
      return state
  }
}
