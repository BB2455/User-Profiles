import express from 'express'
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
} from '../controllers/profilesController.js'
import {
  createProfileValidator,
  deleteProfileValidator,
  getProfileByIdValidator,
} from '../validators/profileValidators.js'
import validate from '../utils/validate.js'

const router = express.Router()

router.get('/', getAllProfiles)
router.get('/id/:id', getProfileByIdValidator(), validate, getProfileById)
router.post('/create', createProfileValidator(), validate, createProfile)
router.delete('/id/:id', deleteProfileValidator(), validate, deleteProfile)

export default router
