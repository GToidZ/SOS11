import { Paper, Title } from "@mantine/core"

interface Props {
    name: string
}

export const Navbar = ({name}: Props) => {
    return (
        <Paper shadow="sm" p="xl" style={{ padding: "3rem 2.5rem" }} sx={
            (theme) => ({
                background: theme.fn.linearGradient(26, theme.colors.sos11[4], theme.colors.sos11[5]),
                color: theme.colors.sos11[0]
            })
        }>
            {name !== "" ?
                <Title order={6}>Welcome, {name}</Title> :
                <Title order={6}>Welcome.</Title>
            }
            <Title order={1} style={{paddingTop: 10}}>SOS CAMP 11th</Title>
            <Title order={2}>Lab Work</Title>
        </Paper>
    )
}