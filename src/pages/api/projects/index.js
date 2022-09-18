import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'
import { DateTime } from 'luxon'
import {
    validateProjectBody,
    existingProjectTitle,
} from '../../../utils/validation'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

async function countProjects(admin) {
    const postLimit = process.env.NEXT_PUBLIC_POSTLIMIT
    const count = await Project.where({ admin: admin }).count()
    if (count < postLimit) {
        return true
    }
    return false
}

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const { method } = req
        connectToDatabase()

        switch (method) {
            case 'GET':
                try {
                    const { title } = req.query
                    let projects
                    if (title) {
                        projects = await Project.find({
                            title: new RegExp(title, 'i'),
                        })
                            .populate('admin')
                            .populate('currentMembers')
                            .populate('requestedMembers')
                    } else {
                        projects = await Project.find()
                            .populate('admin')
                            .populate('currentMembers')
                            .populate('requestedMembers')
                    }
                    return res.status(200).json(projects)
                } catch (err) {
                    return res
                        .status(500)
                        .json({ message: 'Projects Not found' })
                }
                break
            case 'POST':
                const { title, technologies, details, admin, timezone } =
                    req.body
                const validationResponse = validateProjectBody(
                    title,
                    technologies,
                    details,
                    admin,
                    timezone
                )

                if (!(await countProjects(admin))) {
                    return res
                        .status(400)
                        .send({ error: 'You reached your project post limit' })
                }

                if (validationResponse != true) {
                    return res.status(400).send({ error: validationResponse })
                }
                try {
                    const existingProjectTitleResponse =
                        await existingProjectTitle(title)
                    if (existingProjectTitleResponse != true) {
                        return res
                            .status(400)
                            .json({ error: existingProjectTitleResponse })
                    }
                    const project = new Project(req.body)
                    const now = DateTime.now()
                    project.createdAt = now
                    project.expiresIn = now.plus({ week: 1 })
                    project.admin = admin
                    await project.save()
                    return res.status(200).json(project)
                } catch (err) {
                    return res.status(500).json(err)
                }
                break
            default:
                return res
                    .status(400)
                    .json({ message: 'Method type not supported' })
        }
    } else {
        return res.status(401).send({ error: 'You need to sign in first' })
    }
}
