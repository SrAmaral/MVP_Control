import type { Demo, TaskContextProps } from "@/types";
import React, { useEffect, useState } from "react";

export const TaskContext = React.createContext({} as TaskContextProps);

interface TaskProviderProps {
    children: React.ReactNode;
}

export const TaskProvider = (props: TaskProviderProps) => {
    const [tasks, setTasks] = useState<Demo.Task[]>([]);
    const [members, setMembers] = useState<Demo.Member[]>([]);
    const [selectedTask, setSelectedTask] = useState<Demo.Task | null>(null);
    const [dialogConfig, setDialogConfig] = useState<Demo.DialogConfig>({
        visible: false,
        header: "",
        newTask: false,
    });

    const getTasks = () => {
        return fetch("/demo/data/tasks.json", {
            headers: { "Cache-Control": "no-cache" },
        })
            .then((res) => res.json())
            .then((d) => d.data);
    };

    const getMembers = () => {
        return fetch("/demo/data/members.json", {
            headers: { "Cache-Control": "no-cache" },
        })
            .then((res) => res.json())
            .then((d) => d.data);
    };

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
        getMembers().then((members) => setMembers(members));
    }, []);

    const addTask = (task: Demo.Task) => {
        const _task: Demo.Task = { ...task };
        _task.attachments = Math.floor(Math.random() * 10).toString();
        _task.comments = Math.floor(Math.random() * 10).toString();
        setTasks((prevState) => [...prevState, _task]);
    };

    const editTask = (task: Demo.Task) => {
        const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(_tasks);
    };

    const removeTask = (id: number) => {
        const _tasks = tasks.filter((t) => t.id !== id);
        setTasks(_tasks);
    };

    const onTaskSelect = (task: Demo.Task) => {
        setSelectedTask(task);
    };

    const markAsCompleted = (task: Demo.Task) => {
        const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(_tasks);
    };

    const showDialog = (header: string, newTask: boolean) => {
        setDialogConfig({
            visible: true,
            header,
            newTask,
        });
    };

    const closeDialog = () => {
        setDialogConfig((prevState) => ({ ...prevState, visible: false }));
    };

    const value = {
        dialogConfig,
        selectedTask,
        tasks,
        members,
        setTasks,
        setMembers,
        setDialogConfig,
        setSelectedTask,
        getTasks,
        getMembers,
        addTask,
        editTask,
        removeTask,
        onTaskSelect,
        showDialog,
        closeDialog,
        markAsCompleted,
    };

    return (
        <TaskContext.Provider value={value}>
            {props.children}
        </TaskContext.Provider>
    );
};
