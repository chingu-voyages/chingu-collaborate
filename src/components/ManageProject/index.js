import {
    Button,
    Flex,
    Box,
    Heading,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Avatar,
} from '@chakra-ui/react'

import { BiTimeFive, BiHourglass } from 'react-icons/bi'
import { useRouter } from 'next/router'
import MemberCard from '../MemberCard'
import { deleteProjectIdea } from '../../controllers/project'
import { patchProject } from '../../controllers/project'
import { getRelativeProjectDates, formatRelativeProjectDates } from '../util.js'

function ManageProject({ project }) {
    const { expiresMessage, createdMessage } = formatRelativeProjectDates(
        getRelativeProjectDates(project)
    )

    const numberOfRequestedMembers = project?.requestedMembers?.length
    const numberOfCurrentMembers = project?.currentMembers?.length

    const router = useRouter()

    const approveHandler = async (id, projectId) => {
        const formDataProject = {
            user_id: id,
            requestType: 'approveProject',
        }

        const response = await patchProject(projectId, formDataProject)
        if (response == true) {
            router.reload()
        } else {
            console.log(
                'Something went wrong while trying to approve a member.'
            )
        }
    }
    const rejectHandler = async (id, projectId) => {
        const formDataProject = {
            user_id: id,
            requestType: 'rejectProject',
        }

        const response = await patchProject(projectId, formDataProject)
        if (response == true) {
            router.reload()
        } else {
            console.log('Something went wrong while trying to reject a member.')
        }
    }

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            maxWidth="750px"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
            marginTop={10}
            marginBottom={10}
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{project?.title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <Avatar
                        size="xs"
                        name={project?.admin?.username}
                        src={project?.admin?.discordAvatarUrl}
                    />
                    <Heading size="sm" fontWeight={500}>
                        {project?.admin?.username}
                    </Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="sm" fontWeight={500}>
                        {project.timezone}
                    </Heading>
                </Flex>
            </Flex>
            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading size="sm" fontWeight={500} color="red.500">
                    {expiresMessage}
                </Heading>
            </Flex>
            <Text fontSize="xs">
                You will have to contact members before the post expires or you
                risk losing their contact information along with this post.
            </Text>
            <hr />
            <Flex direction="column" marginTop={4} marginBottom={4}>
                <Heading
                    size="md"
                    marginBottom={2}
                >{`Requested Members (${numberOfRequestedMembers})`}</Heading>
                <VStack>
                    {project?.requestedMembers?.map((member, index) => {
                        return (
                            <MemberCard
                                key={index}
                                info={member}
                                isRequestable={true}
                                onApprove={(id) =>
                                    approveHandler(id, project._id)
                                }
                                onReject={(id) =>
                                    rejectHandler(id, project._id)
                                }
                            />
                        )
                    })}
                </VStack>
            </Flex>
            <Flex direction="column" marginTop={4} marginBottom={4}>
                <Heading
                    size="md"
                    marginBottom={2}
                >{`Current Members (${numberOfCurrentMembers})`}</Heading>
                <VStack>
                    {project?.currentMembers?.map((member, index) => {
                        return <MemberCard key={index} info={member} />
                    })}
                </VStack>
            </Flex>
            <Accordion allowToggle width="100%">
                <AccordionItem border="none">
                    <h2>
                        <AccordionButton
                            padding={(2, 0)}
                            _hover={{ backgroundColor: '' }}
                        >
                            <Box flex="1" textAlign="left">
                                <Heading
                                    size="md"
                                    marginBottom={2}
                                    marginLeft={0}
                                >
                                    Description
                                </Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel padding={(16, 0, 4, 0)} fontSize="sm">
                        {project.details}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <hr />
            <Text fontSize="sm">{createdMessage}</Text>
            <Button
                width="fit-content"
                colorScheme="red"
                onClick={async () => {
                    if ((await deleteProjectIdea(project._id)) == true) {
                        await router.replace('/projects')
                        router.reload()
                    } else {
                        console.log(
                            'Something went wrong while trying to delete project idea.'
                        )
                    }
                }}
                marginTop={4}
            >
                Delete
            </Button>
        </Flex>
    )
}

export default ManageProject
