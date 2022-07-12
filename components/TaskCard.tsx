import { Group, Text, Card, Badge, useMantineTheme, Checkbox } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

interface TaskCardProps {
    id: String;
    title: string;
    link: string;
    difficulty: number;
    topics: string[];
}

export const TaskCard = ({id, title, link, difficulty, topics}: TaskCardProps) => {
    const theme = useMantineTheme();
    const [completed, setCompleted] = useLocalStorage({ key: id + '_completed', defaultValue: false });

    if(difficulty > 5) {difficulty = 5;}
    if(difficulty < 1) {difficulty = 1;}

    return (
        <Card shadow={theme.shadows.sm} radius="md" component="a" href={link} target="_blank" style={{
            padding: "2rem 1.5rem"
        }} sx={(theme) => ({
            backgroundColor: theme.colors.dark[6],
            '&:hover': {
                backgroundColor: theme.colors.dark[5]
            }
        })}>
            <Group position='apart' sx={{marginBottom: "1rem"}}>
                <Group position='left'>
                    <Checkbox checked={completed} onChange={(e) => setCompleted(e.currentTarget.checked)} color="teal"></Checkbox>
                    <Text weight={600} size="xl">{title}</Text>
                </Group>
                <Badge variant='filled' size="lg" sx={(theme) => ({
                    backgroundColor: theme.colors.sos11[2],
                    color: theme.colors.sos11[0]
                })}>🔥 {difficulty}/5</Badge>
            </Group>
            <Group position='left'>
                {topics.map(val => {
                    return <Badge key={val} sx={(theme) => ({
                        backgroundColor: theme.colors.sos11[0],
                        color: theme.colors.sos11[5]
                    })}>{val}</Badge>
                })}
            </Group>
        </Card>
    )
};