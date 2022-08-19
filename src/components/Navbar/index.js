import styles from './Nav.module.css'
import Image from 'next/image'
import logo from './chinguLogo.png'
import HamburgerMenu from '../HamburgerMenu'

function Navbar() {
    return (
        <nav className={styles.nav}>
            <Image
                src={logo}
                alt="Chingu Collaborate Logo"
                width={100}
                height={40}
            />
            <HamburgerMenu />
        </nav>
    )
}

export default Navbar
