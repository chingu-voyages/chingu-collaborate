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
                key={size}
                m={4}
                as={IconButton}
                icon={<GiHamburgerMenu />}
                variant="outline"
                style={{ backgroundColor: '#E6FFFA', color: '#1D4044' }}
            />

            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent
                    style={{ backgroundColor: '#319795', color: '#E6FFFA' }}
                >
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Link>
                            <Heading>Test</Heading>
                        </Link>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default HamburgerMenu
