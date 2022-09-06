import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../Navbar'
import logo from './chinguLogo.png'
import Image from 'next/image'
import CommunityStandards from '../CommunityStandards'
import CreateProfile from '../CreateProfile'
import BannedCard from '../BannedCard'
import { Flex, Box, Heading, Text, Spinner } from '@chakra-ui/react'
import DiscordButton from '../DiscordButton'
import { signIn } from 'next-auth/react'

function AuthWrapper({ children, session, status }) {
    const [agreeToRules, setAgreeToRules] = useState(false)

    // Loading State
    if (status === 'loading') {
        return (
            <div>
                <Head>
                    <title>Chingu Collaborate</title>
                    <meta name="description" content="Chingu Collaborate" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container">
                    <Navbar />
                    <section className="content">
                        <Flex
                            justify="start"
                            align="center"
                            width="100vw"
                            height="100vh"
                            direction="column"
                            gap={10}
                        >
                            <Image
                                priority
                                src={logo}
                                alt="Chingu Collaborate Logo"
                                width={220}
                                height={80}
                            />
                            <Spinner
                                thickness="6px"
                                speed="0.75s"
                                emptyColor="gray.200"
                                color="green.500"
                                size="xl"
                            />
                        </Flex>
                    </section>
                </main>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <div>
                <Head>
                    <title>Chingu Collaborate</title>
                    <meta name="description" content="Chingu Collaborate" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container">
                    <Navbar />
                    <section className="content">
                        <Flex
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
                                <DiscordButton
                                    onClick={() => signIn('discord')}
                                />
                            </Box>
                            <Box>
                                <Text fontSize="xs" color="gray.500">
                                    Are you a new user? Start by clicking the
                                    button above, and we will help you with
                                    creating your profile.
                                </Text>
                            </Box>
                        </Flex>
                    </section>
                </main>
            </div>
        )
    }

    // If user is authenticated and exists in database
    if (status === 'authenticated' && session.dbUser) {
        const isBanned = session.dbUser.isBanned
        return (
            <div>
                <Head>
                    <title>Chingu Collaborate</title>
                    <meta name="description" content="Chingu Collaborate" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container">
                    <Navbar />
                    <section className="content">
                        {isBanned ? <BannedCard /> : children}
                    </section>
                </main>
            </div>
        )
    }

    // If user is authenticated and doesn't exist in database then force creating a profile
    if (status !== 'loading' && status === 'authenticated' && !session.dbUser) {
        const proceedHandler = () => {
            setAgreeToRules(true)
        }
        return (
            <div>
                <Head>
                    <title>Chingu Collaborate</title>
                    <meta name="description" content="Chingu Collaborate" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container">
                    <Navbar />
                    <section className="content">
                        {!agreeToRules && (
                            <CommunityStandards onProceed={proceedHandler} />
                        )}
                        {agreeToRules && <CreateProfile />}
                    </section>
                </main>
            </div>
        )
    }
}

export default AuthWrapper
