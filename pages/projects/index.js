import LimitsOverview from '../../src/components/LimitsOverview'
import ProjectPreviewCard from '../../src/components/ProjectPreviewCard'
import ProjectActions from '../../src/components/ProjectActions'
import {
    Box,
    Flex,
    HStack,
    VStack,
    Divider,
    useMediaQuery,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import AuthWrapper from '../../src/components/AuthWrapper'
import DetailsPreviewCard from '../../src/components/DetailsPreviewCard'
import { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

export default function Projects({
    projects, //projects concats the order of authenticatedProjects followed by otherProjects
    authenticatedProjects,
    otherProjects,
}) {
    const [selectedProject, setSelectedProject] = useState({})
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

    const { data: session, status } = useSession()

    const selectedProjectHandler = (project) => {
        if (isLargerThan768) {
            setSelectedProject(project)
        }
        return
    }

    const otherProjectRequestedMembers = otherProjects.map(
        (project) => project.requestedMembers
    )

    let countOfProjectsRequested = 0

    for (let i = 0; i < otherProjectRequestedMembers.length; i++) {
        for (let j = 0; j < otherProjectRequestedMembers[i].length; j++) {
            if (
                otherProjectRequestedMembers[i][j]._id === session?.dbUser._id
            ) {
                countOfProjectsRequested++
            }
        }
    }

    useEffect(() => {
        setSelectedProject(projects[0])
    }, [])

    return (
        <AuthWrapper session={session} status={status}>
            <LimitsOverview
                projectsCreated={authenticatedProjects?.length}
                projectsRequested={countOfProjectsRequested}
            />
            <ProjectActions
                reachedMaximumPostedProjects={authenticatedProjects.length >= 1}
            />
            <Flex
                backgroundColor="#faf9f8"
                width="100vw"
                minHeight="500px"
                justify="center"
            >
                <Flex maxWidth="1400px" width="100%">
                    <HStack
                        width="100%"
                        align="flex-start"
                        padding="2rem"
                        minWidth="320px"
                    >
                        <VStack
                            marginTop={4}
                            spacing={4}
                            width={['100%', '100%', '50%', '50%']}
                            minWidth="320px"
                            align={isLargerThan768 ? 'flex-start' : 'center'}
                        >
                            {/* Filter logged in user's  */}
                            {authenticatedProjects.map((project) => {
                                return (
                                    <ProjectPreviewCard
                                        onClick={() =>
                                            selectedProjectHandler(project)
                                        }
                                        externalDetails={!isLargerThan768}
                                        key={project._id}
                                        project={project}
                                        isSelected={
                                            project._id == selectedProject._id
                                                ? true
                                                : false
                                        }
                                    />
                                )
                            })}
                            {/* List all other projects */}
                            {otherProjects.map((project) => {
                                return (
                                    <ProjectPreviewCard
                                        onClick={() =>
                                            selectedProjectHandler(project)
                                        }
                                        externalDetails={!isLargerThan768}
                                        key={project._id}
                                        project={project}
                                        isSelected={
                                            project._id == selectedProject._id
                                                ? true
                                                : false
                                        }
                                    />
                                )
                            })}
                        </VStack>

                        {projects.length > 0 && (
                            <VStack
                                width="50%"
                                display={['none', 'none', 'flex', 'flex']}
                            >
                                <DetailsPreviewCard info={selectedProject} />
                            </VStack>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </AuthWrapper>
    )
}

export const getServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    const adminId = session?.dbUser?._id.toString()

    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'GET',
        })
        const data = await response.json()

        const authenticatedProjects = data.filter(
            (project) => project.admin._id === adminId
        )

        const otherProjects = data.filter(
            (project) => project.admin._id !== adminId
        )

        const projects = authenticatedProjects.concat(otherProjects)
        return {
            props: { projects, authenticatedProjects, otherProjects },
        }
    } catch (error) {
        return {
            props: {
                projects: [],
                authenticatedProjects: [],
                otherProjects: [],
            },
        }
    }
}
