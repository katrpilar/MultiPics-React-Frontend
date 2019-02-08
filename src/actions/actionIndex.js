import { SET_QUERY, SET_PHOTOS, ADD_MORE_PHOTOS, REMOVE_PHOTO } from './actionTypes';

// BOUND ACTIONS INDEX

export function setPhotos(imgs){
  return {
    type: SET_PHOTOS,
    pics: imgs
  }
}

export function addPhotos(imgs){
  return {
    type: ADD_MORE_PHOTOS,
    pics: imgs
  }
}


export function setQuery(text){
  return {
    type: SET_QUERY,
    query: text
  }
}
