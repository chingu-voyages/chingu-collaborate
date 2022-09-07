import { useState } from 'react'
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function AddProjectModal({ reachedMaximumPosts }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const options = [
        { value: 'javascript', label: 'JavaScript', colorScheme: 'yellow' },
        { value: 'typescript', label: 'TypeScript', colorScheme: 'blue' },
        { value: 'reactjs', label: 'React', colorScheme: 'cyan' },
        { value: 'nodejs', label: 'Node.js', colorScheme: 'green' },
        { value: 'expressjs', label: 'Express.js', colorScheme: 'blackAlpha' },
        { value: 'mongodb', label: 'MongoDB', colorScheme: 'green' },
        { value: 'nextjs', label: 'Next.js', colorScheme: 'gray' },
    ]

    const inputMarginBottom = '1rem'
    const labelMarginBottom = '0'

    // Input Values
    const [title, setTitle] = useState('')
    const [technologies, setTechnologies] = useState('')
    const [details, setDetails] = useState('')

    // Input didFocusOn
    const [didFocusOnTitle, setDidFocusOnTitle] = useState(false)
    const [didFocusOnTechnologies, setDidFocusOnTechnologies] = useState(false)
    const [didFocusOnDetails, setDidFocusOnDetails] = useState(false)

    // Input Validation
    // a) Required Inputs
    const titleIsValid = title.trim().length > 4 && title.length < 21

    const technologiesIsValid = technologies.length > 0

    const detailsIsValid = details.length > 0

    //Form Validation
    const formIsValid = titleIsValid && technologiesIsValid && detailsIsValid

    const formSubmit = async () => {
        setIsLoading(true)
        const user_id = session.dbUser._id

        let formData = {
            title,
            technologies,
            details,
            admin: user_id,
        }

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await response.json()

            const userUpdateBody = {
                projectsCreated: data._id,
            }
            await fetch(`/api/user/${user_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userUpdateBody),
            })
            return router.reload()
        } catch (error) {
            setIsLoading(false)
            console.log(
                'Something went wrong while trying to add project idea.'
            )
        }
    }

    return (
        <>
            <Button
                onClick={onOpen}
                width="100%"
                colorScheme={reachedMaximumPosts ? 'gray' : 'green'}
                cursor={reachedMaximumPosts ? 'not-allowed' : 'pointer'}
            >
                <Text fontSize="xl">Add Project Idea</Text>
            </Button>

            <Modal
                isOpen={!reachedMaximumPosts ? isOpen : false}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Project Idea</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel marginBottom={labelMarginBottom}>
                                Title
                            </FormLabel>
                            <Input
                                isInvalid={didFocusOnTitle && !titleIsValid}
                                isRequired
                                onFocus={() => {
                                    setDidFocusOnTitle(true)
                                }}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                type="text"
                                marginBottom={inputMarginBottom}
                            />

                            <FormLabel marginBottom={labelMarginBottom}>
                                Technologies
                            </FormLabel>
                            <Select
                                isInvalid={
                                    didFocusOnTechnologies &&
                                    !technologiesIsValid
                                }
                                isRequired
                                onFocus={() => {
                                    setDidFocusOnTechnologies(true)
                                }}
                                onChange={(e) => {
                                    let allTechnologies = e.map(
                                        (technology) => {
                                            return technology.value
                                        }
                                    )
                                    setTechnologies(allTechnologies)
                                }}
                                isMulti
                                options={options}
                                tagVariant="solid"
                            />

                            <FormLabel
                                marginBottom={labelMarginBottom}
                                marginTop={inputMarginBottom} // Select component doesn't support marginBottom so added to marginTop of next component
                            >
                                Description
                            </FormLabel>
                            <Textarea
                                isInvalid={didFocusOnDetails && !detailsIsValid}
                                isRequired
                                onFocus={() => {
                                    setDidFocusOnDetails(true)
                                }}
                                onChange={(e) => {
                                    setDetails(e.target.value)
                                }}
                                marginBottom={inputMarginBottom}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            isLoading={isLoading}
                            variant="ghost"
                            colorScheme="green"
                            onClick={formIsValid ? formSubmit : () => {}}
                            disabled={!formIsValid || isLoading}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProjectModal
