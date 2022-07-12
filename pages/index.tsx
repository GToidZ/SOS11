import { Center, SimpleGrid, Text } from '@mantine/core'
import type { GetServerSideProps, NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { TaskList } from '../components/TaskList'
import { getCookie, hasCookie } from 'cookies-next'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Head from 'next/head'

type Props = {
  username: string;
}

const Home: NextPage = ({username}: Props) => {
  return (
    <div className={styles.container}>
      <Head>
            <title>☄️ SOS Camp 11th ☄️</title>
            <meta name="description" content="Our new frontier..." />
            <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleGrid cols={1}>
        <Navbar name={username ? username : ""}></Navbar>
        <TaskList></TaskList>
        <Center><Text>Note: Checkboxes only save in-browser, changing browser may change the checkboxes&apos; state.</Text></Center>
      </SimpleGrid>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req, res} = context;
  if(!hasCookie("discordKey", {req, res})) {
    return {
      redirect: {
        permanent: false,
        destination: "/landing"
      },
      props: {}
    }
  }
  const key = getCookie("discordKey", {req, res})
  const resp = await axios.get(`https://discord.com/api/v10/users/@me`,
  {
      headers: {
          Authorization: 'Bearer ' + key
      }
  });
  const { username } = resp.data;
  return {props: { username }};
}

export default Home
