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

function AddProjectModal({ reachedMaximumPosts }) {
    const [selectedOptions, setSelectedOptions] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                                type="text"
                                marginBottom={inputMarginBottom}
                            />

                            <FormLabel marginBottom={labelMarginBottom}>
                                Technologies
                            </FormLabel>
                            <Select
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
                            <Textarea marginBottom={inputMarginBottom} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" colorScheme="green">
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProjectModal
