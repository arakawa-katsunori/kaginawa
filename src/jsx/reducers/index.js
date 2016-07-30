import * as types from '../constants'

const initialState = {
  links: []
}

export function selectedImages(state = initialState, action = null) {
  switch (action.type) {
    case types.SELECT_IMAGE:
      return Object.assign({}, state, {
        links: [
          ...state.links,
          action.link
        ]
      })
    case types.UNSELECT_IMAGE:
      return Object.assign({}, state, {
        links: state.links.filter( link => link != action.link )
      })
    default:
      return state
  }
}
