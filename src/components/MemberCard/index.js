import { useState } from 'react'
import { Avatar, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { BiCheck, BiX } from 'react-icons/bi'

function RequestedMemberCard({ info, isRequestable, onApprove, onReject }) {
    const [disableActions, setDisableActions] = useState(false)

    const approveMember = (info) => {
        setDisableActions(true)
        onApprove(info?._id)
    }

    const rejectMember = (info) => {
        setDisableActions(true)
        onReject(info?._id)
    }

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="100%"
            padding="1rem 1.25rem"
            flexDirection="column"
            textAlign="left"
            gap={1}
        >
            <Flex gap={5} align="center">
                <Avatar name={info.username} src={info?.discordAvatarUrl} />
                {isRequestable && (
                    <Flex
                        justify="center"
                        height="100%"
                        direction="column"
                        width="fit-content"
                        gap={1}
                    >
                        <Button
                            colorScheme="green"
                            isDisabled={disableActions ? true : false}
                            size="xs"
                            width="100%"
                            onClick={() => approveMember(info)}
                        >
                            <BiCheck />
                        </Button>
                        <Button
                            colorScheme="red"
                            isDisabled={disableActions ? true : false}
                            size="xs"
                            width="100%"
                            onClick={() => rejectMember(info)}
                        >
                            <BiX />
                        </Button>
                    </Flex>
                )}
                <Flex direction="column">
                    <Flex align="center" gap={1}>
                        <Heading size="xs">Username:</Heading>
                        <Text fontSize="xs" textOverflow="ellipsis">
                            {info.username}
                        </Text>
                    </Flex>
                    {info.location !== undefined && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Location:</Heading>
                            <Text fontSize="xs">{info.location}</Text>
                        </Flex>
                    )}

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Discord:</Heading>
                        <Text fontSize="xs">{info.discordUsername}</Text>
                    </Flex>

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Email:</Heading>
                        <Text fontSize="xs">{info.email}</Text>
                    </Flex>

                    {info.githubLink !== undefined && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Github:</Heading>
                            <Text fontSize="xs">{info.githubLink}</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RequestedMemberCard
