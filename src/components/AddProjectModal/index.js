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
import TimezoneSelect from 'react-timezone-select'

function AddProjectModal({ reachedMaximumPostedProjects }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const options = [
        { value: 'JavaScript', label: 'JavaScript', colorScheme: 'yellow' },
        { value: 'TypeScript', label: 'TypeScript', colorScheme: 'blue' },
        { value: 'React', label: 'React', colorScheme: 'cyan' },
        { value: 'Node.js', label: 'Node.js', colorScheme: 'green' },
        { value: 'Express.js', label: 'Express.js', colorScheme: 'blackAlpha' },
        { value: 'MongoDB', label: 'MongoDB', colorScheme: 'green' },
        { value: 'Next.js', label: 'Next.js', colorScheme: 'gray' },
    ]

    const inputMarginBottom = '1rem'
    const labelMarginBottom = '0'

    // Timezone
    const [selectedTimezone, setSelectedTimezone] = useState({})

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

    const timezoneIsValid = Object.keys(selectedTimezone).length > 0
    //Form Validation
    const formIsValid =
        titleIsValid && technologiesIsValid && detailsIsValid && timezoneIsValid

    const formSubmit = async () => {
        setIsLoading(true)
        const user_id = session.dbUser._id

        let formData = {
            timezone: selectedTimezone.label,
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
                colorScheme={reachedMaximumPostedProjects ? 'gray' : 'green'}
                cursor={
                    reachedMaximumPostedProjects ? 'not-allowed' : 'pointer'
                }
            >
                <Text fontSize="xl">Add Project Idea</Text>
            </Button>

            <Modal
                isOpen={!reachedMaximumPostedProjects ? isOpen : false}
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
                            <FormLabel marginBottom={labelMarginBottom}>
                                Timezone
                            </FormLabel>
                            <TimezoneSelect
                                isInvalid={!timezoneIsValid}
                                value={selectedTimezone}
                                onChange={setSelectedTimezone}
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
