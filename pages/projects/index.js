import LimitsOverview from '../../src/components/LimitsOverview'
import ProjectPreviewCard from '../../src/components/ProjectPreviewCard'
import ProjectActions from '../../src/components/ProjectActions'
import {
    Flex,
    Text,
    Container,
    HStack,
    VStack,
    Divider,
    useMediaQuery,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Wrapper from '../../src/components/Wrapper'
import DetailsPreviewCard from '../../src/components/DetailsPreviewCard'
import { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { getProjects } from '../../controllers/project'
import { getNumberOfProjectsRequested } from '../../src/components/util'

export default function Projects({
    projects, //projects concats the order of authenticatedProjects followed by otherProjects
    authenticatedProjects,
    otherProjects,
}) {
    const CREATELIMIT = process.env.NEXT_PUBLIC_POSTLIMIT
    const [selectedProject, setSelectedProject] = useState({})
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

    const { data: session, status } = useSession()

    const selectedProjectHandler = (project) => {
        if (isLargerThan768) {
            setSelectedProject(project)
        }
        return
    }

    const countOfProjectsRequested = getNumberOfProjectsRequested(
        otherProjects,
        session
    )

    useEffect(() => {
        setSelectedProject(projects[0])
    }, [])

    return (
        <Wrapper session={session} status={status}>
            <Flex direction="column" width="100%" alignItems="center">
                <LimitsOverview
                    projectsCreated={authenticatedProjects.length}
                    projectsRequested={countOfProjectsRequested}
                />
                <ProjectActions
                    reachedMaximumPostedProjects={
                        authenticatedProjects.length >= CREATELIMIT
                    }
                />
            </Flex>
            <Flex
                width="100vw"
                minWidth="320px"
                direction="column"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#fafafa"
            >
                <Flex
                    maxWidth="1400px"
                    width="100%"
                    padding="2rem 2rem 0rem 2rem"
                    marginBottom={-4}
                >
                    <Text fontSize="xs">{`${projects.length} projects posted.`}</Text>
                </Flex>
                <Flex maxWidth="1400px" width="100%">
                    <HStack width="100%" align="flex-start" padding="2rem">
                        <VStack
                            marginTop={4}
                            spacing={4}
                            width={['100%', '100%', '50%', '50%']}
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
                                height="100%"
                                direction="column"
                                overflow="visible"
                                width="50%"
                                display={['none', 'none', 'flex', 'flex']}
                            >
                                <DetailsPreviewCard info={selectedProject} />
                            </VStack>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </Wrapper>
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
        const data = await getProjects()

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
