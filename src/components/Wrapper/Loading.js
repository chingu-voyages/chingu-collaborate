import Header from '../Header'
import { Flex, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import logo from './ChinguCollaborateLogo.png'

export default function Loading() {
    return (
        <>
            <Header />
            <Flex
                justify="center"
                align="center"
                width="100vw"
                height="100vh"
                direction="column"
                gap={2}
            >
                <Image
                    priority
                    src={logo}
                    alt="Chingu Collaborate Logo"
                    width={226}
                    height={78}
                />
                <Spinner
                    thickness="6px"
                    speed="0.75s"
                    emptyColor="gray.200"
                    color="green.500"
                    size="xl"
                />
            </Flex>
        </>
    )
}
