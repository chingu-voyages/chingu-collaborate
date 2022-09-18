import {
    Flex,
    Heading,
    Text,
    Avatar,
    AvatarGroup,
    Button,
} from '@chakra-ui/react'
import { BiTimeFive, BiHourglass } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getRelativeProjectDates, formatRelativeProjectDates } from '../util.js'
import { patchProject } from '../../controllers/project'

function ProjectDetails({ project, isJoinable }) {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()

    const { expiresMessage, createdMessage } = formatRelativeProjectDates(
        getRelativeProjectDates(project)
    )

    const requestedMembers = project?.requestedMembers?.map(
        (member) => member._id
    )
    const isRequestedMember = requestedMembers?.includes(session?.dbUser._id)

    const currentMembers = project?.currentMembers?.map((member) => member._id)
    const isCurrentMember = currentMembers?.includes(session?.dbUser._id)

    const isReported = false

    const requestForProject = async () => {
        try {
            setIsLoading(true)
            const formDataProject = {
                user_id: session?.dbUser?._id,
                requestType: 'requestForProject',
            }

            const response = await patchProject(project._id, formDataProject)
            if (response == true) {
                router.reload()
            } else {
                setIsLoading(false)
                console.log(
                    'Something went wrong while trying to request to join a project.'
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    const withdrawFromProject = async () => {
        try {
            setIsLoading(true)
            const formDataProject = {
                user_id: session?.dbUser?._id,
                requestType: 'withdrawFromProject',
            }

            const response = await patchProject(project._id, formDataProject)
            if (response == true) {
                router.reload()
            } else {
                setIsLoading(false)
                console.log(
                    'Something went wrong while trying to withdraw from a project.'
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    const requestHandler = async () => {
        if (isJoinable) {
            return await requestForProject()
        }
        if (isRequestedMember) {
            return await withdrawFromProject()
        }
        // If limit reached
        return
    }

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            maxWidth="750px"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
            marginTop={10}
            marginBottom={10}
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{project?.title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <Avatar
                        size="xs"
                        name={project?.admin?.username}
                        src={project?.admin?.discordAvatarUrl}
                    />
                    <Heading
                        size="sm"
                        fontWeight={500}
                    >{`${project?.admin?.username}`}</Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="sm" fontWeight={500}>
                        {project?.timezone}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading size="sm" fontWeight={500} color="red.500">
                    {expiresMessage}
                </Heading>
            </Flex>

            <Button
                isLoading={isLoading}
                width="fit-content"
                colorScheme={
                    isJoinable
                        ? 'green'
                        : isRequestedMember
                        ? 'yellow'
                        : isCurrentMember
                        ? 'gray'
                        : 'red'
                }
                cursor={
                    isJoinable
                        ? 'pointer'
                        : isRequestedMember
                        ? 'pointer'
                        : 'not-allowed'
                }
                marginBottom={4}
                onClick={() => {
                    requestHandler()
                }}
            >
                {isRequestedMember ? (
                    <Text fontSize="xs">Withdraw</Text>
                ) : isJoinable ? (
                    <Text fontSize="xs">Request</Text>
                ) : isCurrentMember ? (
                    <Text fontSize="xs">Joined</Text>
                ) : (
                    <Text fontSize="xs">Limit Reached</Text>
                )}
            </Button>
            <hr />
            <Flex direction="column" marginBottom={4}>
                <Heading size="md" marginTop={4} marginBottom={2}>
                    {project.technologies.length > 1
                        ? 'Technologies'
                        : 'Technology'}
                </Heading>
                <Text fontSize="md">
                    {project?.technologies.map((tech, index) => (
                        <Text key={index} fontSize="md">
                            {tech}
                        </Text>
                    ))}
                </Text>
            </Flex>
            <Flex direction="column" marginBottom={4}>
                <Heading size="md" marginTop={4} marginBottom={2}>
                    Description
                </Heading>
                <Text fontSize="md">{project?.details}</Text>
            </Flex>
            <hr />
            <Flex direction="column">
                <Heading size="md" marginTop={2} marginBottom={1}>
                    Project Insights
                </Heading>
                <Heading
                    size="md"
                    marginTop={2}
                    marginBottom={1}
                    fontWeight={500}
                >
                    Requested Members
                </Heading>
                {project.requestedMembers.length > 0 && (
                    <AvatarGroup size="md" max={2}>
                        {project.requestedMembers.map((member, index) => {
                            return (
                                <Avatar
                                    key={index}
                                    name={member.username}
                                    src={member?.discordAvatarUrl}
                                />
                            )
                        })}
                    </AvatarGroup>
                )}
                <Heading
                    size="md"
                    marginTop={2}
                    marginBottom={1}
                    fontWeight={500}
                >
                    Current Members
                </Heading>
                {project.currentMembers.length > 0 && (
                    <AvatarGroup size="md" max={2}>
                        {project.currentMembers.map((member, index) => {
                            return (
                                <Avatar
                                    key={index}
                                    name={member.username}
                                    src={member?.discordAvatarUrl}
                                />
                            )
                        })}
                    </AvatarGroup>
                )}
            </Flex>
            <hr />
            <Text fontSize="sm">{createdMessage}</Text>
            <Button
                width="fit-content"
                color="white"
                backgroundColor={isReported ? 'gray.400' : 'gray.900'}
                marginTop={4}
            >
                {isReported ? 'Reported' : 'Report'}
            </Button>
        </Flex>
    )
}

export default ProjectDetails
