import connectToDatabase from '../../utils/dbConnect'
import Project from '../../models/project'

export default async function addProject(req, res) {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB')
        const project = await Project.create(req.body);
        res.json({project});   
    } catch (err) {
        console.log(err)
    }
}