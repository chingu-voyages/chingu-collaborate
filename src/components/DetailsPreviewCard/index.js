import { useSession } from 'next-auth/react'
import {
    Flex,
    Heading,
    Text,
    HStack,
    VStack,
    Tag,
    TagLabel,
    Button,
} from '@chakra-ui/react'
import { BiHourglass, BiUser, BiTimeFive } from 'react-icons/bi'
import RequestedMemberCard from '../RequestedMemberCard'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react'

function DetailsPreviewCard({ info }) {
    const { data: session } = useSession()
    const isAdmin = info?.admin?._id === session?.dbUser?._id

    const currentDate = DateTime.now()
    const expirationDate = DateTime.fromISO(info?.expiresIn)
    const difference = expirationDate?.diff(currentDate, ['days'])
    const remainingDays = `${Math.round(difference?.toObject().days)} days`

    if (isAdmin) {
        const numberOfRequestedMembers = info?.requestedMembers?.length
        return (
            <Flex
                borderWidth="2px"
                borderRadius="lg"
                width="100%"
                padding="1rem"
                flexDirection="column"
                textAlign="left"
                gap={2}
            >
                <Heading size="md">{info?.title}</Heading>

                <Text fontSize="xs">
                    You’ll have 48 hours after the post expires to contact the
                    requested members, after which you will lose their contact
                    information along with this post.
                </Text>
                <hr />
                <Flex direction="column" marginTop={1} marginBottom={4}>
                    <Heading
                        size="sm"
                        marginBottom={2}
                    >{`Requested Members (${numberOfRequestedMembers})`}</Heading>
                    <VStack>
                        {info?.requestedMembers?.map((member, index) => {
                            return (
                                <RequestedMemberCard
                                    key={index}
                                    info={member}
                                />
                            )
                        })}
                    </VStack>
                </Flex>
                <Button colorScheme="red" height="30px">
                    <Text fontSize="xs" padding={0}>
                        Delete
                    </Text>
                </Button>
            </Flex>
        )
    }

    const isJoinable = true
    const isReported = false
    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="100%"
            padding="1rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
        >
            <Heading size="md">{info?.title}</Heading>
            <Flex gap={10}>
                <Flex align="center" gap={1}>
                    <BiUser />
                    <Heading
                        size="xs"
                        fontWeight={500}
                    >{`${info?.admin?.username}`}</Heading>
                </Flex>
                <Flex align="center" gap={1}>
                    <BiTimeFive />
                    <Heading size="xs" fontWeight={500}>
                        {info?.admin?.location}
                    </Heading>
                </Flex>
            </Flex>

            <HStack spacing={2}>
                {info?.technologies?.map((tech, index) => (
                    <Tag
                        key={index}
                        variant="solid"
                        colorScheme="gray"
                        size="sm"
                    >
                        <TagLabel>{tech}</TagLabel>
                    </Tag>
                ))}
            </HStack>
            <Button
                width="fit-content"
                colorScheme={isJoinable ? 'green' : 'gray'}
                cursor={isJoinable ? 'pointer' : 'not-allowed'}
                marginBottom={4}
                height="30px"
            >
                {isJoinable ? (
                    <Text fontSize="xs">Request</Text>
                ) : (
                    <Text fontSize="xs">Requested</Text>
                )}
            </Button>
            <hr />
            <Flex direction="column" marginBottom={4}>
                <Heading size="sm" marginTop={4} marginBottom={2}>
                    Description
                </Heading>
                <Text fontSize="xs">{info?.details}</Text>
            </Flex>
            <hr />
            <Button
                width="fit-content"
                color="white"
                backgroundColor={isReported ? 'gray.400' : 'gray.900'}
                marginTop={4}
                height="30px"
            >
                {isReported ? (
                    <Text fontSize="xs">Reported</Text>
                ) : (
                    <Text fontSize="xs">Report</Text>
                )}
            </Button>
        </Flex>
    )
}

export default DetailsPreviewCard
