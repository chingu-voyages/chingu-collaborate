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
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiUser, BiTimeFive, BiHourglass } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function ProjectPreviewCard({ project, isAdmin }) {
    const router = useRouter()
    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remaningDays = `${Math.round(difference.toObject().days)} days`

    // bELOW CODE IS INVALID NOW. NO NEED TO FETCH USER BASED ON ADMIN. ITS ALREADY POPULATED IN PROJECT JSON

    // const [admin, setAdmin] = useState('')
    // const [location, setLocation] = useState('')

    // const getAdmin = async () => {
    //     const response = await fetch(`/api/user/${project.admin}`)
    //     const user = await response.json()
    //     setAdmin(user?.username)
    //     setLocation(user?.location)
    // }

    // useEffect(() => {
    //     getAdmin()
    // }, [])

    const deleteProjectIdea = async (id) => {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                throw Error(
                    'Something went wrong while trying to delete project idea.'
                )
            }
            const data = await response.json()
            return router.reload()
        } catch (error) {
            console.log('Error while deleting project idea,')
        }
    }

    return (
        <LinkBox as="article" width="90%">
            <Flex
                borderWidth="2px"
                borderRadius="lg"
                borderColor={isAdmin ? 'green.500' : ''}
                width="100%"
                padding="2rem"
                flexDirection="column"
                textAlign="left"
                gap={2}
            >
                <Flex align="center" justify="space-between">
                    <LinkOverlay href={`/projects/${project._id}`}>
                        <Heading size="lg" noOfLines={1}>
                            {project.title}
                        </Heading>
                    </LinkOverlay>
                    <Menu>
                        <MenuButton
                            variant="ghost"
                            as={IconButton}
                            icon={<BsThreeDotsVertical fontSize={20} />}
                        />
                        <MenuList>
                            {isAdmin ? (
                                <MenuItem
                                    onClick={() =>
                                        deleteProjectIdea(project._id)
                                    }
                                >
                                    Delete
                                </MenuItem>
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
                        <Heading size="sm" fontWeight={500}>
                            {project.admin.username}
                        </Heading>
                    </Flex>
                    {project.admin.location != '' && (
                        <Flex align="center" gap={1}>
                            <BiTimeFive />
                            <Heading size="sm" fontWeight={500}>
                                {project.admin.location}
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
        </LinkBox>
    )
}

export default ProjectPreviewCard
