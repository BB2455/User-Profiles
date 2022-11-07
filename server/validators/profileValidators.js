import { body, param, query } from 'express-validator'
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
    body('email').exists().isEmail().toLowerCase().withMessage('Invalid Email'),
  ]
}

export const updateProfileValidator = () => {
  return [
    param('id')
      .exists()
      .custom((value) => {
        return mongoose.Types.ObjectId.isValid(value)
      })
      .withMessage('Invalid Id'),
    body('first_name')
      .optional()
      .isString()
      .isAlphanumeric()
      .isLength({ min: 1, max: 100 })
      .withMessage('Invalid First Name'),
    body('last_name')
      .optional()
      .isString()
      .isAlphanumeric()
      .isLength({ min: 1, max: 100 })
      .withMessage('Invalid Last Name'),
    body('email')
      .optional()
      .isEmail()
      .toLowerCase()
      .withMessage('Invalid Email'),
  ]
}

export const searchProfileValidator = () => {
  return [
    query('q')
      .isAlphanumeric()
      .exists()
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage('Invalid Search Term'),
    query('searchBy')
      .optional()
      .contains('last_name')
      .withMessage('Invalid Search By Value'),
  ]
}
