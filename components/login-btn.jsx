import { useSession, signIn, signOut } from 'next-auth/react'
export default function Component() {
    const { data: session } = useSession()
    if (session) {
        console.log(session)
        return (
            <>
                Signed in as: {session.user.name} <br />
                Email: {session.user.email} <br />
                <img src={session.user.image} /> <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
