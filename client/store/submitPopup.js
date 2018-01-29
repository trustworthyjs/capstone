/**
 * ACTION TYPES
 */
const SUBMIT_POPUP = 'SUBMIT_POPUP'

/**
 * INITIAL STATE
 */
const defaultSubmitState = false

/**
 * ACTION CREATORS
 */
const toggleSubmitPopup = state => ({ type: SUBMIT_POPUP, state })

/**
 * THUNK CREATORS
 */

export const toggleSubmitPopupThunk = (state) =>
  dispatch =>
    dispatch(toggleSubmitPopup(state))

/**
 * REDUCER
 */
export default function (state = defaultSubmitState, action) {
  switch (action.type) {
    case SUBMIT_POPUP:
      return action.state
    default:
      return state
  }
}
