import { SET_QUERY, SET_PHOTOS, ADD_MORE_PHOTOS, REMOVE_PHOTO } from './actionTypes';

// BOUND ACTIONS INDEX

export function addPhotos(imgs){
  return {
    type: ADD_MORE_PHOTOS,
    pics: imgs
  }
}

export function removePhoto(key){
  return {
    type: REMOVE_PHOTO,
    key: key
  }
}

export function setQuery(text){
  return {
    type: SET_QUERY,
    query: text
  }
}
