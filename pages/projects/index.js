import Head from 'next/head'
import LimitsOverview from '../../src/components/LimitsOverview'
import Navbar from '../../src/components/Navbar'
import ProjectPreviewCard from '../../src/components/ProjectPreviewCard'
import ProjectActions from '../../src/components/ProjectActions'
import { Spinner } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import AuthWrapper from '../../src/components/AuthWrapper'

// {projects}----->Desturctue of static props
export default function Projects({ projects }) {
    const { data: session, status } = useSession()

    return (
        <AuthWrapper session={session} status={status}>
            <LimitsOverview />
            <ProjectActions />
            {projects.map((project) => {
                return (
                    <ProjectPreviewCard key={project._id} project={project} />
                )
            })}
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
