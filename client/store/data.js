import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA'
const CREATE_DATA = 'CREATE_DATA'

/**
 * INITIAL STATE
 */
const defaultData = {}

/**
 * ACTION CREATORS
 */
const getData = data => ({type: GET_DATA, data})
const createData = data => ({type: CREATE_DATA, data})

/**
 * THUNK CREATORS
 */
export const fetchDataAnalysis = userId =>
  dispatch =>
    axios.get(`/api/dataAnalysis/${userId}`)
      .then(res =>
        dispatch(getData(res.data || defaultData)))
      .catch(err => console.log(err))

export const createDataAnalysis = (userId, dataObj) =>
  dispatch =>
    axios.post(`/api/dataAnalysis`, Object.assign({userId}, dataObj))
      .then(res =>
        dispatch(createData(res.data)))
      .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
export default function (state = defaultData, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data
    case CREATE_DATA:
      return action.data
    default:
      return state
  }
}
