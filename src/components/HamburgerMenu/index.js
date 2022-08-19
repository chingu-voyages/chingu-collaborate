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
import { GiHamburgerMenu } from 'react-icons/gi'

function HamburgerMenu() {
    const [size, setSize] = useState('xs')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = (newSize) => {
        setSize(newSize)
        onOpen()
    }

    return (
        <div>
            <Button
                onClick={() => handleClick(size)}
                colorScheme="gray"
                key={size}
                m={4}
                as={IconButton}
                icon={<GiHamburgerMenu />}
                variant="ghost"
                style={{ color: 'black' }}
            />

            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent
                    style={{ backgroundColor: 'white', color: 'black' }}
                >
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Link>
                            <Heading>Projects</Heading>
                        </Link>
                        <Link>
                            <Heading>Profile</Heading>
                        </Link>
                        <Link>
                            <Heading>Sign In</Heading>
                        </Link>
                        <Link>
                            <Heading>Sign Out</Heading>
                        </Link>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default HamburgerMenu
