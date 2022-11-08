import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import profileRoutes from './routes/profileRoute.js'

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.BASE_URL }))
app.use(helmet())

app.use('/profiles', profileRoutes)

app.use(async (req, res, next) => {
  next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  })
})

export default app
