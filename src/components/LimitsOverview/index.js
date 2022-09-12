import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function LimitsOverview({ projectsCreated, projectsRequested }) {
    const CREATELIMIT = 1
    const REQUESTLIMIT = 5

    return (
        <Flex
            width="90%"
            padding="2rem 0rem"
            flexDirection="column"
            textAlign="left"
            gap={4}
        >
            <Flex align="center" gap={2}>
                <Heading size="lg">Project Limits</Heading>
                <Tooltip
                    label="Note created projects are automatically expired in a week (7 days), and requested projects expire when the project itself expires, or if the project admin responds to your request."
                    fontSize="xs"
                    placement="right"
                    hasArrow
                >
                    <span>
                        <AiOutlineInfoCircle />
                    </span>
                </Tooltip>
            </Flex>
            <Flex justify="space-evenly">
                <Flex gap={2} align="center">
                    <Heading
                        color={
                            projectsCreated < CREATELIMIT
                                ? 'gray.700'
                                : 'red.700'
                        }
                    >{`${projectsCreated}/${CREATELIMIT}`}</Heading>
                    <Text
                        fontSize="sm"
                        fontWeight={600}
                        color={
                            projectsCreated < CREATELIMIT
                                ? 'gray.700'
                                : 'red.700'
                        }
                    >
                        Created
                    </Text>
                </Flex>

                <Flex gap={2} align="center">
                    <Heading
                        color={
                            projectsRequested < REQUESTLIMIT
                                ? 'gray.700'
                                : 'red.700'
                        }
                    >{`${projectsRequested}/${REQUESTLIMIT}`}</Heading>
                    <Text
                        color={
                            projectsRequested < REQUESTLIMIT
                                ? 'gray.700'
                                : 'red.700'
                        }
                        fontSize="sm"
                        fontWeight={600}
                    >
                        Requested
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LimitsOverview
