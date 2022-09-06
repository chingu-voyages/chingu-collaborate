import {
    Flex,
    InputGroup,
    Input,
    InputLeftElement,
    Button,
    Text,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import AddProjectModal from '../AddProjectModal'

function ProjectActions({ reachedMaximumPosts }) {
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
                    type="search"
                    borderWidth="2px"
                    borderRadius="md"
                    size="lg"
                    placeholder="Search for project"
                />
            </InputGroup>
            <AddProjectModal reachedMaximumPosts={reachedMaximumPosts} />
        </Flex>
    )
}

export default ProjectActions
