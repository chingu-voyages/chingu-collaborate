import connectToDatabase from '../../../utils/dbConnect'
import User from '../../../models/user'

async function existingUser(username, email) {
    const existingUsername = await User.findOne({
        username: username,
    })
    const existingEmail = await User.findOne({ email: email })
    if (existingUsername != null) {
        return 'Username is already taken'
    } else if (existingEmail != null) {
        return 'This email is already link to another account'
    } else {
        return true
    }
}

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

            if (username == undefined) {
                return res
                    .status(400)
                    .send({ error: 'username parameter is required' })
            } else if (typeof username !== 'string') {
                return res
                    .status(400)
                    .send({ error: 'username parameter should be string' })
            } else if (username.length < 4 || username.length > 17) {
                return res.status(400).send({
                    error: 'username parameter length should be between 4 to 17',
                })
            }
            if (location != '') {
                if (!location.includes(',')) {
                    return res
                        .status(400)
                        .send({ error: 'location format is invalid' })
                }
            }
            if (email == undefined) {
                return res
                    .status(400)
                    .send({ error: 'email parameter is required' })
            } else if (!email.includes('@')) {
                return res
                    .status(400)
                    .send({ error: 'email format is invalid' })
            }
            if (authenticatedDiscordId == undefined) {
                return res
                    .status(400)
                    .send({ error: 'authenticatedDiscordId is required' })
            }
            if (discordUsername == undefined) {
                return res
                    .status(400)
                    .send({ error: 'discordUsername is required' })
            } else if (!discordUsername.includes('#')) {
                return res
                    .status(400)
                    .send({ error: 'discordUsername format is invalid' })
            }

            if (preferredMethodOfContact == undefined) {
                return res.status(400).send({
                    error: 'preferredMethodOfContact parameter is required',
                })
            }

            if (githubLink != '') {
                if (!githubLink.includes('https://github.com/')) {
                    return res
                        .status(400)
                        .send({ error: 'Github link format is invalid' })
                }
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
            const options = {
                new: true, // THis option is to return updated in same update request
            }
            try {
                const user = await User.updateMany(
                    req.body,
                    { $pull: req.body },
                    options
                )
                return res.status(200).json(user)
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
