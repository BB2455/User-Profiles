import createError from 'http-errors'
import Profile from '../models/profile.js'

export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 })
    res.status(200).json(profiles)
  } catch (error) {
    next(error)
  }
}

export const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id)
    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

export const createProfile = async (req, res, next) => {
  try {
    const newProfile = await new Profile(req.body).save()
    res.status(200).json(newProfile)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedProfile) throw createError.NotFound('No Profile Found With Id')
    res.status(200).json(updatedProfile)
  } catch (error) {
    next(error)
  }
}

export const deleteProfile = async (req, res, next) => {
  try {
    await Profile.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Deleted Profile' })
  } catch (error) {
    next(error)
  }
}

export const searchProfiles = async (req, res, next) => {
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
    const searchStartDate = req.query.startDate ?
      { createdAt: { $gte: new Date(req.query.startDate) } } :
      {}
    const searchEndDate = req.query.endDate ?
      { createdAt: { $lte: new Date(req.query.endDate) } } :
      {}
    const searchedProfiles = await Profile.find({
      $and: [
        search,
        searchStartDate,
        searchEndDate
      ],
    }).sort(sort)
    res.status(200).json(searchedProfiles)
  } catch (error) {
    next(error)
  }
}
