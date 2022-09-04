import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../src/components/Navbar'
import BannedCard from '../src/components/BannedCard'
import CreateProfile from '../src/components/CreateProfile'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    let routePushed = false
    const router = useRouter()
    useEffect(() => {
        if (session?.dbUser && !routePushed) {
            router.push('projects')
            routePushed = true
        }
    }, [session])

    if (loading) {
        console.log('loading is true')
        return <div>LOADING...</div>
    }
    if (!session?.dbUser && session) {
        return (
            <div>
                <Head>
                    <title>Chingu Collaborate</title>
                    <meta name="description" content="Chingu Collaborate" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container">
                    <Navbar />
                    <section className="content">
                        {/* <BannedCard /> */}
                        <CreateProfile />
                    </section>
                </main>
            </div>
        )
    } else if (session?.dbUser) {
        return <div>User already exists on the server. Redirecting.</div>
    } else if (!session?.dbUser && !session) {
        return (
            <div>
                You are not signed in at all. Sign in using discord first.
            </div>
        )
    }
}
