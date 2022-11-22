import {
  START_LOADING,
  END_LOADING,
  ERROR,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_BY_ID,
  DELETE,
  CREATE,
  UPDATE,
} from '../constants/actionTypes'
import * as API from '../api'

export const getProfiles = (dispatch) => {
  const abortController = new AbortController()
  dispatch({ type: START_LOADING })
  API.fetchProfiles(abortController)
    .then((response) => {
      dispatch({ type: FETCH_ALL, payload: response.data })
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
    })
    .finally(() => dispatch({ type: END_LOADING }))
  return abortController
}

export const getProfilesBySearch = (dispatch, searchQuery) => {
  const abortController = new AbortController()
  dispatch({ type: START_LOADING })
  API.fetchProfilesBySearch(abortController, searchQuery)
    .then((response) => {
      dispatch({ type: FETCH_BY_SEARCH, payload: response.data })
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
    })
    .finally(() => dispatch({ type: END_LOADING }))
  return abortController
}

export const deleteProfile = async (dispatch, _id) => {
  dispatch({ type: START_LOADING })
  await API.deleteProfileById(_id)
    .then(() => {
      dispatch({ type: DELETE, payload: { _id } })
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
    })
    .finally(() => dispatch({ type: END_LOADING }))
}

export const createNewProfile = (dispatch, profileData) => {
  dispatch({ type: START_LOADING })
  return API.createNewProfile(profileData)
    .then((response) => {
      dispatch({ type: CREATE, payload: response.data })
      return true
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
      return false
    })
    .finally(() => {
      dispatch({ type: END_LOADING })
    })
}

export const updateProfile = (dispatch, id, profileData) => {
  dispatch({ type: START_LOADING })
  return API.updateProfile(id, profileData)
    .then((response) => {
      dispatch({ type: UPDATE, payload: response.data })
      return true
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
      return false
    })
    .finally(() => {
      dispatch({ type: END_LOADING })
    })
}

export const getProfileById = (dispatch, id) => {
  const abortController = new AbortController()
  dispatch({ type: START_LOADING })
  API.fetchProfileById(abortController, id)
    .then((response) => {
      dispatch({ type: FETCH_BY_ID, payload: response.data })
    })
    .catch((error) => {
      if (error.name === 'AbortError' || error.name === 'CanceledError') return
      dispatch({ type: ERROR, payload: error })
    })
    .finally(() => dispatch({ type: END_LOADING }))
  return abortController
}
