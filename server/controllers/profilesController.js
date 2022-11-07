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
    const profile = await Profile.findOne({ _id: req.params.id })
    res.status(200).json(profile)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createProfile = async (req, res) => {
  try {
    const newProfile = await new Profile(req.body).save()
    res.status(200).json(newProfile)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const updatedData = req.body
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      updatedData,
      { new: true }
    )
    res
      .status(200)
      .json({ message: 'Successfully Update Profile', updatedProfile })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    await Profile.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Deleted Profile' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//  - filter/search users created between a time range
//  - search users by first name or last name
//  - order results by first_name, last_name, created_at, updated_at
export const searchProfiles = async (req, res) => {
  try {
    const regex = RegExp(`^${req.query.q}`, 'giu')
    const search = { [req.query.searchBy || 'first_name']: regex }
    const sort = {[req.query.sortBy || 'createdAt']: req.query.sort || -1}
    const searchedProfiles = await Profile.find(search).sort(sort)
    res.status(200).json(searchedProfiles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
