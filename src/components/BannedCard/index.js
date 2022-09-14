import { Flex, Spacer, Heading, Text } from '@chakra-ui/react'

function BannedCard({ reason }) {
    return (
        <Flex
            borderWidth="3px"
            borderRadius="lg"
            borderColor="red.600"
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="center"
            gap={2}
            marginTop={10}
        >
            <Heading size="lg">
                Your account has been suspended for violating the community
                standards.
            </Heading>
            <Spacer />
            <Text fontSize="lg">{`"${reason}"`}</Text>
        </Flex>
    )
}

export default BannedCard
