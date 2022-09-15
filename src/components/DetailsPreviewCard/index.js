import { useSession } from 'next-auth/react'
import useSWR from 'swr'
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
import { deleteProjectIdea, patchProject } from '../../../controllers/project'
import {
    getNumberOfProjectsRequested,
    getRelativeProjectDates,
    formatRelativeProjectDates,
} from '../util.js'

function DetailsPreviewCard({ info }) {
    const [projectRequestLoading, setProjectRequestLoading] = useState(false)

    const { data: session } = useSession()
    const router = useRouter()

    const isAdmin = info?.admin?._id === session?.dbUser?._id

    const requestedMembers = info?.requestedMembers?.map((member) => member._id)
    const isRequestedMember = requestedMembers?.includes(session?.dbUser._id)

    const JOINLIMIT = process.env.NEXT_PUBLIC_JOINLIMIT

    const { expiresMessage, createdMessage } = formatRelativeProjectDates(
        getRelativeProjectDates(info)
    )

    const requestForProject = async () => {
        if (isJoinable) {
            setProjectRequestLoading(true)
            const formDataProject = {
                user_id: session?.dbUser?._id,
                requestType: 'requestForProject',
            }

            const response = await patchProject(info._id, formDataProject)
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

    const fetcher = (...args) => fetch(...args).then((res) => res.json())

    const { data, error } = useSWR(
        'http://localhost:3000/api/projects',
        fetcher
    )

    const projectsJoined = getNumberOfProjectsRequested(data, session)

    const isJoinable = !isRequestedMember && projectsJoined < JOINLIMIT

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
                position="sticky"
                top="20px"
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
                    <Heading size="xs" fontWeight={500} color="red.500">
                        {expiresMessage}
                    </Heading>
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
                <Text fontSize="xs">{createdMessage}</Text>
                <Button
                    width="fit-content"
                    colorScheme="red"
                    height="30px"
                    onClick={async () => {
                        if ((await deleteProjectIdea(info._id)) == true) {
                            router.reload()
                        } else {
                            console.log(
                                'Something went wrong while trying to delete project idea.'
                            )
                        }
                    }}
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
            backgroundColor="white"
            position="sticky"
            top="20px"
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
                <Heading size="xs" fontWeight={500} color="red.500">
                    {expiresMessage}
                </Heading>
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
                {isRequestedMember ? (
                    <Text fontSize="xs">Requested</Text>
                ) : isJoinable ? (
                    <Text fontSize="xs">Request</Text>
                ) : (
                    <Text fontSize="xs">Limit Reached</Text>
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
                    <AvatarGroup size="sm" max={2}>
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
                    <AvatarGroup size="sm" max={2}>
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
            <Text fontSize="xs">{createdMessage}</Text>
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
