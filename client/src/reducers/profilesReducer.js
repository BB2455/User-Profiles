import {
  END_LOADING,
  ERROR,
  FETCH_ALL,
  START_LOADING,
  FETCH_BY_SEARCH,
  DELETE,
  SET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE,
  CREATE,
  UPDATE,
  CLEAR_ERROR,
  FETCH_BY_ID,
} from '../constants/actionTypes'

const profilesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, profiles: action.payload, error: null }
    case FETCH_BY_SEARCH:
      return { ...state, profiles: action.payload, error: null }
    case FETCH_BY_ID:
      return { ...state, currentProfile: action.payload, error: null }
    case START_LOADING:
      return { ...state, loading: true, error: null }
    case END_LOADING:
      return { ...state, loading: false }
    case ERROR:
      return { ...state, error: action.payload }
    case CLEAR_ERROR:
      return { ...state, error: null }
    case DELETE:
      return {
        ...state,
        currentProfile: null,
        profiles: state.profiles.filter(
          (profile) => profile._id !== action.payload._id
        ),
        error: null,
      }
    case CREATE:
      return {
        ...state,
        profiles: [action.payload, ...state.profiles],
        error: null,
      }
    case UPDATE:
      return {
        ...state,
        profiles: state.profiles.map((profile) => {
          if (profile._id === action.payload._id) {
            return action.payload
          }
          return profile
        }),
        error: null,
      }
    case SET_CURRENT_PROFILE:
      return { ...state, currentProfile: action.payload }
    case CLEAR_CURRENT_PROFILE:
      return { ...state, currentProfile: null }
    default:
      return state
  }
}

export default profilesReducer
