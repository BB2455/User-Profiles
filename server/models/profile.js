import mongoose from 'mongoose'

const profileSchema = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
  },
  { timestamps: true }
)

const Profile = mongoose.model('Profile', profileSchema)

export default Profile
