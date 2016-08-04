import * as types from '../constants'

export default function fetchedItems(state = {
  isFetching: false,
  tweets: [],
  nextResults: ''
}, action) {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tweets: [...state.tweets, ...action.tweets],
        nextResults: action.nextResults
      })
    case types.DELETE_SEARCH:
      return Object.assign({}, state, {
        isFetching: false,
        tweets: [],
        nextResults: ''
      })
    default:
      return state
  }
}
