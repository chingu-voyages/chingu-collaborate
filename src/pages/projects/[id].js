import ManageProject from '../../components/ManageProject'
import ProjectDetails from '../../components/ProjectDetails'
import { useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import Wrapper from '../../components/Wrapper'
import { getNumberOfProjectsRequested } from '../../components/util.js'
import { getProjects, getProjectById } from '../../controllers/project'

export default function Project({
    details,
    projects,
    isRequestedMember,
    isCurrentMember,
}) {
    const JOINLIMIT = process.env.NEXT_PUBLIC_JOINLIMIT

    const { data: session, status } = useSession()

    const projectExists = Object.keys(details).length > 0

    const isAdmin = session?.dbUser?._id === details?.admin?._id

    const projectsJoined = getNumberOfProjectsRequested(projects, session)

    const isJoinable =
        !isRequestedMember && projectsJoined < JOINLIMIT && !isCurrentMember

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

        const projectData = await getProjectById(context)

        const allProjectsData = await getProjects(context.req.headers.cookie)

        const requestedMembers = projectData?.requestedMembers.map(
            (member) => member._id
        )

        const currentMembers = projectData?.currentMembers.map(
            (member) => member._id
        )
        const authenticatedUserId = session?.dbUser?._id.toString()

        const isRequestedMember = requestedMembers.includes(authenticatedUserId)
        const isCurrentMember = currentMembers.includes(authenticatedUserId)

        return {
            props: {
                details: projectData,
                projects: allProjectsData,
                isRequestedMember,
                isCurrentMember,
            },
        }
    } catch (error) {
        return { props: { details: {}, projects: [] } }
    }
}
