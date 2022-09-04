import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: { params: { scope: 'identify guilds email' } },
            profile(profile) {
                if (profile.avatar === null) {
                    const defaultAvatarNumber =
                        parseInt(profile.discriminator) % 5
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                } else {
                    const format = profile.avatar.startsWith('a_')
                        ? 'gif'
                        : 'png'
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
                }
                return {
                    id: profile.id,
                    name: profile.username,
                    email: profile.email,
                    image: profile.image_url,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.userId = account.providerAccountId
            }
            return token
        },
        async session({ session, token, user, profile }) {
            // Send properties to the client, like an access_token from a provider.
            // session.accessToken = token.accessToken
            // console.log(token, 'tokey token')
            session.userId = token.sub
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            // console.log(user, account, profile, email, credentials)
            // implement database lookups below
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
    },
})
