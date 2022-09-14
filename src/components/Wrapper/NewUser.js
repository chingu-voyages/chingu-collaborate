import { useState } from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import CommunityStandards from '../CommunityStandards'
import CreateProfile from '../CreateProfile'

export default function NewUser() {
    const [agreeToRules, setAgreeToRules] = useState(false)
    const proceedHandler = () => {
        setAgreeToRules(true)
    }
    return (
        <>
            <Header />
            <main className="container">
                <Navbar />
                <section className="content">
                    {!agreeToRules && (
                        <CommunityStandards onProceed={proceedHandler} />
                    )}
                    {agreeToRules && <CreateProfile />}
                </section>
            </main>
        </>
    )
}
