import * as types from '../constants'

export function addImage(url) {
  return {
    type: types.SELECT_IMAGE,
    link: url
  }
}

export function deleteImage(url) {
  return {
    type: types.UNSELECT_IMAGE,
    link: url
  }
}
