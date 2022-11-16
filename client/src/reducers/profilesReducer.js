import {
  END_LOADING,
  ERROR,
  FETCH_ALL,
  START_LOADING,
} from '../constants/actionTypes'

const profilesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, profiles: action.payload, error: null, loading: false }
    case START_LOADING:
      return { ...state, loading: true }
    case END_LOADING:
      return { ...state, loading: false }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default profilesReducer
