import { Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { BiHourglass } from 'react-icons/bi'

function ManageProject({
    title = 'Project Title',
    admin = 'username',
    datePosted = 'today',
    location = 'Toronto',
    expiresIn = 'NA',
    technologies = ['Technology 1', 'Technology 2', 'Technology 3'],
    details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}) {
    const elapsedTimeSincePosted = datePosted // add logic to find the current time vs the time posted

    const numberOfRequestedMembers = 6

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

            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${expiresIn}`}</Heading>
            </Flex>
            <Text fontSize="xs">
                You’ll have 48 hours after the post expires to contact the
                requested members, after which you will lose their contact
                information along with this post.
            </Text>
            <hr />
            <Flex direction="column" marginTop={4}>
                <Heading size="md">{`Requested Members (${numberOfRequestedMembers})`}</Heading>
                <VStack></VStack>
            </Flex>
        </Flex>
    )
}

export default ManageProject
