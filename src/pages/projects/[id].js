import ManageProject from '../../components/ManageProject'
import ProjectDetails from '../../components/ProjectDetails'
import { useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import Wrapper from '../../components/Wrapper'
import { getNumberOfProjectsRequested } from '../../components/util.js'

export default function Project({ details, projects, isRequestedMember }) {
    const JOINLIMIT = process.env.NEXT_PUBLIC_JOINLIMIT

    const { data: session, status } = useSession()

    const projectExists = Object.keys(details).length > 0

    const isAdmin = session?.dbUser?._id === details?.admin?._id

    const projectsJoined = getNumberOfProjectsRequested(projects, session)
    const isJoinable = !isRequestedMember && projectsJoined < JOINLIMIT

    return (
        <Wrapper session={session} status={status}>
            {projectExists && isAdmin ? (
                <ManageProject project={details} />
            ) : projectExists && !isAdmin ? (
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

        const projectResponse = await fetch(
            `http://localhost:3000/api/projects/${context.params.id}`
        )

        if (!projectResponse.ok) {
            throw Error('project response failed')
        }

        const allProjectsResponse = await fetch(
            'http://localhost:3000/api/projects'
        )

        if (!allProjectsResponse.ok) {
            throw Error('allProjects response failed')
        }

        const projectData = await projectResponse.json()

        const allProjectsData = await allProjectsResponse.json()

        const requestedMembers = projectData.requestedMembers.map(
            (member) => member._id
        )
        const authenticatedUserId = session?.dbUser?._id.toString()

        const isRequestedMember = requestedMembers.includes(authenticatedUserId)

        return {
            props: {
                details: projectData,
                projects: allProjectsData,
                isRequestedMember,
            },
        }
    } catch (error) {
        console.log(
            'An error occurred whiled server side rendering on Projects page.'
        )

        return { props: { details: {}, projects: [] } }
    }
}
