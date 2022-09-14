import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Wrapper from '../src/components/Wrapper'

export default function Home() {
    const { data: session, status } = useSession()
    let routePushed = false
    const router = useRouter()

    useEffect(() => {
        if (session?.dbUser && !routePushed) {
            router.push('/projects')
            routePushed = true
        }
    }, [session])

    return (
        <Wrapper session={session} status={status}>
            Redirecting...
        </Wrapper>
    )
}
