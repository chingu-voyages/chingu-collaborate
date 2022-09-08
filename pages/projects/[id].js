import Head from 'next/head'
import ManageProject from '../../src/components/ManageProject'
import Navbar from '../../src/components/Navbar'
import ProjectDetails from '../../src/components/ProjectDetails'
import { useSession } from 'next-auth/react'

export default function Project({ details }) {
    const { data: session } = useSession()

    const isAdmin = session?.dbUser?._id === details?.admin?._id

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
                    {details !== null && isAdmin ? (
                        <ManageProject project={details} />
                    ) : details !== null && !isAdmin ? (
                        <ProjectDetails project={details} />
                    ) : (
                        'The project you are looking for does not exist.'
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
                return { props: { details: {} } }
            }
        }

        const projectData = await response1.json()

        return { props: { details: projectData } }
    } catch (error) {
        console.log(
            'An error occurred whiled server side rendering on Projects page.'
        )
    }
}
