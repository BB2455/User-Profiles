import { body, param } from 'express-validator'
import mongoose from 'mongoose'

export const getProfileByIdValidator = () => {
  return [
    param('id')
      .exists()
      .custom((value) => {
        return mongoose.Types.ObjectId.isValid(value)
      })
      .withMessage('Invalid Id'),
  ]
}

export const deleteProfileValidator = () => {
  return [
    param('id')
      .exists()
      .custom((value) => {
        return mongoose.Types.ObjectId.isValid(value)
      })
      .withMessage('Invalid Id'),
  ]
}

export const createProfileValidator = () => {
  return [
    body('first_name')
      .exists()
      .isString()
      .isAlphanumeric()
      .isLength({ min: 1, max: 100 })
      .withMessage('Invalid First Name'),
    body('last_name')
      .exists()
      .isString()
      .isAlphanumeric()
      .isLength({ min: 1, max: 100 })
      .withMessage('Invalid Last Name'),
    body('email')
      .exists()
      .isEmail()
      .toLowerCase()
      .withMessage('Invalid Email'),
  ]
}
