import styles from './Nav.module.css'
import HamburgerMenu from '../HamburgerMenu'

function Navbar() {
    return (
        <nav className={styles.nav}>
            Chingu Collaborate
            <HamburgerMenu />
        </nav>
    )
}

export default Navbar
