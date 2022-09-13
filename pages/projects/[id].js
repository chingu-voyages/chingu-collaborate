import Head from 'next/head'
import ManageProject from '../../src/components/ManageProject'
import Navbar from '../../src/components/Navbar'
import ProjectDetails from '../../src/components/ProjectDetails'
import { useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import AuthWrapper from '../../src/components/AuthWrapper'

export default function Project({ details, isJoinable }) {
    const { data: session, status } = useSession()

    const isAdmin = session?.dbUser?._id === details?.admin?._id

    const detailsLength = Object.keys(details).length
    return (
        <AuthWrapper session={session} status={status}>
            {detailsLength !== 0 && isAdmin ? (
                <ManageProject project={details} />
            ) : detailsLength !== 0 && !isAdmin ? (
                <ProjectDetails project={details} isJoinable={isJoinable} />
            ) : (
                'The project you are looking for does not exist.'
            )}
        </AuthWrapper>
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

        const requestedProjects = session?.dbUser?.projectsRequested.map(
            (project) => project.toString()
        )

        const isRequestedProject = requestedProjects.includes(
            projectData._id.toString()
        )

        let isJoinable = isRequestedMember && isRequestedProject ? false : true

        return {
            props: {
                details: projectData,
                isJoinable,
            },
        }
    } catch (error) {
        console.log(
            'An error occurred whiled server side rendering on Projects page.'
        )
    }
}
