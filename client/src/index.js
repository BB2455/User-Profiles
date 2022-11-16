import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'

import ProfilesContextProvider from './contexts/profilesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ProfilesContextProvider>
      <App />
    </ProfilesContextProvider>
  </React.StrictMode>
)
