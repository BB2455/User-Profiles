import Profile from '../models/profile.js'

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
    res.status(200).json(profiles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getProfileById = async (req, res) => {
  try {
    res.status(200).json({ message: 'Get Profile By Id' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createProfile = async (req, res) => {
  try {
    res.status(200).json({ message: 'Create Profile' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    res.status(200).json({ message: 'Update Profile' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    res.status(200).json({ message: 'Delete Profile' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//  - filter/search users created between a time range
//  - search users by first name or last name
//  - order results by first_name, last_name, created_at, updated_at
export const searchProfiles = async (req, res) => {
  try {
    res.status(200).json({ message: 'Search Profile' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
