import NewUser from './NewUser'
import ExistingUser from './ExistingUser'
import UnauthenticatedUser from './UnauthenticatedUser'
import Loading from './Loading'

function Wrapper({ children, session, status }) {
    // Loading State
    if (status === 'loading') {
        return <Loading />
    }

    if (status === 'unauthenticated') {
        return <UnauthenticatedUser />
    }

    // If user is authenticated and exists in database
    if (status === 'authenticated' && session.dbUser) {
        const isBanned = session.dbUser.isBanned
        return <ExistingUser isBanned={isBanned}>{children}</ExistingUser>
    }

    // If user is authenticated and doesn't exist in database then force creating a profile
    if (status !== 'loading' && status === 'authenticated' && !session.dbUser) {
        return <NewUser />
    }
}

export default Wrapper
