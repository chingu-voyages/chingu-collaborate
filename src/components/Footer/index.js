import { Flex, Box } from '@chakra-ui/react'
import {
    ButtonGroup,
    Container,
    IconButton,
    Stack,
    Text,
    Image,
} from '@chakra-ui/react'
import { FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Logo from './Chingu-Logo.png'
export default function Footer() {
    return (
        <Container
            as="footer"
            role="contentinfo"
            py={{ base: '6', md: '6' }}
            px={{ base: '10' }}
            maxWidth="2000px"
        >
            <Stack spacing={{ base: '4', md: '5' }}>
                <Stack justify="space-between" direction="row" align="center">
                    <Box>
                        <Image
                            src={'https://www.chingu.io/logo-with-text-192.png'}
                            alt="Chingu Collaborate Logo"
                            width="142px"
                            height="48px"
                        />
                    </Box>
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            target="#"
                            href="https://www.linkedin.com/company/chingu-os/"
                            aria-label="LinkedIn"
                            icon={<FaLinkedin fontSize="1.25rem" />}
                        />
                        <IconButton
                            as="a"
                            target="#"
                            href="https://github.com/chingu-voyages"
                            aria-label="GitHub"
                            icon={<FaGithub fontSize="1.25rem" />}
                        />
                        <IconButton
                            as="a"
                            target="#"
                            href="https://twitter.com/ChinguCollabs"
                            aria-label="Twitter"
                            icon={<FaTwitter fontSize="1.25rem" />}
                        />

                        <IconButton
                            as="a"
                            target="#"
                            href="https://www.chingu.io/"
                            aria-label="Chingu Website"
                            icon={<FaGlobe fontSize="1.25rem" />}
                        />
                    </ButtonGroup>
                </Stack>
                <Text fontSize="sm" color="subtle">
                    Made with ❤ from a Chingu cohort.
                </Text>
            </Stack>
        </Container>
    )
}
