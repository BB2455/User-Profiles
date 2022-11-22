import { validationResult } from 'express-validator'
import createError from 'http-errors'

export default (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  next(createError.UnprocessableEntity({errors: extractedErrors}))
}
