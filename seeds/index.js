import User from '../src/models/user.js'
import Project from '../src/models/project.js'
import connectToDatabase from '../src/utils/dbConnect.js'
import users from './users.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

connectToDatabase()

const seedDB = async () => {
    for (let i = 0; i < users.length; i++) {
        const user = new User(users[i])
        await user.save()
    }
}
seedDB()
    .then(() => {
        console.log('Database seeded successfully')
        mongoose.connection.close()
    })
    .catch((e) => {
        console.log('Error occured during seeding')
        console.log(e)
        mongoose.connection.close()
    })
