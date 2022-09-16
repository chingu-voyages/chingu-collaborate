import connectToDatabase from '../../../utils/dbConnect'
import Project from '../../../models/project'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const { method } = req
        connectToDatabase()

        switch (method) {
            case 'GET':
                try {
                    const project = await Project.findById(req.query.id)
                        .populate('admin')
                        .populate('currentMembers')
                        .populate('requestedMembers')
                    return res.status(200).json(project)
                } catch (err) {
                    return res
                        .status(500)
                        .json({ message: 'Project Not found' })
                }
                break
            case 'PATCH':
                const { user_id, requestType } = req.body
                const { id } = req.query
                const options = {
                    new: true, // THis option is to return updated in same update request
                }
                try {
                    if (requestType == 'requestForProject') {
                        const project = await Project.findByIdAndUpdate(
                            id,
                            { $push: { requestedMembers: user_id } },
                            options
                        )
                        return res.status(200).json(project)
                    } else if (
                        requestType == 'rejectProject' ||
                        requestType == 'withdrawFromProject'
                    ) {
                        const project = await Project.findByIdAndUpdate(
                            id,
                            { $pull: { requestedMembers: user_id } },
                            options
                        )
                        return res.status(200).json(project)
                    } else if (requestType == 'approveProject') {
                        await Project.findByIdAndUpdate(
                            id,
                            { $pull: { requestedMembers: user_id } },
                            options
                        )
                        const project = await Project.findByIdAndUpdate(
                            id,
                            { $push: { currentMembers: user_id } },
                            options
                        )
                        return res.status(200).json(project)
                    } else {
                        return res.status(400).json('requestType is invalid')
                    }
                } catch (err) {
                    return res.status(500).json(err)
                }
                break
            case 'DELETE':
                try {
                    const project = await Project.findByIdAndDelete(
                        req.query.id
                    )
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
    } else {
        return res.status(401).send({ error: 'You need to sign in first' })
    }
}
