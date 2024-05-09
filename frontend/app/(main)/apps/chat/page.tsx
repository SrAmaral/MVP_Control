"use client";
import type { Demo, Page } from "@/types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserCard from "../../../../demo/components/apps/chat/UserCard";
import { ChatContext } from "../../../../demo/components/apps/chat/context/chatcontext";

const ChatSidebar = () => {
    const [filteredUsers, setFilteredUsers] = useState<Demo.User[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const { getChatData, users, setUsers } = useContext(ChatContext);

    const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
        let filtered = [];
        setSearchValue(e.target.value);
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (
                user &&
                user.name.toLowerCase().indexOf(searchValue.toLowerCase()) == 0
            ) {
                filtered.push(user);
            }
        }

        if (e.target.value === "") {
            setFilteredUsers(users);
        } else setFilteredUsers([...filtered]);
    };

    useEffect(() => {
        getChatData().then((data) => {
            setUsers(data);
            setFilteredUsers(data);
        });
    }, [getChatData, setUsers]);

    return (
        <React.Fragment>
            <div className="flex flex-column align-items-center border-bottom-1 surface-border p-6">
                <img
                    src="/demo/images/avatar/circle/avatar-f-1@2x.png"
                    className="w-6rem h-6rem border-circle shadow-4"
                    alt="Asiya Javayant"
                />
                <span className="text-900 text-xl font-semibold mt-4">
                    Asiya Javayant
                </span>
            </div>
            <div className="w-full flex row-gap-4 flex-column surface-border p-4">
                <span className="p-input-icon-left w-full">
                    <i className="pi pi-search"></i>
                    <InputText
                        id="search"
                        type="text"
                        placeholder="Search"
                        className="w-full"
                        value={searchValue}
                        onChange={filter}
                    />
                </span>
                {filteredUsers ? (
                    <div className="flex flex-row gap-4 md:flex-column overflow-auto">
                        {filteredUsers.map((user, i) => {
                            return <UserCard key={i} user={user} />;
                        })}
                    </div>
                ) : (
                    <span>No User Found.</span>
                )}
            </div>
        </React.Fragment>
    );
};

interface ChatBoxProps {
    user: Demo.User;
}

const ChatBox = (props: ChatBoxProps) => {
    const [textContent, setTextContent] = useState("");
    const { sendMessage, users } = useContext(ChatContext);
    const op = useRef<OverlayPanel>(null);
    const chatWindow = useRef<HTMLDivElement>(null);
    const user = props.user;
    const defaultUserId = 123;
    //prettier-ignore
    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
        '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
        '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
    ];

    const _sendMessage = () => {
        if (textContent == "" || textContent === " ") {
            return;
        } else {
            let message = {
                text: textContent,
                ownerId: 123,
                createdAt: new Date().getTime(),
            };

            sendMessage(message);
            setTextContent("");
        }
    };

    const handleInputTextKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") _sendMessage();
    };

    const onEmojiSelect = (emoji: string) => {
        setTextContent((prevState) => (prevState += emoji));
    };

    const parseDate = (timestamp: number) => {
        return new Date(timestamp)
            .toTimeString()
            .split(":")
            .slice(0, 2)
            .join(":");
    };

    useEffect(() => {
        if (chatWindow.current) {
            chatWindow.current.addEventListener("DOMNodeInserted", (event) => {
                const target = event.currentTarget as HTMLDivElement | null;
                if (target) {
                    target.scroll({ top: target.scrollHeight });
                }
            });
        }
    }, [users]);

    return (
        <React.Fragment>
            <div className="flex flex-column h-full">
                <div className="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
                    <div className="relative flex align-items-center mr-3">
                        <img
                            src={`/demo/images/avatar/${props.user.image}`}
                            alt={props.user.name}
                            className="w-4rem h-4rem border-circle shadow-4"
                        />
                        <span
                            className={classNames(
                                "w-1rem h-1rem border-circle border-2 surface-border absolute bottom-0 right-0",
                                {
                                    "bg-green-400":
                                        props.user.status === "active",
                                    "bg-red-400": props.user.status === "busy",
                                    "bg-yellow-400":
                                        props.user.status === "away",
                                }
                            )}
                        ></span>
                    </div>
                    <div className="mr-2">
                        <span className="text-900 font-semibold block">
                            {props.user.name}
                        </span>
                        <span className="text-700">Last active 1 hour ago</span>
                    </div>
                    <div className="flex align-items-center ml-auto">
                        <Button
                            type="button"
                            icon="pi pi-phone"
                            rounded
                            outlined
                            severity="secondary"
                            className="mr-3"
                        ></Button>
                        <Button
                            type="button"
                            icon="pi pi-ellipsis-v"
                            rounded
                            outlined
                            severity="secondary"
                        ></Button>
                    </div>
                </div>
                <div
                    ref={chatWindow}
                    className="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto"
                    style={{ maxHeight: "53vh" }}
                >
                    {props.user.messages.map((message, i) => {
                        return (
                            <div key={i}>
                                {message.ownerId === defaultUserId ? (
                                    <div className="grid grid-nogutter mb-4">
                                        <div className="col mt-3 text-right">
                                            <span
                                                className="inline-block text-left font-medium border-1 surface-border bg-primary-100 text-primary-900 p-3 white-space-normal border-round"
                                                style={{
                                                    wordBreak: "break-word",
                                                    maxWidth: "80%",
                                                }}
                                            >
                                                {message.text}
                                            </span>
                                            <p className="text-700 mt-3">
                                                {parseDate(message.createdAt)}{" "}
                                                <i className="pi pi-check ml-2 text-green-400"></i>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-nogutter mb-4">
                                        <div className="mr-3 mt-1">
                                            <img
                                                src={`/demo/images/avatar/${user.image}`}
                                                alt={user.name}
                                                className="w-3rem h-3rem border-circle shadow-4"
                                            />
                                        </div>
                                        <div className="col mt-3">
                                            <p className="text-900 font-semibold mb-3">
                                                {user.name}
                                            </p>
                                            <span
                                                className="text-700 inline-block font-medium border-1 surface-border p-3 white-space-normal border-round"
                                                style={{
                                                    wordBreak: "break-word",
                                                    maxWidth: "80%",
                                                }}
                                            >
                                                {message.text}
                                            </span>
                                            <p className="text-700 mt-3">
                                                {parseDate(message.createdAt)}
                                                <i className="pi pi-check ml-2 text-green-400"></i>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="p-3 md:p-4 lg:p-6 flex flex-column sm:flex-row align-items-center mt-auto border-top-1 surface-border gap-3">
                    <InputText
                        id="message"
                        type="text"
                        placeholder="Type a message"
                        className="flex-1 w-full sm:w-auto border-round"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        onKeyDown={handleInputTextKeyDown}
                    />
                    <div className="flex w-full sm:w-auto gap-3">
                        <Button
                            className="w-full sm:w-auto justify-content-center text-xl"
                            severity="secondary"
                            onClick={(event) => op.current?.toggle(event)}
                        >
                            😀
                        </Button>
                        <Button
                            label="Send"
                            icon="pi pi-send"
                            className="w-full sm:w-auto"
                            onClick={() => _sendMessage()}
                        ></Button>
                    </div>
                </div>
            </div>

            <OverlayPanel ref={op} className="w-full sm:w-30rem">
                {emojis.map((emoji, i) => {
                    return (
                        <Button
                            key={i}
                            onClick={() => {
                                op.current?.hide();
                                onEmojiSelect(emoji);
                            }}
                            type="button"
                            label={emoji}
                            text
                            className="p-2 text-2xl"
                        ></Button>
                    );
                })}
            </OverlayPanel>
        </React.Fragment>
    );
};

const Chat: Page = () => {
    const { activeUser } = useContext(ChatContext);
    return (
        <div
            className="flex flex-column md:flex-row gap-5"
            style={{ minHeight: "81vh" }}
        >
            <div className="md:w-25rem card p-0">
                <ChatSidebar></ChatSidebar>
            </div>
            <div className="flex-1 card p-0">
                <ChatBox user={activeUser}></ChatBox>
            </div>
        </div>
    );
};

export default Chat;
