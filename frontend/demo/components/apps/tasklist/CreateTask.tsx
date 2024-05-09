import type { Demo } from "@/types";
import {
    AutoComplete,
    AutoCompleteChangeEvent,
    AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "./context/taskcontext";

function CreateTask() {
    const [task, setTask] = useState<Demo.Task | null>(null);
    const [filteredMembers, setFilteredMembers] = useState<Demo.Member[]>([]);
    const toast = useRef<Toast | null>(null);
    const {
        addTask,
        editTask,
        closeDialog,
        dialogConfig,
        selectedTask,
        members,
    } = useContext(TaskContext);

    const filterMembers = (event: AutoCompleteCompleteEvent) => {
        let filtered = [];
        let query = event.query;

        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            if (member.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(member);
            }
        }
        setFilteredMembers(filtered);
    };

    const onMemberChange = (e: AutoCompleteChangeEvent) => {
        setTask((prevState) => ({ ...prevState, members: [...e.value] }));
    };
    const save = () => {
        if (dialogConfig.newTask) {
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: `Task "${task?.name}" created successfully.`,
            });
            addTask(task!);
        } else if (
            selectedTask &&
            JSON.stringify(selectedTask) !== JSON.stringify(task)
        ) {
            toast.current?.show({
                severity: "success",
                summary: "Edited",
                detail: `Task "${selectedTask?.name}" edited successfully.`,
            });
            editTask(task!);
        }
        closeDialog();
    };

    const resetTask = () => {
        const taskId = Math.floor(Math.random() * 1000).toString();
        setTask({
            id: parseFloat(taskId),
            name: "",
            description: "",
            status: "Waiting",
        });
    };

    const itemTemplate = (member: Demo.Member) => {
        return (
            <div className="flex align-items-center border-round">
                <img
                    src={`/demo/images/avatar/${member.image}`}
                    alt={member.name}
                    className="h-2rem w-2rem mr-2"
                />
                <span className="text-900 font-medium">{member.name}</span>
            </div>
        );
    };
    const selectedItemTemplate = (member: Demo.Member) => {
        return (
            <div className="flex align-items-center">
                <img
                    src={`/demo/images/avatar/${member.image}`}
                    alt={member.name}
                    className="h-2rem w-2rem mr-2"
                />
                <span className="text-900 font-medium">{member.name}</span>
            </div>
        );
    };

    useEffect(() => {
        resetTask();
    }, []);

    useEffect(() => {
        if (dialogConfig.newTask === false) setTask(selectedTask);
        if (dialogConfig.newTask) resetTask();
    }, [dialogConfig]);

    return (
        <React.Fragment>
            <Toast ref={toast} key="Task Toast"></Toast>
            <Dialog
                header={dialogConfig.header || ""}
                visible={dialogConfig.visible}
                modal
                dismissableMask
                className="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6"
                contentClassName="border-round-bottom border-top-1 surface-border p-0"
                onHide={closeDialog}
            >
                <div className="p-4">
                    <div className="grid p-fluid formgrid">
                        <div className="col-12 field">
                            <label
                                htmlFor="name"
                                className="text-900 font-semibold"
                            >
                                Task Name
                            </label>
                            <InputText
                                id="name"
                                type="text"
                                placeholder="Title"
                                value={task?.name}
                                onChange={(e) =>
                                    setTask((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="col-12 field">
                            <label
                                htmlFor="description"
                                className="text-900 font-semibold"
                            >
                                Description
                            </label>
                            <Editor
                                value={task?.description}
                                onTextChange={(e) =>
                                    setTask((prevState) => ({
                                        ...prevState,
                                        description: e.htmlValue ?? "",
                                    }))
                                }
                                style={{ height: "150px" }}
                            ></Editor>
                        </div>
                        <div className="col-6 field mt-0">
                            <label
                                htmlFor="start"
                                className="text-900 font-semibold"
                            >
                                Start Date
                            </label>
                            <Calendar
                                dateFormat="yy-mm-dd"
                                showTime={false}
                                inputId="start"
                                placeholder="Start Date"
                                value={task?.startDate as any}
                                onChange={(e) =>
                                    setTask((prevState) => ({
                                        ...prevState,
                                        startDate:
                                            e.value?.toString() as string,
                                    }))
                                }
                            ></Calendar>
                        </div>
                        <div className="col-6 field mt-0">
                            <label
                                htmlFor="end"
                                className="text-900 font-semibold"
                            >
                                Due Date
                            </label>
                            <Calendar
                                dateFormat="yy-mm-dd"
                                showTime={false}
                                inputId="end"
                                placeholder="End Date"
                                value={task?.endDate as any}
                                onChange={(e) =>
                                    setTask((prevState) => ({
                                        ...prevState,
                                        endDate: e.value?.toString() as string,
                                    }))
                                }
                            ></Calendar>
                        </div>
                        <div className="col-12 field">
                            <label
                                htmlFor="members"
                                className="text-900 font-semibold"
                            >
                                Add Team Member
                            </label>
                            <AutoComplete
                                itemTemplate={itemTemplate}
                                selectedItemTemplate={selectedItemTemplate}
                                inputId="members"
                                id="autocomplete"
                                value={task?.members}
                                onChange={onMemberChange}
                                placeholder="Choose team members"
                                suggestions={filteredMembers}
                                completeMethod={filterMembers}
                                field="name"
                                multiple
                                aria-label="Members"
                                dropdownAriaLabel="Members"
                                inputStyle={{ height: "2.5rem" }}
                            />
                        </div>
                        <div className="col-12 flex justify-content-end mt-4">
                            <Button
                                className="w-8rem mr-3"
                                outlined
                                icon="pi pi-times"
                                label="Cancel"
                                onClick={closeDialog}
                            ></Button>
                            <Button
                                className="w-8rem"
                                icon="pi pi-check"
                                label="Save"
                                onClick={() => save()}
                            ></Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
}

export default CreateTask;
