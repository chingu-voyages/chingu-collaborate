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
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'

function ProjectPreviewCard({
    title = 'Project Title',
    admin = 'username',
    datePosted = 'today',
    location = 'Toronto',
    expiresIn = 'NA',
    technologies = ['Technology 1', 'Technology 2', 'Technology 3'],
    details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}) {
    const inputMarginBottom = '1rem'
    const labelMarginBottom = '0'

    const elapsedTimeSincePosted = datePosted // add logic to find the current time vs the time posted

    const isAdmin = true // add logic to check if the logged in user is the admin for this project

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            borderColor={isAdmin ? 'green.500' : ''}
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg" noOfLines={1}>
                    {title}
                </Heading>
                <Menu>
                    <MenuButton
                        variant="ghost"
                        as={IconButton}
                        icon={<BsThreeDotsVertical fontSize={20} />}
                    />
                    <MenuList>
                        {isAdmin ? (
                            <MenuItem>Delete</MenuItem>
                        ) : (
                            <MenuItem>Report</MenuItem>
                        )}
                    </MenuList>
                </Menu>

                {/* <IconButton
                    variant="ghost"
                    icon={<BsThreeDotsVertical fontSize={20} />}
                /> */}
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
            <Text fontSize="md" noOfLines={[4, 4, 3]}>
                {details}
            </Text>
        </Flex>
    )
}

export default ProjectPreviewCard