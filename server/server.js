import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import profileRoutes from './src/routes/profileRoute.js'

const app = express()

const origin =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' :
    process.env.BASE_URL

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin,
  })
)
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
