import { createContext, useReducer, useState } from 'react'
import profilesReducer from '../reducers/profilesReducer'

const INITIAL_STATE = {
  profiles: [],
  error: null,
  loading: false,
  currentProfile: null,
}

export const ProfilesContext = createContext(INITIAL_STATE)

const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profilesReducer, INITIAL_STATE)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <ProfilesContext.Provider
      value={{
        ...state,
        dispatch,
        showDeleteModal,
        setShowDeleteModal,
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        showProfileModal,
        setShowProfileModal,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

export default ProfilesContextProvider
