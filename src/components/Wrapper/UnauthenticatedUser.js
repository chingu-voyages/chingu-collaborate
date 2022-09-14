import Header from '../Header'
import Navbar from '../Navbar'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import DiscordButton from '../DiscordButton'

export default function UnauthenticatedUser() {
    return (
        <>
            <Header />
            <main className="container">
                <Navbar />
                <section className="content">
                    <Flex
                        marginTop={10}
                        borderWidth="3px"
                        borderRadius="lg"
                        width="90%"
                        maxWidth="500px"
                        padding="2rem"
                        flexDirection="column"
                        gap={10}
                    >
                        <Box>
                            <Heading size="xl">Sign In</Heading>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <DiscordButton onClick={() => signIn('discord')} />
                        </Box>
                        <Box>
                            <Text fontSize="xs" color="gray.500">
                                Are you a new user? Start by clicking the button
                                above, and we will help you with creating your
                                profile.
                            </Text>
                        </Box>
                    </Flex>
                </section>
            </main>
        </>
    )
}
