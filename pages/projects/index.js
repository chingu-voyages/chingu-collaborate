import Head from 'next/head'
import LimitsOverview from '../../src/components/LimitsOverview'
import Navbar from '../../src/components/Navbar'
import ProjectPreviewCard from '../../src/components/ProjectPreviewCard'
import ProjectActions from '../../src/components/ProjectActions'
import { VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import AuthWrapper from '../../src/components/AuthWrapper'

// {projects}----->Desturctue of static props
export default function Projects({ projects }) {
    const { data: session, status } = useSession()

    const authenticatedPosts = projects.filter(
        (project) => project.admin === session?.dbUser?._id
    )

    const otherPosts = projects.filter(
        (project) => project.admin !== session?.dbUser?._id
    )

    return (
        <AuthWrapper session={session} status={status}>
            <LimitsOverview
                projectsCreated={session?.dbUser?.projectsCreated.length}
                projectsRequested={session?.dbUser?.projectsRequested.length}
            />
            <ProjectActions
                reachedMaximumPosts={authenticatedPosts.length >= 1}
            />
            <VStack spacing={4}>
                {/* Filter logged in user's posts */}
                {authenticatedPosts.map((project) => {
                    return (
                        <ProjectPreviewCard
                            key={project._id}
                            project={project}
                            isAdmin={true}
                        />
                    )
                })}
                {/* List all other posts */}
                {otherPosts.map((project) => {
                    return (
                        <ProjectPreviewCard
                            key={project._id}
                            project={project}
                            isAdmin={false}
                        />
                    )
                })}
            </VStack>
        </AuthWrapper>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/projects', {
        method: 'GET',
    })
    const data = await response.json()
    return {
        props: { projects: data },
    }
}
