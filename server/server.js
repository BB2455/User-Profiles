import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import profileRoutes from './routes/profileRoute.js'

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.BASE_URL }))
app.use(helmet())

app.use('/profiles', profileRoutes)

export default app
