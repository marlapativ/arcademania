import Link from "next/link";
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useColorMode } from "@chakra-ui/react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
    <Link href={"/"}>
        <h1 className={styles.logo}>
        <Image src="/images/logo.png" alt="Logo" width={32} height={24} />
          ArcadeMania
        </h1>
        <button onClick={toggleColorMode}>Click me</button>
    </Link>
    </header>
  );
};

export default NavBar;