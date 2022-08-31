import {
    Flex,
    Heading,
    Text,
    HStack,
    TagLabel,
    Tag,
    Button,
} from '@chakra-ui/react'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'

function ProjectDetails({
    title = 'Project Title',
    admin = 'username',
    datePosted = 'today',
    location = 'Toronto',
    expiresIn = 'NA',
    technologies = ['Technology 1', 'Technology 2', 'Technology 3'],
    details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}) {
    const elapsedTimeSincePosted = datePosted // add logic to find the current time vs the time posted

    const isJoinable = true
    const isReported = false

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
                    <Heading
                        size="sm"
                        fontWeight={500}
                    >{`${admin} posted ${datePosted}`}</Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="sm" fontWeight={500}>
                        {location}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${expiresIn}`}</Heading>
            </Flex>

            <HStack spacing={2}>
                {technologies.map((tech, index) => (
                    <Tag key={index} variant="solid" colorScheme="gray">
                        <TagLabel>{tech}</TagLabel>
                    </Tag>
                ))}
            </HStack>
            <Button
                width="fit-content"
                colorScheme={isJoinable ? 'green' : 'gray'}
                cursor={isJoinable ? 'pointer' : 'not-allowed'}
                marginBottom={4}
            >
                {isJoinable ? 'Request' : 'Requested'}
            </Button>
            <hr />
            <Flex direction="column" marginBottom={4}>
                <Heading size="md" marginTop={4} marginBottom={2}>
                    Description
                </Heading>
                <Text fontSize="md">{details}</Text>
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
