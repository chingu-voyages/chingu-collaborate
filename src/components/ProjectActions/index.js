import {
    Flex,
    InputGroup,
    Input,
    InputLeftElement,
    Button,
    Text,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

function ProjectActions() {
    const reachedMaximumPosts = true
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
            <Button
                width="100%"
                colorScheme={reachedMaximumPosts ? 'gray' : 'green'}
                cursor={reachedMaximumPosts ? 'not-allowed' : 'pointer'}
            >
                <Text fontSize="xl">Add Project Idea</Text>
            </Button>
        </Flex>
    )
}

export default ProjectActions
