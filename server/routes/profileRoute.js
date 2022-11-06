import express from 'express'
import { getAllProfiles } from '../controllers/profilesController.js'

const router = express.Router()

router.get('/', getAllProfiles)

export default router
