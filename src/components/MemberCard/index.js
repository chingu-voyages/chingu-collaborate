import { useState } from 'react'
import {
    Avatar,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { BiCheck, BiX } from 'react-icons/bi'

function RequestedMemberCard({ info, isRequestable, onApprove, onReject }) {
    const [disableActions, setDisableActions] = useState(false)

    const approveMember = (info) => {
        setDisableActions(true)
        onApprove(info?._id)
    }

    const rejectMember = (info) => {
        setDisableActions(true)
        onReject(info?._id)
    }

    const locationIsValid =
        info.location !== undefined &&
        info.location.trim().length > 0 &&
        info.location !== ''

    const githubLinkIsValid =
        info.githubLink !== undefined && info.githubLink !== ''

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="100%"
            padding="1rem 1.25rem"
            flexDirection="column"
            textAlign="left"
            gap={1}
        >
            <Flex gap={5} align="center">
                <Flex direction="column" alignItems="center" minWidth="75px">
                    <Avatar
                        size="md"
                        name={info.username}
                        src={info?.discordAvatarUrl}
                    />
                    <Text
                        fontSize="xs"
                        fontWeight={700}
                        textOverflow="ellipsis"
                    >
                        {info.username}
                    </Text>
                    {isRequestable && (
                        <ButtonGroup isAttached>
                            <Button
                                colorScheme="green"
                                isDisabled={disableActions ? true : false}
                                size="xs"
                                width="fit-content"
                                onClick={() => approveMember(info)}
                            >
                                <BiCheck />
                            </Button>
                            <Button
                                colorScheme="red"
                                isDisabled={disableActions ? true : false}
                                size="xs"
                                width="fit-content"
                                onClick={() => rejectMember(info)}
                            >
                                <BiX />
                            </Button>
                        </ButtonGroup>
                    )}
                </Flex>
                <Flex
                    direction="column"
                    width="fit-content"
                    wordBreak="break-word"
                >
                    <Flex align="flex-start" direction="column">
                        <Text
                            fontSize="xs"
                            fontWeight={600}
                            wordBreak="keep-all"
                        >
                            Discord
                        </Text>
                        <Text fontSize="xs">{info.discordUsername}</Text>
                    </Flex>

                    <Flex align="flex-start" direction="column">
                        <Text
                            fontSize="xs"
                            fontWeight={600}
                            wordBreak="keep-all"
                        >
                            Email
                        </Text>
                        <Text fontSize="xs">{info.email}</Text>
                    </Flex>

                    {githubLinkIsValid && (
                        <Flex align="flex-start" direction="column">
                            <Text
                                fontSize="xs"
                                fontWeight={600}
                                wordBreak="keep-all"
                            >
                                Github
                            </Text>
                            <Text fontSize="xs">{info.githubLink}</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RequestedMemberCard
