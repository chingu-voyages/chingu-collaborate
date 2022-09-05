import Head from 'next/head'
import LimitsOverview from '../../src/components/LimitsOverview'
import Navbar from '../../src/components/Navbar'
import ProjectPreviewCard from '../../src/components/ProjectPreviewCard'
import ProjectActions from '../../src/components/ProjectActions'

// {projects}----->Desturctue of static props
export default function Projects({ projects }) {
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
                    <LimitsOverview />
                    <ProjectActions />
                    {projects.map((project) => {
                        return (
                            <ProjectPreviewCard
                                key={project._sid}
                                project={project}
                            />
                        )
                    })}
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

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/projects', {
        method: 'GET',
    })
    const data = await response.json()
    return {
        props: { projects: data },
    }
}
