import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AuthWrapper from '../src/components/AuthWrapper'

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
        <AuthWrapper session={session} status={status}>
            Redirecting...
        </AuthWrapper>
    )
}
