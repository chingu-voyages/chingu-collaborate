import {
    Avatar,
    ButtonGroup,
    Button,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { patchProject } from '../../controllers/project'
import { useRouter } from 'next/router'
function RequestedMemberCard({ info, projectId }) {
    const router = useRouter()
    const approveForProject = async () => {
        console.log(info)
        const formDataProject = {
            user_id: info?._id,
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
    const rejectForProject = async () => {
        if (isJoinable) {
            setProjectRequestLoading(true)
            const formDataProject = {
                user_id: session?.dbUser?._id,
                requestType: 'requestForProject',
            }

            const response = await patchProject(project._id, formDataProject)
            if (response == true) {
                router.reload()
            } else {
                setProjectRequestLoading(false)
                console.log(
                    'Something went wrong while trying to request to join a project.'
                )
            }
        }
    }

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="100%"
            padding="1rem 1.25rem"
            flexDirection="column"
            textAlign="left"
            gap={1}
        >
            <Flex gap={5} align="center">
                <Avatar name={info.username} src={info?.discordAvatarUrl} />
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            approveForProject()
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        onClick={() => {
                            rejectForProject()
                        }}
                    >
                        Reject
                    </Button>
                </ButtonGroup>
                <Flex direction="column">
                    <Flex align="center" gap={1}>
                        <Heading size="xs">Username:</Heading>
                        <Text fontSize="sm">{info.username}</Text>
                    </Flex>
                    {info.location !== '' && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Location:</Heading>
                            <Text fontSize="xs">{info.location}</Text>{' '}
                        </Flex>
                    )}

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Discord:</Heading>
                        <Text fontSize="sm">{info.discordUsername}</Text>
                    </Flex>

                    <Flex align="center" gap={1}>
                        <Heading size="xs">Email:</Heading>
                        <Text fontSize="sm">{info.email}</Text>
                    </Flex>

                    {info.githubProfile !== undefined && (
                        <Flex align="center" gap={1}>
                            <Heading size="xs">Github:</Heading>
                            <Text fontSize="sm">{info.githubProfile}</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RequestedMemberCard
