import {
    Flex,
    Heading,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    HStack,
    Tag,
    TagLabel,
} from '@chakra-ui/react'

function LimitsOverview({ projectsCreated = 1, projectsRequested = 2 }) {
    return (
        <Flex
            width="90%"
            padding="2rem 0rem"
            flexDirection="column"
            textAlign="left"
            gap={4}
        >
            <Heading size="xl">Limits</Heading>
            <Flex justify="space-evenly">
                <Flex gap={2} align="center">
                    <Heading>{`${projectsCreated}/1`}</Heading>
                    <Text fontSize="sm" fontWeight={600}>
                        Project Ideas Posted
                    </Text>
                </Flex>
                <Flex gap={2} align="center">
                    <Heading>{`${projectsRequested}/5`}</Heading>
                    <Text fontSize="sm" fontWeight={600}>
                        Projects Requested
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LimitsOverview
