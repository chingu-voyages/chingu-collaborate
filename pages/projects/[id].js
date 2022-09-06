import Head from 'next/head'
import ManageProject from '../../src/components/ManageProject'
import Navbar from '../../src/components/Navbar'
import ProjectDetails from '../../src/components/ProjectDetails'
import { useSession } from 'next-auth/react'

export default function Project({ details, admin }) {
    const { data: session } = useSession()

    const isAdmin = session?.dbUser?._id === details.admin

    const projectExists = Object.keys(details).length > 0

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
                    {projectExists && isAdmin ? (
                        <ManageProject project={details} />
                    ) : projectExists && !isAdmin ? (
                        <ProjectDetails project={details} admin={admin} />
                    ) : (
                        ''
                    )}
                </section>
            </main>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const response1 = await fetch(
            `http://localhost:3000/api/projects/${context.params.id}`
        )

        if (!response1.ok) {
            if (response1.status === 500) {
                return { props: { details: {}, admin: {} } }
            }
        }

        const projectData = await response1.json()

        const response2 = await fetch(
            `http://localhost:3000/api/user/${projectData.admin}`
        )

        if (!response2.ok) {
            throw Error('An error occured while fetching for project admin')
        }

        const adminData = await response2.json()

        return { props: { details: projectData, admin: adminData } }
    } catch (error) {
        console.log(
            'An error occurred whiled server side rendering on Projects page.'
        )
    }
}
