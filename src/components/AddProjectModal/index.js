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
    const { data: session } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [projectTitleExists, setProjectTitleExists] = useState(false)

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

    // Input Values
    const [title, setTitle] = useState('')
    const [technologies, setTechnologies] = useState('')
    const [timezone, setTimezone] = useState({})
    const [details, setDetails] = useState('')

    // Input didFocusOn
    const [didFocusOnTitle, setDidFocusOnTitle] = useState(false)
    const [didFocusOnTechnologies, setDidFocusOnTechnologies] = useState(false)
    const [didFocusOnTimezone, setDidFocusOnTimezone] = useState(false)
    const [didFocusOnDetails, setDidFocusOnDetails] = useState(false)

    // Input Validation
    // a) Required Inputs
    const titleIsValid =
        title.trim().length >= 5 &&
        title.length <= 50 &&
        title.trim().length !== 0

    const technologiesIsValid = technologies.length > 0

    const timezoneIsValid = Object.keys(timezone).length > 0

    const detailsIsValid =
        details.length >= 250 &&
        details.length <= 800 &&
        details.trim().length !== 0

    //Form Validation
    const formIsValid =
        titleIsValid && technologiesIsValid && timezoneIsValid && detailsIsValid

    const resetStates = () => {
        setTitle('')
        setTechnologies('')
        setTimezone({})
        setDetails('')
        setDidFocusOnTitle(false)
        setDidFocusOnTechnologies(false)
        setDidFocusOnTimezone(false)
        setDidFocusOnDetails(false)
        setProjectTitleExists(false)
        setIsLoading(false)
    }

    const closeHandler = () => {
        resetStates()
        onClose()
    }

    const formSubmit = async () => {
        setProjectTitleExists(false)
        setIsLoading(true)
        const user_id = session.dbUser._id

        let formData = {
            timezone: timezone.label,
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
            if (response.status == '200') {
                return router.reload()
            }

            if (response.status == '400') {
                if (data.error === 'Project Title is already taken') {
                    setProjectTitleExists(true)
                }
            }
            setIsLoading(false)
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
                <Text fontSize="md">Add Project Idea</Text>
            </Button>

            <Modal
                isOpen={!reachedMaximumPostedProjects ? isOpen : false}
                onClose={closeHandler}
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
                                isInvalid={
                                    (didFocusOnTitle && !titleIsValid) ||
                                    projectTitleExists
                                }
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
                            {projectTitleExists && (
                                <Text
                                    marginTop="-0.75rem"
                                    color="red.500"
                                    fontSize="xs"
                                    marginBottom="0.5rem"
                                >
                                    Project already exists.
                                </Text>
                            )}
                            {didFocusOnTitle && (
                                <Text
                                    marginTop="-0.75rem"
                                    fontSize="xs"
                                    color={!titleIsValid ? 'red.500' : ''}
                                    marginBottom="0.5rem"
                                >
                                    Between 5 and 50 characters.
                                </Text>
                            )}

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
                                Timezone
                            </FormLabel>
                            <TimezoneSelect
                                isInvalid={
                                    didFocusOnTimezone && !timezoneIsValid
                                }
                                value={timezone}
                                onChange={setTimezone}
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
                            />
                            <Text
                                marginTop={0}
                                marginBottom={inputMarginBottom}
                                fontSize="xs"
                                textAlign="right"
                                color={
                                    didFocusOnDetails && !detailsIsValid
                                        ? 'red.500'
                                        : ''
                                }
                            >{`${details.length}/800`}</Text>
                            {didFocusOnDetails && (
                                <Text
                                    marginTop="-2rem"
                                    fontSize="xs"
                                    color={!detailsIsValid ? 'red.500' : ''}
                                    marginBottom="0.5rem"
                                >
                                    Minimum 250 characters.
                                </Text>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={closeHandler}>
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
