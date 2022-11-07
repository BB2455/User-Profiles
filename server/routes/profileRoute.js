import express from 'express'
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  searchProfiles,
  updateProfile,
} from '../controllers/profilesController.js'
import {
  createProfileValidator,
  deleteProfileValidator,
  getProfileByIdValidator,
  searchProfileValidator,
  updateProfileValidator,
} from '../validators/profileValidators.js'
import validate from '../utils/validate.js'

const router = express.Router()

router.get('/', getAllProfiles)
router.get('/id/:id', getProfileByIdValidator(), validate, getProfileById)
router.post('/create', createProfileValidator(), validate, createProfile)
router.delete('/id/:id', deleteProfileValidator(), validate, deleteProfile)
router.put('/id/:id', updateProfileValidator(), validate, updateProfile)
router.post('/search', searchProfileValidator(), validate, searchProfiles)

export default router
