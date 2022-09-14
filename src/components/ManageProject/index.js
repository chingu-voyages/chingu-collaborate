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
    Container,
} from '@chakra-ui/react'
import { BiTimeFive, BiHourglass, BiUser } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import RequestedMemberCard from '../RequestedMemberCard'
import { deleteProjectIdea } from '../../../controllers/project'

function ManageProject({ project }) {
    const currentDate = DateTime.now()
    const creationDate = DateTime.fromISO(project?.createdAt)
    const creationDifference = creationDate?.diff(currentDate, ['days'])
    const creationPastDays = Math.abs(
        Math.round(creationDifference?.toObject().days)
    )
    const expirationDate = DateTime.fromISO(project?.expiresIn)
    const expirationDifference = expirationDate?.diff(currentDate, ['days'])
    const expirationRemainingDays = Math.round(
        expirationDifference?.toObject().days
    )

    const numberOfRequestedMembers = project?.requestedMembers?.length

    const router = useRouter()

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
        >
            <Flex align="center" justify="space-between">
                <Heading size="lg">{project?.title}</Heading>
            </Flex>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
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
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${expirationRemainingDays} days`}</Heading>
            </Flex>
            <Text fontSize="xs">
                You’ll have 48 hours after the post expires to contact the
                requested members, after which you will lose their contact
                information along with this post.
            </Text>
            <hr />
            <Flex direction="column" marginTop={4} marginBottom={4}>
                <Heading
                    size="md"
                    marginBottom={2}
                >{`Requested Members (${numberOfRequestedMembers})`}</Heading>
                <VStack>
                    {project?.requestedMembers?.map((member, index) => {
                        return <RequestedMemberCard key={index} info={member} />
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
            <Text fontSize="sm">{`posted ${creationPastDays} ${
                creationPastDays !== 1 ? 'days' : 'day'
            } ago.`}</Text>
            <Button
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
            >
                Delete
            </Button>
        </Flex>
    )
}

export default ManageProject
