import { useState } from 'react'
import { Flex, Heading, Text, Button, Checkbox } from '@chakra-ui/react'

function CommunityStandards({ onProceed }) {
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    const rules = [
        {
            id: 1,
            title: 'Creating a Friendly and Open Community',
            content: [
                {
                    paragraph: 1,
                    body: 'Any conduct that threatens a member, including (but not limited to) harassment, bullying, discrimination of any type, hate speech, and posting of inappropriate material, is not tolerated - period!',
                },
                {
                    paragraph: 2,
                    body: 'Members are expected to be tolerant of other cultures and opinions, and to conduct themselves in a professional manner. Disagreeing is acceptable, but being disrespectful is not. You should treat others how you want to be treated.',
                },
            ],
        },
        {
            id: 2,
            title: 'Cultivating a Supportive Community',
            content: [
                {
                    paragraph: 1,
                    body: 'Being a Chingu means you have a responsibility to support your Voyage team by being an active participant in team meetings, completing commitments, and conducting yourself in a professional manner.',
                },
                {
                    paragraph: 2,
                    body: 'Chingus respect their peers by not plagiarizing. This includes any original work created by someone else including articles, code, and ideas.',
                },
                {
                    paragraph: 3,
                    body: 'Chingus also have the responsibility to actively participate in our forums to help fellow Chingus on their learning path by answering questions, helping to motivate others, sharing what they’ve learned, and providing honest and respectful critiques.',
                },
            ],
        },
        {
            id: 3,
            title: 'This is a spam-free community',
            content: [
                {
                    paragraph: 1,
                    body: "The focus of this community is to help one another become better Software Developers. To maintain this focus we don't allow spammy posts, including self-promotion. This includes DM'ing others in the community or asking for personal information for the purposes of marketing.",
                },
            ],
        },
    ]

    // Ensures uniform spacing
    const ruleMarginBottom = '0.5rem'
    const paragraphMarginBottom = '1rem'

    const agreeToTermsHandler = (event) => {
        event.preventDefault()
        return setAgreeToTerms((prevState) => !prevState)
    }

    return (
        <Flex
            borderWidth="2px"
            borderRadius="lg"
            width="90%"
            padding="2rem"
            flexDirection="column"
            textAlign="left"
            gap={2}
            marginTop={10}
            marginBottom={10}
        >
            <Heading size="xl">Community Standards</Heading>
            <Text fontSize="sm" fontWeight={500}>
                We view this as an obligation to all of our members. Any members
                violating the Community Standards will be removed from the
                community. Violations and complaints should be reported to
                admin@chingu.io and will be kept confidential.
            </Text>
            {rules.map((rule) => (
                <div key={rule.id} style={{ marginBottom: ruleMarginBottom }}>
                    <Text fontSize="xl" fontWeight={700} color="green.500">
                        {rule.title}
                    </Text>
                    {rule.content.map((content) => (
                        <Text
                            key={content.paragraph}
                            fontSize="1xl"
                            marginBottom={paragraphMarginBottom}
                        >
                            {content.body}
                        </Text>
                    ))}
                </div>
            ))}
            <Checkbox onChange={agreeToTermsHandler} isChecked={agreeToTerms}>
                <Text fontSize="xs">
                    I have read over all the community standards and agree to
                    follow them and conduct myself in a professional manner.
                    Additionally, I understand that violating any of these
                    standards will result in a ban from the platform.
                </Text>
            </Checkbox>
            <Button
                onClick={() => {
                    onProceed()
                }}
                colorScheme="green"
                size="lg"
                width="100%"
                type="submit"
                isDisabled={!agreeToTerms}
            >
                Proceed
            </Button>
        </Flex>
    )
}

export default CommunityStandards
