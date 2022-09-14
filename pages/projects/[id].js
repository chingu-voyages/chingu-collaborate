import ManageProject from '../../src/components/ManageProject'
import ProjectDetails from '../../src/components/ProjectDetails'
import { useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import Wrapper from '../../src/components/Wrapper'

export default function Project({ details, isRequestedMember }) {
    const { data: session, status } = useSession()

    const JOINLIMIT = 5

    const isAdmin = session?.dbUser?._id === details?.admin?._id

    const projectsJoined = 1 // Add logic

    const isJoinable = !isRequestedMember && projectsJoined < JOINLIMIT

    const detailsLength = Object.keys(details).length
    return (
        <Wrapper session={session} status={status}>
            {detailsLength !== 0 && isAdmin ? (
                <ManageProject project={details} />
            ) : detailsLength !== 0 && !isAdmin ? (
                <ProjectDetails project={details} isJoinable={isJoinable} />
            ) : (
                'The project you are looking for does not exist.'
            )}
        </Wrapper>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const session = await unstable_getServerSession(
            context.req,
            context.res,
            authOptions
        )

        const response1 = await fetch(
            `http://localhost:3000/api/projects/${context.params.id}`
        )

        if (!response1.ok) {
            if (response1.status === 500) {
                return { props: { details: {} } }
            }
        }

        const projectData = await response1.json()

        const authenticatedUserId = session?.dbUser?._id.toString()

        const requestedMembers = projectData.requestedMembers.map(
            (member) => member._id
        )

        const isRequestedMember = requestedMembers.includes(authenticatedUserId)

        return {
            props: {
                details: projectData,
                isRequestedMember,
            },
        }
    } catch (error) {
        console.log(
            'An error occurred whiled server side rendering on Projects page.'
        )
    }
}
