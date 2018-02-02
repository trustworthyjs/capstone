import axios from 'axios'
import analyzeData from '../../createDataFunc'
import { createDataAnalysis } from './index'
require('../../secrets')

/**
 * HELPER FUNCTIONS
 */
async function createDataAfterNewEntry(userId) {
  const entries = await axios.get(`/api/entries/user/${userId}`)
  let entriesString = ''
  entries.data.forEach(entry => {
        if (entry.content) {
          entriesString = entriesString + ' ' + entry.content
        }
      })
  const dataObj = await axios.post(`/api/dataAnalysis/nlp-api-data/${userId}`, {entriesString})
  return dataObj.data
}
/**
 * ACTION TYPES
 */
const GET_ENTRY = 'GET_ENTRY'
const CREATE_ENTRY = 'CREATE_ENTRY'
const SAVE_ENTRY = 'SAVE_ENTRY'
const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

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
    .then(res => {
      dispatch(saveEntry(res.data))
    })
    .catch(err => console.log(err))
    
export const submitEntryDb = (editedEntry, notebookId, history, userId) =>
  dispatch => {
    axios.put(`/api/entries/${editedEntry.id}`, editedEntry)
      .then(res => {
        dispatch(saveEntry(res.data))
        history.push(`/notebooks/${notebookId}/entry/${editedEntry.id}`)
      })
      .then(async () => {
        let dataObj = await createDataAfterNewEntry(userId)
        dispatch(createDataAnalysis(userId, dataObj))
      })
      .then(async () => {
        let toneObj = await axios.post(`/api/dataAnalysis/nlp-api-data/entry/${editedEntry.id}`, {entryString: editedEntry.content})
        await axios.put(`/api/entries/${editedEntry.id}`, {tones: toneObj.data})
        dispatch(saveEntry({tones: toneObj.data}))
      })
      .catch(err => console.log(err))
  }

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
      return Object.assign({}, state, action.entry)
    case UPDATE_SETTINGS:
      return Object.assign({}, state, {settings: action.settings})
    default:
      return state
  }
}
