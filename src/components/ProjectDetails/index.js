import {
    Flex,
    Heading,
    Text,
    Avatar,
    AvatarGroup,
    Button,
} from '@chakra-ui/react'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

function ProjectDetails({ project, isJoinable }) {
    const [projectRequestLoading, setProjectRequestLoading] = useState(false)

    const router = useRouter()
    const { data: session, status } = useSession()
    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project?.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remainingDays = `${Math.round(difference.toObject().days)} days`

    const isReported = false

    console.log(project.requestedMembers)

    const requestForProject = async () => {
        if (isJoinable) {
            setProjectRequestLoading(true)
            const formDataProject = {
                requestedMembers: session.dbUser._id,
            }

            try {
                const updateRequestedMembers = await fetch(
                    `/api/projects/${project._id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formDataProject),
                    }
                )

                if (updateRequestedMembers.status !== 200) {
                    throw Error('Unable to update requestedMembers')
                }

                console.log('Successfully requested to join project!')
                router.reload()
            } catch (error) {
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
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${remainingDays}`}</Heading>
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
                {isJoinable ? 'Request' : 'Requested'}
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
