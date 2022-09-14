import { useState } from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import BannedCard from '../BannedCard'

export default function ExistingUser({ children, isBanned }) {
    console.log(isBanned, children)
    return (
        <>
            <Header />
            <main className="container">
                <Navbar />

                <section className="content">
                    {isBanned ? <BannedCard /> : children}
                </section>
            </main>
        </>
    )
}
