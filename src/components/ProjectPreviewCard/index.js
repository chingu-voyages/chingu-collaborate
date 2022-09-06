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
import { useEffect, useState } from 'react'

function ProjectPreviewCard({ project, isAdmin }) {
    const [admin, setAdmin] = useState('')
    const [location, setLocation] = useState('')

    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remaningDays = `${Math.round(difference.toObject().days)} days`

    const getAdmin = async () => {
        const response = await fetch(`/api/user/${project.admin}`)
        const user = await response.json()
        setAdmin(user?.username)
        setLocation(user?.location)
    }

    useEffect(() => {
        getAdmin()
    }, [])

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
                    <Heading size="sm" fontWeight={500}>{`${admin} `}</Heading>
                </Flex>
                {location != '' && (
                    <Flex align="center" gap={1}>
                        <BiTimeFive />
                        <Heading size="sm" fontWeight={500}>
                            {location}
                        </Heading>
                    </Flex>
                )}
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
