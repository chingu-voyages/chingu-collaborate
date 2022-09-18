import NextLink from 'next/link'
import Image from 'next/image'
import logo from './ChinguCollaborateLogo.png'
import HamburgerMenu from '../HamburgerMenu'
import { Flex, Box, Link, Divider } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
function Navbar() {
    const nonAuthenticatedRoutes = []

    const authenticatedRoutes = [
        { name: 'Projects', route: '/projects' },
        { name: 'Sign Out', route: '/' },
    ]

    const router = useRouter()
    const { data: session, status } = useSession()

    const [routes, setRoutes] = useState(nonAuthenticatedRoutes)

    useEffect(() => {
        if (session) {
            setRoutes(authenticatedRoutes)
        }
    }, [session])

    const redirectHandler = () => {
        if (router.pathname === '/projects') {
            return router.reload()
        }
        router.replace('/projects')
    }

    return (
        <>
            <Flex
                backgroundColor="white"
                padding="1rem 2rem"
                width="100%"
                maxWidth="1400px"
                justify="space-between"
                align="center"
            >
                <Box>
                    <Image
                        src={logo}
                        alt="Chingu Collaborate Logo"
                        width="142px"
                        height="48px"
                        style={{ cursor: 'pointer' }}
                        onClick={redirectHandler}
                    />
                </Box>
                {/* Smaller Screens */}
                <Box display={['flex', 'flex', 'none', 'none']}>
                    {routes.length > 0 && <HamburgerMenu routes={routes} />}{' '}
                </Box>
                {/* Larger Screens */}
                <Box
                    display={['none', 'none', 'flex', 'flex']}
                    gap={2}
                    fontSize="1rem"
                >
                    {routes.map((route, index) => {
                        return (
                            <NextLink key={index} href={route.route} passHref>
                                <Link
                                    onClick={
                                        route.name == 'Sign Out' && signOut
                                    }
                                >
                                    {route.name}
                                </Link>
                            </NextLink>
                        )
                    })}
                </Box>
            </Flex>
            <Divider width="100vw" minWidth="320px" />
        </>
    )
}

export default Navbar
