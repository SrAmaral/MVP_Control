import type { MenuContextProps } from "@/types";
import React, { createContext, useState } from "react";

export const MenuContext = createContext({} as MenuContextProps);

interface MenuProviderProps {
    children: React.ReactNode;
}

export const MenuProvider = (props: MenuProviderProps) => {
    const [activeMenu, setActiveMenu] = useState("");

    const value = {
        activeMenu,
        setActiveMenu,
    };

    return (
        <MenuContext.Provider value={value}>
            {props.children}
        </MenuContext.Provider>
    );
};
