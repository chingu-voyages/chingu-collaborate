import LimitsOverview from '../../components/LimitsOverview'
import ProjectPreviewCard from '../../components/ProjectPreviewCard'
import ProjectActions from '../../components/ProjectActions'
import { Flex, Text, HStack, VStack, useMediaQuery } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Wrapper from '../../components/Wrapper'
import DetailsPreviewCard from '../../components/DetailsPreviewCard'
import { useEffect, useState, useReducer } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { getProjects } from '../../controllers/project'
import { getNumberOfProjectsRequested } from '../../components/util'
import Pagination from '../../components/Pagination'
import { range } from '../../components/util'

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

    // Pagination Logic
    const PROJECTSPERPAGE = 5
    const TOTALPROJECTPAGES = Math.ceil(projects.length / PROJECTSPERPAGE)
    const MAXNUMBEROFPAGESTOSHOW = 3 //Excludes arrow buttons

    const initialState = {
        selectedPage: 1,
        minPage: 1,
        maxPage: 3,
        pageRange: [],
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'MOUNT':
                if (TOTALPROJECTPAGES <= MAXNUMBEROFPAGESTOSHOW) {
                    return {
                        selectedPage: 1,
                        minPage: 1,
                        maxPage: TOTALPROJECTPAGES,
                        pageRange: range(state.minPage, TOTALPROJECTPAGES),
                    }
                }
                if (TOTALPROJECTPAGES > MAXNUMBEROFPAGESTOSHOW) {
                    return {
                        selectedPage: 1,
                        minPage: 1,
                        maxPage: MAXNUMBEROFPAGESTOSHOW,
                        pageRange: range(state.minPage, MAXNUMBEROFPAGESTOSHOW),
                    }
                }
                break
            case 'CHANGE':
                // selected page is above the max page
                if (action.payload.selectedPage > state.maxPage) {
                    const difference =
                        TOTALPROJECTPAGES - Number(action.payload.selectedPage)
                    return {
                        selectedPage: Number(action.payload.selectedPage),
                        minPage: Number(action.payload.selectedPage),
                        maxPage:
                            difference < 2
                                ? TOTALPROJECTPAGES
                                : Number(action.payload.selectedPage) + 2,
                        pageRange: range(
                            Number(action.payload.selectedPage),
                            difference < 2
                                ? TOTALPROJECTPAGES
                                : Number(action.payload.selectedPage) + 2
                        ),
                    }
                }

                // selected page is between the min and max pages
                if (
                    action.payload.selectedPage >= state.minPage &&
                    action.payload.selectedPage <= state.maxPage
                ) {
                    return {
                        selectedPage: Number(action.payload.selectedPage),
                        minPage: state.minPage,
                        maxPage: state.maxPage,
                        pageRange: range(state.minPage, state.maxPage),
                    }
                }

                // selected page is below min page
                if (action.payload.selectedPage < state.minPage) {
                    const difference = Number(action.payload.selectedPage) - 2
                    return {
                        selectedPage: Number(action.payload.selectedPage),
                        minPage: difference > 0 ? difference : 1,
                        maxPage: Number(action.payload.selectedPage),
                        pageRange: range(
                            difference > 0 ? difference : 1,
                            Number(action.payload.selectedPage)
                        ),
                    }
                }
                break
            default:
                console.log('Enter a valid action.')
        }
    }
    const [page, dispatch] = useReducer(reducer, initialState)

    const projectsOnPage = projects.slice(
        Number(PROJECTSPERPAGE * page?.selectedPage) - PROJECTSPERPAGE,
        Number(PROJECTSPERPAGE * page?.selectedPage)
    )

    const changeProjectPageHandler = (page) => {
        dispatch({ type: 'CHANGE', payload: { selectedPage: page } })
    }

    useEffect(() => {
        dispatch({ type: 'MOUNT' })
        setSelectedProject(projectsOnPage[0])
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
                            {projectsOnPage.map((project) => {
                                return (
                                    <ProjectPreviewCard
                                        onClick={() =>
                                            selectedProjectHandler(project)
                                        }
                                        externalDetails={!isLargerThan768}
                                        key={project._id}
                                        project={project}
                                        isSelected={
                                            project._id == selectedProject?._id
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
                <Pagination
                    page={page}
                    totalProjectPages={TOTALPROJECTPAGES}
                    onChange={(page) => changeProjectPageHandler(page)}
                />
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