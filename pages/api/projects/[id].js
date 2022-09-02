import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'

export default async function handler(req, res) {
    const { method } = req
    connectToDatabase()

    switch (method) {
        case 'GET':
            try {
                const project = await Project.findById(req.query.id)
                return res.status(200).json(project)
            } catch (err) {
                return res.status(500).json({ message: 'Project Not found' })
            }
            break
        case 'PATCH':
            try {
                // Update logic pending
            } catch (err) {
                return res.status(500).json(err)
            }
            break
        case 'DELETE':
            try {
                const project = await Project.findByIdAndDelete(req.query.id)
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
