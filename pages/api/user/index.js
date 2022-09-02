import connectToDatabase from '../../../utils/dbConnect'
import User from '../../../models/user'

export default async function handler(req, res) {
    const { method } = req
    connectToDatabase()

    switch (method) {
        case 'GET':
            try {
                const users = await User.find()
                return res.status(200).json(users)
            } catch (err) {
                return res.status(500).json({ message: 'Users Not found' })
            }
            break
        case 'POST':
            try {
                const user = new User(req.body)
                console.log(user)
                await user.save()
                return res.status(200).json({ success: 'User Created' })
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
