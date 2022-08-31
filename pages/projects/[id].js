import Head from 'next/head'
import { useRouter } from 'next/router'
import ManageProject from '../../src/components/ManageProject'
import Navbar from '../../src/components/Navbar'
import ProjectDetails from '../../src/components/ProjectDetails'

export default function Project() {
    const router = useRouter()

    const projectId = router.query.id

    const isAdmin = true // add logic to check if the logged in user is the admin for this project

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
                    {isAdmin ? <ManageProject /> : <ProjectDetails />}
                </section>
            </main>

            {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
        </div>
    )
}
