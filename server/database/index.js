import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const DB_URL =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/user_profiles'

const connect = async () => {
  return await mongoose
    .connect(DB_URL)
    .catch((error) => console.error(error.message))
}

const close = () => {
  return mongoose.disconnect()
}

export default {
  close,
  connect,
}
