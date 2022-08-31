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
                        {routes.map((route, index) => {
                            return (
                                <NextLink
                                    key={index}
                                    href={route.route}
                                    passHref
                                >
                                    <Link
                                        onClick={
                                            route.name == 'Sign Out' && signOut
                                        }
                                    >
                                        <Heading>{route.name}</Heading>
                                    </Link>
                                </NextLink>
                            )
                        })}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default HamburgerMenu
