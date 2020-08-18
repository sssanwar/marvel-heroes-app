import Head from "next/head"
import styles from "../styles/home.module.css"
import SearchBox from "../components/searchbox"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Heroes</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search Marvel Heroes</h1>
        <p className={styles.description}>in Marvel database</p>
        <div className={styles.grid}>
          <SearchBox />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
