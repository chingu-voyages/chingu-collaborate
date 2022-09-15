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
import { BiUser, BiTimeFive } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { deleteProjectIdea } from '../../controllers/project'

function ProjectPreviewCard({ project, isSelected, externalDetails, onClick }) {
    const router = useRouter()

    const { data: session } = useSession()

    const isAdmin = project.admin._id === session.dbUser._id

    const selectedProjectHandler = () => {
        if (externalDetails) {
            return
        }
        onClick()
    }

    return (
        <LinkBox
            as="article"
            width={['100%', '100%', '95%', '95%']}
            style={{ cursor: 'pointer' }}
        >
            <Flex
                borderWidth="1.5px"
                borderRadius="lg"
                borderColor={isSelected ? 'green.600' : ''}
                width="100%"
                padding="1rem"
                flexDirection="column"
                textAlign="left"
                gap={1}
                height="280px"
                backgroundColor="white"
            >
                <Flex align="center" justify="space-between">
                    {/* If the viewport is above medium, onClick changes selectedProject */}
                    <LinkOverlay
                        onClick={selectedProjectHandler}
                        href={
                            externalDetails
                                ? `/projects/${project._id}`
                                : undefined
                        }
                        isExternal={externalDetails ? true : false}
                    >
                        <Heading size="md" noOfLines={1}>
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
                                    onClick={async () => {
                                        if (
                                            (await deleteProjectIdea(
                                                project._id
                                            )) == true
                                        ) {
                                            router.reload()
                                        } else {
                                            console.log(
                                                'Something went wrong while trying to delete project idea.'
                                            )
                                        }
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            ) : (
                                <MenuItem>Report</MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                </Flex>
                <Flex gap={10}>
                    <Flex align="center" gap={1}>
                        <BiUser />
                        <Heading size="sm" fontWeight={500}>
                            {project.admin.username}
                        </Heading>
                    </Flex>
                    {project.timezone && (
                        <Flex align="center" gap={1}>
                            <BiTimeFive />
                            <Heading size="sm" fontWeight={500}>
                                {project.timezone}
                            </Heading>
                        </Flex>
                    )}
                </Flex>
                <HStack spacing={2}>
                    {project.technologies.map(
                        (tech, index) =>
                            index < 3 && (
                                <Tag
                                    key={index}
                                    variant="solid"
                                    colorScheme="gray"
                                >
                                    <TagLabel>{tech}</TagLabel>
                                </Tag>
                            )
                    )}
                    {project.technologies.length > 3 ? (
                        <Tag variant="solid" colorScheme="green">
                            <TagLabel>+</TagLabel>
                        </Tag>
                    ) : (
                        ''
                    )}
                </HStack>
                <Text fontSize="sm" noOfLines={5} marginTop={4}>
                    {project.details}
                </Text>
            </Flex>
        </LinkBox>
    )
}

export default ProjectPreviewCard
