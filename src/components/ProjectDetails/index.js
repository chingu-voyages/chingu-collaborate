import {
    Flex,
    Heading,
    Text,
    Avatar,
    AvatarGroup,
    Button,
} from '@chakra-ui/react'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getRelativeProjectDates, formatRelativeProjectDates } from '../util.js'
import { patchProject } from '../../controllers/project'

function ProjectDetails({ project, isJoinable }) {
    const [projectRequestLoading, setProjectRequestLoading] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()

    const { expiresMessage, createdMessage } = formatRelativeProjectDates(
        getRelativeProjectDates(project)
    )

    const requestedMembers = project?.requestedMembers?.map(
        (member) => member._id
    )
    const isRequestedMember = requestedMembers?.includes(session?.dbUser._id)
    console.log(isRequestedMember)

    const isReported = false

    const requestForProject = async () => {
        if (isJoinable) {
            setProjectRequestLoading(true)
            const formDataProject = {
                user_id: session?.dbUser?._id,
                requestType: 'requestForProject',
            }

            const response = await patchProject(project._id, formDataProject)
            if (response == true) {
                router.reload()
            } else {
                setProjectRequestLoading(false)
                console.log(
                    'Something went wrong while trying to request to join a project.'
                )
            }
        }
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
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{project?.title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
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
                isLoading={projectRequestLoading}
                loadingText="Requesting..."
                width="fit-content"
                colorScheme={isJoinable ? 'green' : 'gray'}
                cursor={isJoinable ? 'pointer' : 'not-allowed'}
                marginBottom={4}
                onClick={() => {
                    requestForProject()
                }}
            >
                {isRequestedMember ? (
                    <Text fontSize="xs">Requested</Text>
                ) : isJoinable ? (
                    <Text fontSize="xs">Request</Text>
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
                                    src={member?.imageUrl}
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
                                    src={member?.imageUrl}
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
