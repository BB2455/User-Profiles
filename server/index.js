import dotenv from 'dotenv'
import database from './database/index.js'
import app from './server.js'

dotenv.config()

const PORT = process.env.PORT || 5000

try {
  await database.connect()
  console.info('Database connected...')
} catch (error) {
  console.error(error)
}

try {
  app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
} catch (error) {
  console.error(error.message)
}
