import { useState } from 'react'
import {
    Heading,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    Button,
    useDisclosure,
    Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { signOut } from 'next-auth/react'

function HamburgerMenu({ routes }) {
    const [size, setSize] = useState('xs')
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                                    <NextLink
                                        key={index}
                                        href={route.route}
                                        passHref
                                    >
                                        <Link>
                                            <Heading size="lg">
                                                {route.name}
                                            </Heading>
                                        </Link>
                                    </NextLink>
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
