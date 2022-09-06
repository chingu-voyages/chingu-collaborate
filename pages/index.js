import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../src/components/Navbar'
import BannedCard from '../src/components/BannedCard'
import CreateProfile from '../src/components/CreateProfile'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AuthWrapper from '../src/components/AuthWrapper'
import { Spinner } from '@chakra-ui/react'

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
