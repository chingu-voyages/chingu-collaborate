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
import { DateTime } from 'luxon'

function ProjectPreviewCard({ project }) {
    const inputMarginBottom = '1rem'
    const labelMarginBottom = '0'

    // const elapsedTimeSincePosted = datePosted // add logic to find the current time vs the time posted

    const isAdmin = true // add logic to check if the logged in user is the admin for this project

    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remaningDays = `${Math.round(difference.toObject().days)} days`

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
                    {project.title}
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
                    >{`${project.admin} posted ${project.datePosted}`}</Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="sm" fontWeight={500}>
                        {project.location}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${remaningDays}`}</Heading>
            </Flex>

            <HStack spacing={2}>
                {project.technologies.map((tech, index) => (
                    <Tag key={index} variant="solid" colorScheme="gray">
                        <TagLabel>{tech}</TagLabel>
                    </Tag>
                ))}
            </HStack>
            <Text fontSize="md" noOfLines={[4, 4, 3]}>
                {project.details}
            </Text>
        </Flex>
    )
}

export default ProjectPreviewCard
