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

        default:
            console.log("Wrong method type")
    }
}