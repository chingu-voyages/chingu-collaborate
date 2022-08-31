import connectToDatabase from '../../utils/dbConnect'
import User from '../../models/user'

export default async function addUser(req, res) {
    try {
        await connectToDatabase()
        console.log('Connected to MongoDB')
        const user = await User.create(req.body)
        return res.json({ user })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}
