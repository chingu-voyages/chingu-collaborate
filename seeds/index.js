import User from '../src/models/user.js'
import Project from '../src/models/project.js'
import connectToDatabase from '../src/utils/dbConnect.js'
import users from './users.js'
import projects from './projects.js'
import mongoose from 'mongoose'
import { DateTime } from 'luxon'
import dotenv from 'dotenv'
dotenv.config()

connectToDatabase()

const getUsersId = async () => {
    const dbUsers = await User.find()
    return dbUsers
}

const seedDB = async () => {
    // for (let user of users) {
    //     const newUser = new User(user)
    //     await newUser.save()
    // }
    const dbUsersId = await getUsersId()
    for (let project of projects) {
        const randomElement =
            dbUsersId[Math.floor(Math.random() * dbUsersId.length)]
        console.log(randomElement)
        const newProject = new Project(project)
        const now = DateTime.now()
        newProject.createdAt = now
        newProject.expiresIn = now.plus({ week: 1 })
        newProject.admin = randomElement._id
        await newProject.save()
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
