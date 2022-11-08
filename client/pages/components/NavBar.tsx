import Link from "next/link";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const NavBar = () => {
  return (
    <header>
    <Link href={"/"}>
        <h1 className={styles.logo}>
        <Image src="/images/logo.png" alt="Logo" width={32} height={24} />
          ArcadeMania
        </h1>
    </Link>
    </header>
  );
};

export default NavBar;