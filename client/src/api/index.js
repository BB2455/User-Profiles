import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/',
  withCredentials: true,
})

export const fetchProfiles = (abortController) =>
  API.get('/profiles/', { signal: abortController.signal })

export const fetchProfilesBySearch = (abortController, searchQuery) =>
  API.post(`/profiles/search${searchQuery}`, { signal: abortController.signal })

export const deleteProfileById = (id) => API.delete(`/profiles/id/${id}`)

export const createNewProfile = (profileData) =>
  API.post(`/profiles/create`, profileData)

export const updateProfile = (id, profileData) =>
  API.put(`/profiles/id/${id}`, profileData)

export const fetchProfileById = (abortController, id) =>
  API.get(`/profiles/id/${id}`, {
    signal: abortController.signal,
  })
