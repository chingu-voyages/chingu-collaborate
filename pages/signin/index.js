import Head from 'next/head'
import { signIn } from 'next-auth/react'
import Navbar from '../../src/components/Navbar'
import { Flex, Heading, Box, Text } from '@chakra-ui/react'
import DiscordButton from '../../src/components/DiscordButton'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SignIn() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    let routePushed = false
    const router = useRouter()
    useEffect(() => {
        if (session && !routePushed) {
            router.push('/')
            routePushed = true
        }
    }, [session])

    if (loading) {
        return <div>LOADING...</div>
    }
    if (session) {
        return <div>You are signed in, redirecting...</div>
    } else {
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

                {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
            </div>
        )
    }
}
