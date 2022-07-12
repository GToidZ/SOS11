import { TaskCard } from "./TaskCard";
import tasks from "../tasks.json";
import tags from "../tags.json";
import { Select, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";

const filterByTag = (tag: string | null) => {
    if (tag) {
        return (
            <SimpleGrid breakpoints={[
                { minWidth: "sm", cols: 1 }, { minWidth: "md", cols: 2 }
            ]}>
                {
                    tasks.map(item => {
                    return (
                        item.timeOpen <= Math.floor(new Date().getTime() / 1000) && item.topics.includes(tag) ?
                        <TaskCard key={item.id} id={item.id} title={item.title} link={item.link} difficulty={item.difficulty} topics={item.topics}></TaskCard> :
                        null
                    )
                    })
                }
            </SimpleGrid>
        )
    }
    return (
        <SimpleGrid breakpoints={[
            { minWidth: "sm", cols: 1 }, { minWidth: "md", cols: 2 }
        ]}>
            {
                tasks.map(item => {
                return (
                    item.timeOpen <= Math.floor(new Date().getTime() / 1000) ?
                    <TaskCard key={item.id} id={item.id} title={item.title} link={item.link} difficulty={item.difficulty} topics={item.topics}></TaskCard> :
                    null
                )
                })
            }
        </SimpleGrid>
    );
}

export const TaskList = () => {
    const [tag, setTag] = useState("");

    useEffect(() => {
        filterByTag(tag)
    }, [tag])
 
    return (
        <SimpleGrid cols={1}>
            <Select placeholder="Choose a tag to filter by..." data={tags} value={tag} onChange={setTag} clearable allowDeselect/>
            {filterByTag(tag)}
        </SimpleGrid>
    );
}