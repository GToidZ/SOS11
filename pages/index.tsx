import { Center, Divider, Kbd, Modal, ScrollArea, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import type { GetServerSideProps, NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { TaskList } from '../components/TaskList'
import { useState } from 'react'
import { getCookie, hasCookie } from 'cookies-next'
import styles from '../styles/Home.module.css'
import qa from '../questions.json'
import axios from 'axios'
import parse from 'html-react-parser'
import Head from 'next/head'

type Props = {
  username: string;
}

const Home: NextPage = ({username}: Props) => {
  const [modalOpened, setModalOpened] = useState(false);
  useHotkeys([
    ['shift+h', () => setModalOpened(!modalOpened)]
  ])

  return (
    <div className={styles.container}>
      <Head>
            <title>☄️ SOS Camp 11th ☄️</title>
            <meta name="description" content="Our new frontier..." />
            <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleGrid cols={1}>
        <Navbar name={username ? username : ""}></Navbar>
        <Center><Text onClick={() => setModalOpened(true)}>Hit <Kbd>Shift</Kbd>+<Kbd>H</Kbd> for help or click on this text</Text></Center>
        <TaskList></TaskList>
      </SimpleGrid>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Help" size="xl">
        <ScrollArea style={{height: 400}}>
          {
            qa.map(entry => {
              return (
                <Stack key={entry.question}>
                  <Title order={2}>{entry.question}</Title>
                  <Text>{parse(entry.answer)}</Text>
                  <Divider size="sm" my="lg"></Divider>
                </Stack>
              )
            })
          }
        </ScrollArea>
      </Modal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {req, res} = context;
  //if(!hasCookie("discordKey", {req, res})) {
  //  return {
  //    redirect: {
  //      permanent: false,
  //      destination: "/landing"
  //    },
  //    props: {}
  //  }
  //}
  //const key = getCookie("discordKey", {req, res})
  //const resp = await axios.get(`https://discord.com/api/v10/users/@me`,
  //{
  //    headers: {
  //        Authorization: 'Bearer ' + key
  //    }
  //});
  //const { username } = resp.data;
  const username = "visitor";
  return {props: { username }};
}

export default Home
