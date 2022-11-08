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

export const searchProfiles = async (req, res) => {
  try {
    // Search if first/last name by search term or blank (returns all)
    const search = {
      [req.query.search || 'first_name']: new RegExp(
        `^${req.query.q || ''}`,
        'giu'
      ),
    }
    // Sort by type first_name, last_name, createdAt, updatedAt.
    // Sorts order by checking order is 'asc' for ascending.
    const sort = {
      [req.query.sort || 'createdAt']: req.query.order === 'asc' ? 1 : -1,
    }
    // Search createdAt start and end dates. Takes YYYY-MM-DD from query.
    const searchStartDate = req.query.startDate ? { createdAt: { $gte: new Date(req.query.startDate) } } : {}
    const searchEndDate = req.query.endDate ? { createdAt: { $lte: new Date(req.query.endDate) } } : {}
    const searchedProfiles = await Profile.find({
      $and: [
        search,
        searchStartDate,
        searchEndDate
      ],
    }).sort(sort)
    res.status(200).json({ searchedProfiles })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
