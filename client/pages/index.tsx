import Head from 'next/head'
import NavBar from './components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Arcade Mania</title>
        <meta name="description" content="ArcadeMania is a an arcade of multiple games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <main className={styles.main}>
        <h4 className={styles.description}>
          <span>Most Recently played games</span>
        </h4>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>Snake Game &rarr;</h2>
            <p></p>
          </a>

          <a href="" className={styles.card}>
            <h2>Tic Tac Toe &rarr;</h2>
            <p></p>
          </a>

          <a href="" className={styles.card}>
            <h2>Escape Crash &rarr;</h2>
            <p></p>
          </a>

          <a href="" target="_blank" rel="noopener noreferrer" className={styles.card}>
            <h2>Memory card &rarr;</h2>
            <p></p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright © 2022 Arcade Mania. All rights reserved.
      </footer>
    </div>
  )
}
