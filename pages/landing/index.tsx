import type { GetServerSideProps, NextPage } from "next";
import Head from 'next/head'
import { Title, Image, Button, Alert } from "@mantine/core";
import { Discord } from "@icons-pack/react-simple-icons";
import styles from '../../styles/Landing.module.css'

type Props = {
    error: string;
}

const Landing: NextPage = ({error}: Props) => {
    return (
        <div className={styles.background}>
        <Head>
            <title>☄️</title>
            <meta name="description" content="Our new frontier..." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.space}>
            <div className={styles.stars}></div>
            <div className={styles.cometField}>
                <div className={styles.comet}></div>
                <div className={styles.comet}></div>
                <div className={styles.comet}></div>
                <div className={styles.comet}></div>
            </div>
            <div className={styles.planet}></div>
            <div className={styles.logo}>
                <Title order={1} sx={
                    (theme) => (
                        { color: "#F4E3D7", fontSize: "6em", '@media (max-width: 768px)': {
                            fontSize: "3em"
                        } }
                        )
                    }>SOS CAMP 11th</Title>
                <Image src="chicken.png" alt="Chicken sparkles~" />
            </div>
            <div className={styles.footer}>
                <Button fullWidth leftIcon={<Discord size={20}/>} sx={{backgroundColor: "#5865F2", '&:hover': {backgroundColor: "#404EED"}}}
                component="a" href={process.env.DISCORD_AUTH_LINK} target="_self">
                        Login with Discord
                </Button>
            </div>
            {error &&
                <Alert title="Not whitelisted!" color="red">
                    You are not whitelisted on Discord guild! Please contact staff!
                </Alert>
            }
        </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {req, res, query} = context;
    if (query.error === '1') {
        return {props: { error: "You are not whitelisted!" }}
    }
    return {props: {}};
}

export default Landing;