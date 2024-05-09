import type { ChatContextProps, Demo } from "@/types";
import React, { useCallback, useState } from "react";

export const ChatContext = React.createContext({} as ChatContextProps);

interface ChatProviderProps {
    children: React.ReactNode;
}

export const ChatProvider = (props: ChatProviderProps) => {
    const [users, setUsers] = useState<Demo.User[]>([]);
    const [activeUser, setActiveUser] = useState<Demo.User>({
        id: 1,
        name: "Ioni Bowcher",
        image: "ionibowcher.png",
        status: "active",
        messages: [
            {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                ownerId: 1,
                createdAt: 1652646338240,
            },
            {
                text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                ownerId: 1,
                createdAt: 1652646368718,
            },
            {
                text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                ownerId: 123,
                createdAt: 1652646368718,
            },
        ],
        lastSeen: "2d",
    });

    const getChatData = useCallback(() => {
        return fetch("/demo/data/chat.json", {
            headers: { "Cache-Control": "no-cache" },
        })
            .then((res) => res.json())
            .then((d) => d.data);
    }, []);

    const changeActiveChat = (user: Demo.User) => {
        setActiveUser(user);
    };

    const sendMessage = (message: Demo.Message) => {
        const _users = [...users];
        _users.map((user) =>
            user.id === activeUser.id ? user.messages.push(message) : null
        );
        setActiveUser((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
        setUsers(_users);
    };

    const value = {
        users,
        setUsers,
        activeUser,
        setActiveUser,
        getChatData,
        changeActiveChat,
        sendMessage,
    };

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
};
