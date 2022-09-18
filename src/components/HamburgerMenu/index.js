import { useState } from 'react'
import {
    Heading,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    useDisclosure,
    Link,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

function HamburgerMenu({ routes }) {
    const [size, setSize] = useState('xs')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

    const handleClick = (newSize) => {
        setSize(newSize)
        onOpen()
    }

    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const changeRoute = (route) => {
        if (route === router.route) {
            return router.reload()
        }
        return router.replace(route)
    }

    return (
        <div>
            <IconButton
                onClick={() => handleClick(size)}
                colorScheme="gray"
                variant="ghost"
                icon={<GiHamburgerMenu size={20} />}
            />

            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent
                    style={{ backgroundColor: 'white', color: 'black' }}
                >
                    <DrawerCloseButton />
                    <DrawerBody>
                        {routes
                            .filter((route) => route.name !== 'Sign Out')
                            .map((route, index) => {
                                return (
                                    <Link
                                        key={index}
                                        onClick={() => changeRoute(route.route)}
                                    >
                                        <Heading size="lg">
                                            {route.name}
                                        </Heading>
                                    </Link>
                                )
                            })}
                        {routes
                            .filter((route) => route.name === 'Sign Out')
                            .map((route, index) => {
                                return (
                                    <Link
                                        key={index}
                                        onClick={async () => {
                                            await signOut()
                                        }}
                                        style={{
                                            cursor: isHovering
                                                ? 'pointer'
                                                : 'default',
                                            textDecoration: isHovering
                                                ? 'underline'
                                                : 'none',
                                        }}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Heading size="lg">
                                            {route.name}
                                        </Heading>
                                    </Link>
                                )
                            })}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default HamburgerMenu
