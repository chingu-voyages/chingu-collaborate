import { Flex, Heading, Text } from '@chakra-ui/react'

function RequestedMemberCard({ info }) {
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
            <Heading size="md">{info.username}</Heading>
            <Text fontSize="sm" marginBottom={4}>
                {info.location}
            </Text>

            <Text fontSize="sm">{info.discordUsername}</Text>
            <Text fontSize="sm">{info.email}</Text>
            <Text fontSize="sm">{info.githubProfile}</Text>
        </Flex>
    )
}

export default RequestedMemberCard
