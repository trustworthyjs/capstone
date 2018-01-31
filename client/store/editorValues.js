import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_VALUES = 'GET_VALUES'
const UPDATE_VALUES = 'UPDATE_VALUES'
const RESET_VALUES = 'RESET_VALUES'

/**
 * INITIAL STATE
 */
const defaultValues = {
    timer: 600, //seconds left
    wordsWritten: 0, 
    wordCount: 300, //default word count goal
    promptArray: [
      'what did you do today?',
      'how ya feeling?',
      'what did you think about star wars?',
      'do you like our app?'
    ]
    // need to add default prompts, visual cues, music, etc. here
}

/**
 * ACTION CREATORS
*/
export const getValues = values => ({type: GET_VALUES, values})
export const updateValues = value => ({type: UPDATE_VALUES, value})
export const resetValues = () => ({type: RESET_VALUES})

// /**
//  * REDUCER
//  */
export default function (state = defaultValues, action) {
  switch (action.type) {
    case GET_VALUES:
      return action.values
    case UPDATE_VALUES:
      return Object.assign({}, state, action.value)
    case RESET_VALUES:
      return defaultValues;
    default:
      return state
  }
}
