import type { Demo } from "@/types";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "./context/taskcontext";

interface TaskListProps {
    taskList: Demo.Task[];
    title: string;
}

function TaskList(props: TaskListProps) {
    const [clickedTask, setClickedTask] = useState<Demo.Task>({});
    const { markAsCompleted, removeTask, onTaskSelect, showDialog } =
        useContext(TaskContext);
    const menu = useRef<Menu | null>(null);

    const menuItems = [
        { label: "Edit", icon: "pi pi-pencil", command: () => onEdit() },
        { label: "Delete", icon: "pi pi-trash", command: () => handleDelete() },
    ];
    const onCheckboxChange = (event: CheckboxChangeEvent, task: Demo.Task) => {
        event.originalEvent?.stopPropagation();
        task.completed = event.checked as boolean;
        markAsCompleted(task);
    };

    const parseDate = (date: string) => {
        let d = new Date(date);
        return d.toUTCString().split(" ").slice(1, 3).join(" ");
    };

    const handleDelete = () => {
        removeTask(clickedTask?.id as number);
    };

    const toggleMenu = (
        event: React.MouseEvent<HTMLButtonElement>,
        task: Demo.Task
    ) => {
        setClickedTask(task);
        menu.current?.toggle(event);
    };

    const onEdit = () => {
        onTaskSelect(clickedTask);
        showDialog("Edit Task", false);
    };

    return (
        <div>
            <div className="text-900 font-semibold text-lg mt-5 mb-3 border-bottom-1 surface-border py-3">
                {props.title}
            </div>
            <ul className="list-none p-0 m-0">
                {props.taskList.map((task, i) => {
                    return (
                        <li
                            key={i}
                            className="flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border"
                        >
                            <div className="flex align-items-center flex-1">
                                <Checkbox
                                    onChange={(event) =>
                                        onCheckboxChange(event, task)
                                    }
                                    checked={task.completed as boolean}
                                    inputId={task.id?.toString()}
                                ></Checkbox>
                                <label
                                    htmlFor={task.id?.toString()}
                                    className={classNames(
                                        "font-medium white-space-nowrap text-overflow-ellipsis overflow-hidden ml-2",
                                        {
                                            "line-through": task.completed,
                                        }
                                    )}
                                    style={{ maxWidth: "300px" }}
                                >
                                    {task.name}
                                </label>
                            </div>
                            <div className="flex flex-1 gap-3 flex-column sm:flex-row sm:justify-content-between">
                                <div className="flex align-items-center">
                                    {task.comments && (
                                        <span className="flex align-items-center font-semibold mr-3">
                                            <i className="pi pi-comment mr-2"></i>
                                            {task.comments}
                                        </span>
                                    )}
                                    {task.attachments && (
                                        <span className="flex align-items-center font-semibold mr-3">
                                            <i className="pi pi-paperclip mr-2"></i>
                                            {task.attachments}
                                        </span>
                                    )}
                                    {task.startDate && (
                                        <span className="flex align-items-center font-semibold white-space-nowrap">
                                            <i className="pi pi-clock mr-2"></i>
                                            {parseDate(task.startDate)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex align-items-center sm:justify-content-end">
                                    <AvatarGroup className="mr-3">
                                        {task.members &&
                                            task.members.map((member, i) => {
                                                return (
                                                    <Avatar
                                                        key={i}
                                                        image={`/demo/images/avatar/${member.image}`}
                                                        size="large"
                                                        shape="circle"
                                                    />
                                                );
                                            })}
                                        {task &&
                                            task.members &&
                                            task.members.length > 4 && (
                                                <Avatar
                                                    image={`/demo/images/avatar/amyelsner.png`}
                                                    size="large"
                                                    shape="circle"
                                                    label={`+${
                                                        task.members.length - 4
                                                    }`}
                                                    style={{
                                                        backgroundColor:
                                                            "#ffffff",
                                                        color: "#212121",
                                                        border: "2px solid var(--surface-border)",
                                                    }}
                                                />
                                            )}
                                    </AvatarGroup>
                                    <Button
                                        type="button"
                                        icon="pi pi-ellipsis-v"
                                        className="z-3 ml-auto sm:ml-0"
                                        rounded
                                        text
                                        onClick={(e) => toggleMenu(e, task)}
                                    ></Button>
                                    <Menu
                                        ref={menu}
                                        popup
                                        model={menuItems}
                                        className="w-8rem"
                                    ></Menu>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TaskList;
