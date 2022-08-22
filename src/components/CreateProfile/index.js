import {
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    HStack,
    Button,
} from '@chakra-ui/react'

function CreateProfile() {
    const inputMarginBottom = '1rem'
    const labelMarginBottom = '0'
    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Heading size="xl">Create Profile</Heading>
            <FormControl>
                <FormLabel marginBottom={labelMarginBottom}>Username</FormLabel>
                <Input type="text" marginBottom={inputMarginBottom} />

                <FormLabel marginBottom={labelMarginBottom}>Location</FormLabel>
                <Input type="text" marginBottom={inputMarginBottom} />

                <FormLabel marginBottom={labelMarginBottom}>Email</FormLabel>
                <Input type="email" />

                <FormLabel marginBottom={labelMarginBottom}>
                    Discord ID
                </FormLabel>
                <Input type="text" marginBottom={inputMarginBottom} />

                <FormLabel marginBottom={labelMarginBottom}>
                    Preferred Method of Contact
                </FormLabel>
                <RadioGroup
                    defaultValue="email"
                    marginBottom={inputMarginBottom}
                >
                    <HStack spacing="24px">
                        <Radio value="email">Email</Radio>
                        <Radio value="discord">Discord</Radio>
                    </HStack>
                </RadioGroup>

                <FormLabel marginBottom={labelMarginBottom}>
                    Github Profile Link
                </FormLabel>
                <Input type="text" marginBottom={inputMarginBottom} />
                <Button colorScheme="green" size="lg" width="100%">
                    Proceed
                </Button>
            </FormControl>
        </Flex>
    )
}

export default CreateProfile
