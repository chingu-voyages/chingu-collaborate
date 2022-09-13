import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'
import { DateTime } from 'luxon'

function validateBody(title, technologies, details, admin, timezone) {
    if (title == undefined || title == '') {
        return 'Title parameter is required'
    } else if (technologies == undefined || technologies == '') {
        return 'Technologies parameter is required'
    } else if (details == undefined || details == '') {
        return 'Details parameter is required'
    } else if (admin == undefined || admin == '') {
        return 'admin parameter is required'
    } else if (timezone == undefined || timezone == '') {
        return 'timezone parameter is required'
    } else if (typeof title !== 'string') {
        return 'Title parameter should be string'
    } else if (title.length < 5 || title.length > 21) {
        return 'Title parameter length should be between 5 to 20'
    } else if (technologies.length < 1) {
        return 'At least one technology should be selected'
    } else if (details.length > 800) {
        return 'Description should be less than 800 characters'
    } else {
        return ''
    }
}

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
            const validationResponse = validateBody(
                title,
                technologies,
                details,
                admin,
                timezone
            )

            if (validationResponse != '') {
                return res.status(400).send({ error: validationResponse })
            }
            try {
                const project = new Project(req.body)

                const now = DateTime.now() //this logic is to get proper date format for project.datePosted
                const datePostedString = now.toLocaleString(
                    DateTime.DATETIME_MED
                )
                project.datePosted = datePostedString

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
}
