# Full Stack Assessment

Full Stack Assessment utilizing the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS)

## Requirements

The app will provide the following functionality:

- populate chosen database with provided data
- create new user
- update user
- delete user
- get all users
- get user by id
- filter/search users created between a time range
- search users by first name or last name
- order results by first_name, last_name, created_at, updated_at

## Usage Prerequisite

```
NodeJS >16
NPM >8
MongoDB
Rename .env.example to .env
```

## Cloning Repository

```
git clone https://github.com/BB2455/User-Profiles.git
```

## Dev Installation Backend

```
cd fs-assessment-blair/server/
npm i
npm run dev
```

## Dev Installation Front End

```
cd fs-assessment-blair/client/
npm i
npm start
```

## Technologies Used

- Frontend
  - React
  - React-Router-Dom
  - React Bootstrap
  - Axios
- Backend
  - Express
  - NodeJS
  - MongoDB (Mongoose)
  - Cors
  - Express-validator

## To Do

- Create Docker File (Development & Production)
- Add Pagination
- Logging
- Add Testing (Cyprus & Jest)
- Create Documentation
