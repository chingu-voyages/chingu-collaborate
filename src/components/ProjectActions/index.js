import {
    Flex,
    InputGroup,
    Input,
    InputLeftElement,
    Button,
    InputRightElement,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import AddProjectModal from '../AddProjectModal'
import { useRef } from 'react'

function ProjectActions({ reachedMaximumPostedProjects, onSearch }) {
    const searchInput = useRef('')

    return (
        <Flex width="90%" padding="2rem 0" direction="column" gap={4}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    top="4px"
                    left="4px"
                    color="gray.500"
                >
                    <BiSearch size={25} />
                </InputLeftElement>
                <Input
                    ref={searchInput}
                    onKeyDown={(event) => {
                        if (event.code === 'Enter') {
                            onSearch(searchInput.current.value)
                        }
                    }}
                    type="search"
                    borderWidth="2px"
                    borderRadius="md"
                    fontSize="md"
                    size="lg"
                    placeholder="Enter a project title"
                />
                <InputRightElement width="fit-content">
                    <Button
                        top="4px"
                        right="4px"
                        fontSize="xs"
                        colorScheme="blue"
                        onClick={() => {
                            onSearch(searchInput.current.value)
                        }}
                    >
                        Search
                    </Button>
                </InputRightElement>
            </InputGroup>
            <AddProjectModal
                reachedMaximumPostedProjects={reachedMaximumPostedProjects}
            />
        </Flex>
    )
}

export default ProjectActions
