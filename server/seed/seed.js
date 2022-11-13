import fs from 'fs'
import dotenv from 'dotenv'
import database from '../database/index.js'
import Profile from '../models/profile.js'

dotenv.config()

const data = fs.readFileSync('./seed/users.json')
const usersData = JSON.parse(data)

const addProfile = async (user) => {
  const newUser = new Profile({
    createdAt: user.created_at,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  })
  await newUser.save()
}

const seed = async () => {
  try {
    await database.connect()
    console.info('DB Connected')
    await Profile.deleteMany({})
    for (const user of usersData) {
      await addProfile(user)
    }

    console.info('Seeded Users')
  } catch (error) {
    console.error('Error Seeding: ', error)
  }
}

const runSeed = async () => {
  console.info('Seeding...')
  try {
    await seed()
  } catch (error) {
    console.error('Error: ', error)
    process.exitCode = 1
  } finally {
    console.info('Closing Connection...')
    await database.close()
    console.info('Database Closed')
  }
}

runSeed()
