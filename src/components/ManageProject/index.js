import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { BiHourglass } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import RequestedMemberCard from '../RequestedMemberCard'

function ManageProject({ project }) {
    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(project?.expiresIn)
    const difference = expirationDate.diff(currentDate, ['days'])
    const remainingDays = `${Math.round(difference.toObject().days)} days`

    const numberOfRequestedMembers = project?.requestedMembers?.length

    const router = useRouter()

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
            return router.replace('/projects')
        } catch (error) {
            console.log(error)
            console.log('Error while deleting project idea,')
        }
    }

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
                <Heading size="lg">{project?.title}</Heading>
            </Flex>

            <Flex align="center" gap={1}>
                <BiHourglass />
                <Heading
                    size="sm"
                    fontWeight={500}
                    color="red.500"
                >{`Expires in ${remainingDays}`}</Heading>
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
            <Button
                colorScheme="red"
                onClick={() => deleteProjectIdea(project._id)}
            >
                Delete
            </Button>
        </Flex>
    )
}

export default ManageProject
