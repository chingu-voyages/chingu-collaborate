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
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
function CreateProfile() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [discordId, setDiscordId] = useState('')
    const [methodOfContact, setMethodOfContact] = useState('email')
    const [githubLink, setGithubLink] = useState('')
    function formSubmit() {
        let formData = {
            username,
            location,
            email,
            discordId,
            preferredMethodOfContact: methodOfContact,
            githubLink,
            discordUsername: session.user.name,
            userId: session.userId,
        }

        fetch(`/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, ' api response')
                if (!data.errors) {
                    router.push('/projects')
                }
            })

        // console.log('formSubmit function')
        // console.log('formData', formData)
    }
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
                <Input
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    type="text"
                    marginBottom={inputMarginBottom}
                />

                <FormLabel marginBottom={labelMarginBottom}>Location</FormLabel>
                <Input
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }}
                    type="text"
                    marginBottom={inputMarginBottom}
                />

                <FormLabel marginBottom={labelMarginBottom}>Email</FormLabel>
                <Input
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type="email"
                />

                <FormLabel marginBottom={labelMarginBottom}>
                    Discord ID
                </FormLabel>
                <Input
                    onChange={(e) => {
                        setDiscordId(e.target.value)
                    }}
                    type="text"
                    marginBottom={inputMarginBottom}
                />

                <FormLabel marginBottom={labelMarginBottom}>
                    Preferred Method of Contact
                </FormLabel>
                <RadioGroup
                    defaultValue="email"
                    marginBottom={inputMarginBottom}
                >
                    <HStack spacing="24px">
                        <Radio
                            onChange={(e) => {
                                setMethodOfContact(e.target.value)
                            }}
                            value="email"
                        >
                            Email
                        </Radio>
                        <Radio
                            onChange={(e) => {
                                setMethodOfContact(e.target.value)
                            }}
                            value="discord"
                        >
                            Discord
                        </Radio>
                    </HStack>
                </RadioGroup>

                <FormLabel marginBottom={labelMarginBottom}>
                    Github Profile Link
                </FormLabel>
                <Input
                    onChange={(e) => {
                        setGithubLink(e.target.value)
                    }}
                    type="text"
                    marginBottom={inputMarginBottom}
                />
                <Button
                    onClick={() => {
                        formSubmit()
                    }}
                    colorScheme="green"
                    size="lg"
                    width="100%"
                >
                    Proceed
                </Button>
            </FormControl>
        </Flex>
    )
}

export default CreateProfile
