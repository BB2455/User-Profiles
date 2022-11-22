import dotenv from 'dotenv'
import app from './server.js'
import database from './src/database/index.js'

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
