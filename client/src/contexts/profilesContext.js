import { createContext, useReducer } from 'react'
import profilesReducer from '../reducers/profilesReducer'

const INITIAL_STATE = {
  profiles: [],
  error: null,
  loading: false,
  currentPofile: null,
}

export const ProfilesContext = createContext(INITIAL_STATE)

const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profilesReducer, INITIAL_STATE)

  return (
    <ProfilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfilesContext.Provider>
  )
}

export default ProfilesContextProvider
