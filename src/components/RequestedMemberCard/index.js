import { Flex, Heading, Text } from '@chakra-ui/react'

function RequestedMemberCard({
    username = 'Username',
    location = 'location',
    discordUsername = 'Test#0012',
    email = 'johndoe@random.com',
    githubProfile = 'NA',
}) {
    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="100%"
            padding="1rem 1.25rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Heading size="md">{username}</Heading>
            <Text fontSize="sm" marginBottom={4}>
                {location}
            </Text>

            <Text fontSize="sm">{discordUsername}</Text>
            <Text fontSize="sm">{email}</Text>
            <Text fontSize="sm">{githubProfile}</Text>
        </Flex>
    )
}

export default RequestedMemberCard
