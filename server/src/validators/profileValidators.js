import {
  body,
  param,
  query
} from 'express-validator'
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
      .isLength({ max: 100, min: 1 })
      .withMessage('Invalid First Name'),
    body('last_name')
      .exists()
      .isString()
      .isAlphanumeric()
      .isLength({ max: 100, min: 1 })
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
      .isLength({ max: 100, min: 1 })
      .withMessage('Invalid First Name'),
    body('last_name')
      .optional()
      .isString()
      .isAlphanumeric()
      .isLength({ max: 100, min: 1 })
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
      .optional()
      .isLength({ max: 100, min: 1 })
      .isString()
      .withMessage('Invalid Search Term'),
    query('search')
      .optional()
      .isIn([
        'last_name',
        'first_name'
      ])
      .withMessage('Invalid Search Value'),
    query('sort')
      .optional()
      .isIn([
        'last_name',
        'first_name',
        'createdAt',
        'updatedAt'
      ])
      .withMessage('Invalid Sort Value'),
    query('order')
      .optional()
      .isIn([
        'desc',
        'asc'
      ])
      .withMessage('Invalid Order Value'),
  ]
}
