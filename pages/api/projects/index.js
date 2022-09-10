import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'
import { DateTime } from 'luxon'

export default async function handler(req, res) {
    const { method } = req
    connectToDatabase()

    switch (method) {
        case 'GET':
            try {
                const projects = await Project.find()
                    .populate('admin')
                    .populate('currentMembers')
                    .populate('requestedMembers')
                return res.status(200).json(projects)
            } catch (err) {
                return res.status(500).json({ message: 'Projects Not found' })
            }
            break
        case 'POST':
            const { title, technologies, details, admin, timezone } = req.body
            if (title == undefined) {
                return res
                    .status(400)
                    .send({ error: 'Title parameter is required' })
            }
            if (technologies == undefined) {
                return res
                    .status(400)
                    .send({ error: 'Technologies parameter is required' })
            }
            if (details == undefined) {
                return res
                    .status(400)
                    .send({ error: 'Details parameter is required' })
            }
            if (typeof title !== 'string') {
                return res
                    .status(400)
                    .send({ error: 'Title parameter should be string' })
            }
            if (title.length < 5 || title.length > 21) {
                return res.status(400).send({
                    error: 'Title parameter length should be between 5 to 20',
                })
            }
            if (technologies.length < 1) {
                return res.status(400).send({
                    error: 'At least one technology should be selected',
                })
            }
            if (details.length > 800) {
                return res.status(400).send({
                    error: 'Description should be less than 800 characters',
                })
            }
            try {
                const project = new Project(req.body)

                const now = DateTime.now()
                //this logic is to get proper date format for project.datePosted
                const datePostedString = now.toLocaleString(
                    DateTime.DATETIME_MED
                )
                project.datePosted = datePostedString

                project.createdAt = now
                project.expiresIn = now.plus({ month: 1 })
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
}
