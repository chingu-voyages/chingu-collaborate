import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'

export default async function handler(req, res) {
    const { method } = req
    connectToDatabase()

    switch (method) {
        case 'GET':
            try {
                const projects = await Project.find()
                return res.status(200).json(projects)
            } catch (err) {
                return res.status(500).json({ message: 'Projects Not found' })
            }
            break
        case 'POST':
            try {
                const project = new Project(req.body)
                project.datePosted = new Date()
                project.expiresIn = new Date() // need logic to add future date.
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
