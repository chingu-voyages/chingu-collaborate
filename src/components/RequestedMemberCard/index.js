import { Avatar, Flex, Heading, Text } from '@chakra-ui/react'

function RequestedMemberCard({ info }) {
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
