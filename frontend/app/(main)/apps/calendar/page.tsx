"use client";
// fullcalendar core import
import FullCalendar from "@fullcalendar/react";
// fullcalendar plugins imports
import type { Demo, Page } from "@/types";
import { DateInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button } from "primereact/button";
import { Calendar as PRCalendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { EventService } from "../../../../demo/service/EventService";

const CalendarDemo: Page = () => {
    const [events, setEvents] = useState<Demo.Event[]>([]);
    const [tags, setTags] = useState<Demo.Event["tag"][]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [view, setView] = useState("");
    const [changedEvent, setChangedEvent] = useState<Demo.Event>({
        title: "",
        start: "",
        end: "",
        allDay: false,
        location: "",
        borderColor: "",
        textColor: "",
        description: "",
        tag: {
            name: "Company A",
            color: "#FFB6B6",
        },
    });
    const onEventClick = (e: EventClickArg) => {
        const { start, end } = e.event;
        let plainEvent = e.event.toPlainObject({
            collapseExtendedProps: true,
            collapseColor: true,
        });
        setView("display");
        setShowDialog(true);
        setChangedEvent((prevChangeState) => ({
            ...prevChangeState,
            ...plainEvent,
            start: start as DateInput,
            end: end ? end : (start as DateInput),
        }));
    };

    useEffect(() => {
        EventService.getEvents().then((data) => {
            setEvents(data);
            const _tags: Demo.Event["tag"][] = [];
            data.forEach((event) => {
                _tags.push(event.tag);
            });
            setTags(_tags);
        });
    }, []);

    const handleSave = () => {
        if (!validate()) {
            return;
        } else {
            const _clickedEvent = {
                ...changedEvent,
                backgroundColor: changedEvent.tag?.color ?? "#fff",
                borderColor: changedEvent.tag?.color ?? "#fff",
                textColor: "#212121",
            };
            setShowDialog(false);
            if (_clickedEvent.id) {
                const _events = events.map((i) =>
                    i.id?.toString() === _clickedEvent.id?.toString()
                        ? (i = _clickedEvent)
                        : i
                );
                setEvents(_events);
            } else {
                setEvents((prevState) => [
                    ...prevState,
                    {
                        ..._clickedEvent,
                        id: Math.floor(Math.random() * 10000).toString(),
                    },
                ]);
            }
        }
    };

    const validate = () => {
        let { start, end, title } = changedEvent;
        return start && end && title;
    };

    const onEditClick = () => {
        setView("edit");
    };

    const onDateSelect = (e: DateSelectArg) => {
        setView("new");
        setShowDialog(true);
        setChangedEvent({
            ...e,
            title: "",
            location: "",
            borderColor: "",
            textColor: "",
            description: "",
            tag: {
                name: "Company A",
                color: "#FFB6B6",
            },
        });
    };

    const selectedItemTemplate = () => {
        return (
            <div className="flex align-items-center">
                <div
                    className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                    style={{
                        backgroundColor: changedEvent.tag?.color || "#FFB6B6",
                    }}
                ></div>
                <div>{changedEvent.tag?.name || "Company A"}</div>
            </div>
        );
    };

    const itemOptionTemplate = (tag: Demo.Event["tag"]) => {
        return (
            <div className="flex align-items-center">
                <div
                    className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                    style={{ backgroundColor: tag?.color }}
                ></div>
                <div>{tag?.name}</div>
            </div>
        );
    };

    const footer = (
        <>
            {view === "display" ? (
                <Button
                    type="button"
                    label="Edit"
                    icon="pi pi-pencil"
                    onClick={onEditClick}
                />
            ) : null}
            {view === "new" || view === "edit" ? (
                <Button
                    type="button"
                    label="Save"
                    icon="pi pi-check"
                    disabled={!changedEvent.start || !changedEvent.end}
                    onClick={handleSave}
                />
            ) : null}
        </>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Calendar</h5>
                    <FullCalendar
                        events={events}
                        eventClick={onEventClick}
                        select={onDateSelect}
                        initialDate="2022-05-11"
                        initialView="dayGridMonth"
                        height={720}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents
                    />

                    <Dialog
                        visible={showDialog}
                        style={{ width: "36rem" }}
                        modal
                        headerClassName="text-900 font-semibold text-xl"
                        header={
                            view === "display"
                                ? changedEvent.title
                                : view === "new"
                                ? "New Event"
                                : "Edit Event"
                        }
                        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
                        footer={footer}
                        closable
                        onHide={() => setShowDialog(false)}
                    >
                        <>
                            {view === "display" ? (
                                <React.Fragment>
                                    <span className="text-900 font-semibold block mb-2">
                                        Description
                                    </span>
                                    <span className="block mb-3">
                                        {changedEvent.description}
                                    </span>

                                    <div className="grid">
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2">
                                                Start
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.start
                                                        ?.toString()
                                                        .slice(0, 10)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2">
                                                End
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.end
                                                        ?.toString()
                                                        .slice(0, 10)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-900 font-semibold mb-2">
                                                Location
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.location}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-900 font-semibold mb-2">
                                                Color
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <span
                                                    className="inline-flex flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                                                    style={{
                                                        backgroundColor:
                                                            changedEvent.tag
                                                                ?.color,
                                                    }}
                                                ></span>
                                                <span>
                                                    {changedEvent.tag?.name}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className="grid p-fluid formgrid">
                                    <div className="col-12 md:col-6 field">
                                        <label
                                            htmlFor="title"
                                            className="text-900 font-semibold"
                                        >
                                            Title
                                        </label>
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-pencil"></i>
                                            <InputText
                                                id="title"
                                                value={changedEvent.title}
                                                onChange={(e) =>
                                                    setChangedEvent(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    )
                                                }
                                                type="text"
                                                placeholder="Title"
                                            />
                                        </span>
                                    </div>
                                    <div className="col-12 md:col-6 field">
                                        <label
                                            htmlFor="location"
                                            className="text-900 font-semibold"
                                        >
                                            Location
                                        </label>
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-map-marker"></i>
                                            <InputText
                                                id="location"
                                                value={changedEvent.location}
                                                onChange={(e) =>
                                                    setChangedEvent(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            location:
                                                                e.target.value,
                                                        })
                                                    )
                                                }
                                                type="text"
                                                placeholder="Location"
                                            />
                                        </span>
                                    </div>
                                    <div className="col-12 field">
                                        <label
                                            htmlFor="description"
                                            className="text-900 font-semibold"
                                        >
                                            Event Description
                                        </label>
                                        <InputTextarea
                                            id="description"
                                            rows={5}
                                            value={changedEvent.description}
                                            onChange={(e) =>
                                                setChangedEvent(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        description:
                                                            e.target.value,
                                                    })
                                                )
                                            }
                                            style={{ resize: "none" }}
                                        ></InputTextarea>
                                    </div>

                                    <div className="col-12 md:col-6 field">
                                        <label
                                            htmlFor="start"
                                            className="text-900 font-semibold"
                                        >
                                            Start Date
                                        </label>
                                        <PRCalendar
                                            id="start"
                                            maxDate={changedEvent.end as Date}
                                            value={changedEvent.start as Date}
                                            onChange={(e) =>
                                                setChangedEvent(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        start: e.value as
                                                            | DateInput
                                                            | undefined,
                                                    })
                                                )
                                            }
                                            showTime
                                            required
                                        />
                                    </div>
                                    <div className="col-12 md:col-6 field">
                                        <label
                                            htmlFor="end"
                                            className="text-900 font-semibold"
                                        >
                                            End Date
                                        </label>
                                        <PRCalendar
                                            id="end"
                                            minDate={changedEvent.start as Date}
                                            value={changedEvent.end as Date}
                                            onChange={(e) =>
                                                setChangedEvent(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        end: e.value as DateInput,
                                                    })
                                                )
                                            }
                                            showTime
                                            required
                                        />
                                    </div>
                                    <div className="col-12 field">
                                        <label
                                            htmlFor="company-color"
                                            className="text-900 font-semibold"
                                        >
                                            Color
                                        </label>
                                        <Dropdown
                                            inputId="company-color"
                                            value={changedEvent.tag}
                                            options={tags}
                                            onChange={(e) =>
                                                setChangedEvent(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        tag: e.value,
                                                    })
                                                )
                                            }
                                            optionLabel="name"
                                            placeholder="Select a Tag"
                                            valueTemplate={selectedItemTemplate}
                                            itemTemplate={itemOptionTemplate}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CalendarDemo;
