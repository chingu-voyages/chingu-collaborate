import {
    Avatar,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { BiCheck, BiX } from 'react-icons/bi'

function RequestedMemberCard({ info, isRequestable, onApprove, onReject }) {
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
                            size="xs"
                            width="100%"
                            onClick={() => onApprove(info._id)}
                        >
                            <BiCheck />
                        </Button>
                        <Button
                            colorScheme="red"
                            size="xs"
                            width="100%"
                            onClick={() => onReject(info?._id)}
                        >
                            <BiX />
                        </Button>
                    </Flex>
                )}
                <Flex direction="column">
                    <Flex align="center" gap={1}>
                        <Heading size="xs">Username:</Heading>
                        <Text fontSize="sm">{info.username}</Text>
                    </Flex>
                    {info.location !== '' && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Location:</Heading>
                            <Text fontSize="xs">{info.location}</Text>{' '}
                        </Flex>
                    )}

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Discord:</Heading>
                        <Text fontSize="sm">{info.discordUsername}</Text>
                    </Flex>

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Email:</Heading>
                        <Text fontSize="sm">{info.email}</Text>
                    </Flex>

                    {info.githubProfile !== undefined && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Github:</Heading>
                            <Text fontSize="sm">{info.githubProfile}</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RequestedMemberCard
