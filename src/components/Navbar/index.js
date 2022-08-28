import styles from './Nav.module.css'
import NextLink from 'next/link'
import Image from 'next/image'
import logo from './chinguLogo.png'
import HamburgerMenu from '../HamburgerMenu'
import { Box, Link } from '@chakra-ui/react'

function Navbar() {
    const isAuthenticated = false

    const authenticatedRoutes = [
        { name: 'Projects', route: '/projects' },
        { name: 'Profile', route: '/profile' },
        { name: 'Sign Out', route: '/' },
    ]

    const nonAuthenticatedRoutes = [
        { name: 'Home', route: '/' },
        { name: 'Sign In', route: '/signin' },
    ]

    const routes = isAuthenticated
        ? authenticatedRoutes
        : nonAuthenticatedRoutes

    return (
        <nav className={styles.nav}>
            <Box>
                <Image
                    src={logo}
                    alt="Chingu Collaborate Logo"
                    width={100}
                    height={40}
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
                fontSize="1.25rem"
            >
                {routes.map((route, index) => {
                    return (
                        <NextLink key={index} href={route.route} passHref>
                            <Link onClick={route.onClick}>{route.name}</Link>
                        </NextLink>
                    )
                })}
            </Box>
        </nav>
    )
}

export default Navbar
