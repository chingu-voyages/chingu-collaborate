import connectToDatabase from '../../../utils/dbConnect'
import User from '../../../models/user'
import { validateUserBody, existingUser } from '../../../utils/validation'

export default async function handler(req, res) {
    const { method } = req
    connectToDatabase()

    switch (method) {
        case 'GET':
            try {
                if (Object.keys(req.query).length !== 0) {
                    const users = await User.find({
                        authenticatedDiscordId:
                            req.query.authenticatedDiscordId,
                    })
                    return res.status(200).json(users)
                }
                const users = await User.find()
                return res.status(200).json(users)
            } catch (err) {
                return res.status(500).json({ message: 'Users Not found' })
            }
            break
        case 'POST':
            const {
                username,
                location,
                email,
                authenticatedDiscordId,
                discordUsername,
                preferredMethodOfContact,
                githubLink,
            } = req.body

            const validationResponse = validateUserBody(
                username,
                location,
                email,
                authenticatedDiscordId,
                discordUsername,
                preferredMethodOfContact,
                githubLink
            )

            if (validationResponse != true) {
                return res.status(400).send({ error: validationResponse })
            }

            try {
                const existingUserResponse = await existingUser(username, email)
                if (existingUserResponse != true) {
                    return res.status(400).json({ error: existingUserResponse })
                }
                const user = new User(req.body)
                await user.save()
                return res.status(200).json({ success: 'User Created' })
            } catch (err) {
                return res.status(500).json(err)
            }
            break
        case 'PATCH':
            // Patch case for future use. No need for this phase of project
            break
        default:
            return res
                .status(400)
                .json({ message: 'Method type not supported' })
    }
}
