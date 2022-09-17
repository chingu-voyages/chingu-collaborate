import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Wrapper from '../components/Wrapper'
import { Heading, Flex, Progress, Stack } from '@chakra-ui/react'

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.dbUser) {
            router.push('/projects')
        }
    }, [session, router])

    return (
        <Wrapper session={session} status={status}>
            <Flex
                width="100%"
                direction="column"
                alignItems="center"
                height="80vh"
                minHeight="500px"
            >
                <Heading size="md" marginTop={5} marginBottom={2}>
                    Redirecting
                </Heading>
                <Stack width="90%">
                    <Progress size="xs" isIndeterminate colorScheme="green" />
                </Stack>
            </Flex>
        </Wrapper>
    )
}
