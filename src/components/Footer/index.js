import { Flex, Box } from '@chakra-ui/react'

export default function Footer() {
    return (
        <Box
            as="footer"
            backgroundColor="green.500"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            minHeight="150px"
        >
            <Flex
                padding="1rem 2rem"
                width="100%"
                maxWidth="1400px"
                gap={10}
                justifyContent="center"
            ></Flex>
        </Box>
    )
}
