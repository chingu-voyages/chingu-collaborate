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
import { get } from 'mongoose'

function AddProjectModal({ reachedMaximumPosts }) {
    const [selectedOptions, setSelectedOptions] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session, status } = useSession()

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

    // Input Validation
    // a) Required Inputs
    const titleIsValid = title.length > 4 && title.length < 21

    const technologiesIsValid = technologies.length > 0

    const detailsIsValid = details.length > 0

    //Form Validation
    const formIsValid = titleIsValid && technologiesIsValid && detailsIsValid

    const getUserId = async () => {
        try {
            const response = await fetch(
                `/api/user?authenticatedDiscordId=${session.userId}`,
                {
                    method: 'GET',
                }
            )
            const user = await response.json()
            return user[0]._id
        } catch (e) {
            console.log(e)
        }
    }

    const formSubmit = async () => {
        const user_id = await getUserId()
        let formData = {
            title,
            technologies,
            details,
            admin: user_id,
        }

        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
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
                            variant="ghost"
                            colorScheme="green"
                            onClick={
                                formIsValid
                                    ? () => {
                                          formSubmit()
                                      }
                                    : () => {}
                            }
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
