import { useSession } from 'next-auth/react'
import { useState } from 'react'
import {
    Flex,
    Box,
    Heading,
    Text,
    VStack,
    Avatar,
    AvatarGroup,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BiUser, BiHourglass, BiTimeFive } from 'react-icons/bi'
import RequestedMemberCard from '../RequestedMemberCard'
import { DateTime } from 'luxon'

function DetailsPreviewCard({ info }) {
    const [projectRequestLoading, setProjectRequestLoading] = useState(false)

    const { data: session } = useSession()
    const router = useRouter()

    const isAdmin = info?.admin?._id === session?.dbUser?._id

    const requestedMembers = info?.requestedMembers?.map((member) => member._id)
    const isRequestedMember = requestedMembers?.includes(session?.dbUser._id)

    const isRequestedProject = session?.dbUser?.projectsRequested.includes(
        info._id
    )

    let isJoinable = isRequestedMember && isRequestedProject ? false : true

    const currentDate = DateTime.now()
    const creationDate = DateTime.fromISO(info?.createdAt)
    const creationDifference = creationDate?.diff(currentDate, ['days'])
    const creationPastDays = Math.abs(
        Math.round(creationDifference?.toObject().days)
    )
    const expirationDate = DateTime.fromISO(info?.expiresIn)
    const expirationDifference = expirationDate?.diff(currentDate, ['days'])
    const expirationRemainingDays = Math.round(
        expirationDifference?.toObject().days
    )

    const requestForProject = async () => {
        if (isJoinable) {
            setProjectRequestLoading(true)
            const formDataProject = {
                requestedMembers: session?.dbUser?._id,
            }
            const formDataUser = {
                projectsRequested: info?._id,
            }

            try {
                const updateRequestedMembers = await fetch(
                    `/api/projects/${info._id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formDataProject),
                    }
                )

                if (updateRequestedMembers.status !== 200) {
                    throw Error('Unable to update requestedMembers')
                }

                const updateProjectsRequested = await fetch(
                    `/api/user/${session.dbUser._id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formDataUser),
                    }
                )

                if (updateProjectsRequested.status !== 200) {
                    throw Error('Unable to update projectsRequested')
                }
                console.log('Successfully requested to join project!')
                router.reload()
            } catch (error) {
                setProjectRequestLoading(false)
                console.log(error)
                console.log(
                    'Something went wrong while trying to request to join a project.'
                )
            }
        }
    }

    const deleteProjectIdea = async (id) => {
        const patchUserData = [
            {
                projectsCreated: id,
            },
            {
                projectsRequested: id,
            },
            {
                projectsJoined: id,
            },
        ]
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            for (let patch of patchUserData) {
                await fetch(`/api/user/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(patch),
                })
            }

            if (!response.ok) {
                throw Error(
                    'Something went wrong while trying to delete project idea.'
                )
            }
            const data = await response.json()
            return router.reload()
        } catch (error) {
            console.log('Error while deleting project idea,')
        }
    }

    if (isAdmin) {
        const numberOfRequestedMembers = info?.requestedMembers?.length
        return (
            <Flex
                borderWidth="1.5px"
                borderRadius="lg"
                width="100%"
                padding="1rem"
                flexDirection="column"
                textAlign="left"
                gap={2}
                backgroundColor="white"
            >
                <Heading size="md">{info?.title}</Heading>
                <Flex gap={10}>
                    <Flex align="center" gap={1}>
                        <BiUser />
                        <Heading size="xs" fontWeight={500}>
                            {info?.admin?.username}
                        </Heading>
                    </Flex>
                    <Flex align="center" gap={1}>
                        <BiTimeFive />
                        <Heading size="xs" fontWeight={500}>
                            {info?.timezone}
                        </Heading>
                    </Flex>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiHourglass />
                    <Heading
                        size="xs"
                        fontWeight={500}
                        color="red.500"
                    >{`Expires in ${expirationRemainingDays} ${
                        expirationRemainingDays !== 1 ? 'days' : 'day'
                    }`}</Heading>
                </Flex>
                <Text fontSize="xs">
                    You’ll have 48 hours after the post expires to contact the
                    requested members, after which you will lose their contact
                    information along with this post.
                </Text>
                <hr />
                <Flex direction="column" marginTop={1} marginBottom={4}>
                    <Heading
                        size="sm"
                        marginBottom={2}
                    >{`Requested Members (${numberOfRequestedMembers})`}</Heading>
                    <VStack>
                        {info?.requestedMembers?.map((member, index) => {
                            return (
                                <RequestedMemberCard
                                    key={index}
                                    info={member}
                                />
                            )
                        })}
                    </VStack>
                </Flex>
                <Accordion allowToggle>
                    <AccordionItem border="none">
                        <h2>
                            <AccordionButton
                                padding={(2, 0)}
                                _hover={{ backgroundColor: '' }}
                            >
                                <Box flex="1" textAlign="left">
                                    <Heading
                                        size="sm"
                                        marginBottom={2}
                                        marginLeft={0}
                                    >
                                        Description
                                    </Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel padding={(16, 0, 4, 0)} fontSize="sm">
                            {info.details}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <hr />
                <Text fontSize="xs">{`posted ${creationPastDays} ${
                    creationPastDays !== 1 ? 'days' : 'day'
                } ago.`}</Text>

                <Button
                    width="fit-content"
                    colorScheme="red"
                    height="30px"
                    onClick={() => deleteProjectIdea(info._id)}
                >
                    <Text fontSize="xs" padding={0}>
                        Delete
                    </Text>
                </Button>
            </Flex>
        )
    }

    const isReported = false

    return (
        <Flex
            borderWidth="1.5px"
            borderRadius="lg"
            width="100%"
            padding="1rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Heading size="md">{info?.title}</Heading>

            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
                    <Heading size="xs" fontWeight={500}>
                        {info?.admin?.username}
                    </Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="xs" fontWeight={500}>
                        {info?.timezone}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="xs"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${expirationRemainingDays} ${
                    expirationRemainingDays !== 1 ? 'days' : 'day'
                }`}</Heading>
            </Flex>
            <Button
                isLoading={projectRequestLoading}
                width="fit-content"
                colorScheme={isJoinable ? 'green' : 'gray'}
                cursor={isJoinable ? 'pointer' : 'not-allowed'}
                marginBottom={4}
                height="30px"
                onClick={() => {
                    requestForProject()
                }}
            >
                {isJoinable ? (
                    <Text fontSize="xs">Request</Text>
                ) : (
                    <Text fontSize="xs">Requested</Text>
                )}
            </Button>
            <hr />
            <Flex direction="column">
                <Heading size="sm" marginTop={2} marginBottom={1}>
                    {info?.technologies?.length > 1
                        ? 'Technologies'
                        : 'Technology'}
                </Heading>
                {info?.technologies?.map((tech, index) => (
                    <Text key={index} fontSize="xs">
                        {tech}
                    </Text>
                ))}
            </Flex>
            <Flex direction="column" marginBottom={2}>
                <Heading size="sm" marginBottom={1}>
                    Description
                </Heading>
                <Text fontSize="xs">{info?.details}</Text>
            </Flex>
            <hr />
            <Flex direction="column">
                <Heading size="sm" marginTop={2} marginBottom={1}>
                    Project Insights
                </Heading>
                <Heading
                    size="xs"
                    marginTop={2}
                    marginBottom={1}
                    fontWeight={500}
                >
                    Requested Members
                </Heading>
                {info?.requestedMembers?.length > 0 && (
                    <AvatarGroup size="sm" max={0}>
                        {info.requestedMembers.map((member, index) => {
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
                    size="xs"
                    marginTop={2}
                    marginBottom={1}
                    fontWeight={500}
                >
                    Current Members
                </Heading>
                {info?.currentMembers?.length > 0 && (
                    <AvatarGroup size="sm" max={3}>
                        {info.currentMembers.map((member, index) => {
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
            <Text fontSize="xs">{`posted ${creationPastDays} ${
                creationPastDays !== 1 ? 'days' : 'day'
            } ago.`}</Text>
            <Button
                width="fit-content"
                color="white"
                backgroundColor={isReported ? 'gray.400' : 'gray.900'}
                height="30px"
            >
                {isReported ? (
                    <Text fontSize="xs">Reported</Text>
                ) : (
                    <Text fontSize="xs">Report</Text>
                )}
            </Button>
        </Flex>
    )
}

export default DetailsPreviewCard
