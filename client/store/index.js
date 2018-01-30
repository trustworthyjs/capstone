import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import singleEntry from './singleEntry'
import data from './data'
import notebooks from './notebooks'
import allEntries from './allEntries'
import submitPopup from './submitPopup'
import singleNotebook from './singleNotebook'


const reducer = combineReducers({user, singleEntry, data, notebooks, allEntries, submitPopup, singleNotebook})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './data'
export * from './singleEntry'
export * from './notebooks'
export * from './allEntries'
export * from './submitPopup'
export * from './singleNotebook'
