import NextLink from 'next/link'
import Image from 'next/image'
import logo from './ChinguCollaborateLogo.png'
import HamburgerMenu from '../HamburgerMenu'
import { Flex, Box, Link, Divider } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
function Navbar() {
    const nonAuthenticatedRoutes = [
        // { name: 'Home', route: '/' },
        // { name: 'Sign In', route: '/signin' },
    ]

    const authenticatedRoutes = [
        { name: 'Projects', route: '/projects' },
        // { name: 'Profile', route: '/profile' },
        { name: 'Sign Out', route: '/' },
    ]

    const { data: session, status } = useSession()
    const loading = status === 'loading'
    const [routes, setRoutes] = useState(nonAuthenticatedRoutes)

    useEffect(() => {
        if (session) {
            setRoutes(authenticatedRoutes)
        }
    }, [session])

    // let routes = isAuthenticated ? authenticatedRoutes : nonAuthenticatedRoutes

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
                    />
                </Box>
                {/* Smaller Screens */}
                <Box display={['flex', 'flex', 'none', 'none']}>
                    <HamburgerMenu routes={routes} />
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
            <Divider width="100%" />
        </>
    )
}

export default Navbar
