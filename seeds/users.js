const users = [
    {
        username: 'John Doe',
        authenticatedDiscordId: '3234534535235',
        discordUsername: 'johndoe#1234',
        email: 'john@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/tDY5erXCyWVeEiAjafFRdSTAt8NWwiyKSObeAMNlAxg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODExOTc1LmpwZw.jpg',
    },
    {
        username: 'Sam Langley',
        authenticatedDiscordId: '53247768535235',
        discordUsername: 'sam#1234',
        email: 'sam@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/s0glbio5-ENbLa5QCxO1HMj-wuXItB7K9RJ4E_meU-E/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDIwNTkxLmpwZw.jpg',
    },
    {
        username: 'Tim Johnson',
        authenticatedDiscordId: '73236787653235',
        discordUsername: 'tim#1234',
        email: 'tim@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/Ho5gpXBZFGI3oYTurBtkNFNr2NNEYhZrSo7KRL5cV3w/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTc2NzkyLmpwZw.jpg',
    },
    {
        username: 'James Lee',
        authenticatedDiscordId: '93234789535235',
        discordUsername: 'james#1234',
        email: 'james@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/zs6QwW5eCdOJspDLIiheT4bBR2Lctr_IL7UXoCtosvA/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTMxMDgwLmpwZw.jpg',
    },
    {
        username: 'Ross Smith',
        authenticatedDiscordId: '83234533474235',
        discordUsername: 'ross#1234',
        email: 'ross@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/VMrqyZ3fml7mMQhznHYrDlOao5erT7tTuBHked8AwKc/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDExNzU1LmpwZw.jpg',
    },
    {
        username: 'Emily West',
        authenticatedDiscordId: '93674534535235',
        discordUsername: 'emily#1234',
        email: 'emily@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/-kqT4Hz9xwwklsIlEENVHW2oNb8p9SqEc9zwk4-vVvM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDc0MDA2LmpwZw.jpg',
    },
    {
        username: 'Ava Wilson',
        authenticatedDiscordId: '156234534535235',
        discordUsername: 'ava#1234',
        email: 'ava@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/T2Z49nkM7R3C2a0FGJGIRZY0AT56FChOlUrhMtfoAzE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTcxMjc3LmpwZw.jpg',
    },
    {
        username: 'Jim Carter',
        authenticatedDiscordId: '603234534535235',
        discordUsername: 'jim#1234',
        email: 'jim@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/__vVq_MEev2fv31mCpYJNjevByzmyD1UJVUCT8E25XM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjMyODY3LmpwZw.jpg',
    },
    {
        username: 'Glenn Miller',
        authenticatedDiscordId: '453532578278235',
        discordUsername: 'glenn#1234',
        email: 'glenn@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/QWm7v1zcq4V1XQU1G1lVpA1kBrfIBZlrNUH9j1H56v8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTg2MDc5LmpwZw.jpg',
    },
    {
        username: 'Rick Moore',
        authenticatedDiscordId: '4567897526796445',
        discordUsername: 'rick#1234',
        email: 'rick@gmail.com',
        preferredMethodOfContact: 'email',
        discordAvatarUrl:
            'https://images.generated.photos/t_1ltQh4pBa7sq5iiB76Vz5X-U6HsymIP9tZMX8d5Go/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzQwOTM1LmpwZw.jpg',
    },
]

export default users
