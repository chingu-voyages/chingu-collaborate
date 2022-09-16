import { useState } from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import BannedCard from '../BannedCard'
import Footer from '../Footer'

export default function ExistingUser({ children, isBanned }) {
    return (
        <>
            <Header />
            <main className="container">
                <Navbar />
                <section className="content">
                    {isBanned.value ? (
                        <BannedCard reason={isBanned.reason} />
                    ) : (
                        children
                    )}
                </section>
                <Footer />
            </main>
        </>
    )
}
