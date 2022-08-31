import connectToDatabase from '../../../utils/dbConnect';
import Project from '../../../models/project';

export default async function handler(req, res) {
    const { method } = req;
    connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const projects = await Project.find();
                res.status(200).json(projects)
            } catch (err) {
                res.status(500).json(err)
            }
            break;
        case "POST":
            try {
                const project = new Project(req.body)
                project.datePosted = new Date()
                project.expiresIn = new Date() // need logic to add future date.
                await project.save();
                res.status(200).json(project)
            } catch (err) {
                res.status(500).json(err)
            }
            break;
        default:
            res.status(400).json({message:"Method type not supported"})
    }
}