"use client";
import type { NodeRef, Page } from "@/types";
import Link from "next/link";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { classNames } from "primereact/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";

const LandingPage: Page = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const menuRef = useRef<HTMLElement | null>(null);

    const toggleMenuItemClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    useEffect(() => {
        setDarkMode(
            layoutConfig.colorScheme === "dark" ||
                layoutConfig.colorScheme === "dim"
                ? true
                : false
        );
    }, [layoutConfig.colorScheme]);

    return (
        <div className="relative overflow-hidden flex flex-column justify-content-center">
            <div
                className="bg-circle opacity-50"
                style={{ top: "-200px", left: "-700px" }}
            ></div>
            <div
                className="bg-circle hidden lg:flex"
                style={{
                    top: "50px",
                    right: "-800px",
                    transform: "rotate(60deg)",
                }}
            ></div>
            <div className="landing-wrapper">
                <div className="flex align-items-center justify-content-between relative lg:static py-6 px-4 mx-0 md:px-7 lg:px-8 lg:py-6 lg:mx-8">
                    <Link href="/" className="cursor-pointer">
                        <svg
                            width="124"
                            height="22"
                            viewBox="0 0 124 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M13.84 15.7927L16.2077 21.0016H11.7682L13.84 15.7927Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M9.04645 21.0016L6.67875 15.7927L4.60701 21.0016H9.04645Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M40.9033 14.5217H34.771L33.1753 18.0007H30.8467L37.9346 2.77661L44.772 18.0007H42.4062L40.9033 14.5217ZM40.022 12.49L37.8975 7.61938L35.6709 12.49H40.022Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M52.4927 12.1838V18.0007H50.3311V3.67651H52.7803C53.9802 3.67651 54.8862 3.76001 55.4985 3.927C56.117 4.09399 56.6613 4.40942 57.1314 4.87329C57.954 5.67733 58.3652 6.69165 58.3652 7.91626C58.3652 9.22746 57.9261 10.2665 57.0479 11.0334C56.1696 11.8004 54.9852 12.1838 53.4946 12.1838H52.4927ZM52.4927 10.1799H53.2998C55.2852 10.1799 56.2778 9.4161 56.2778 7.88843C56.2778 6.41024 55.2542 5.67114 53.207 5.67114H52.4927V10.1799Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M63.6367 10.7737C63.6367 8.75741 64.3758 7.02563 65.854 5.57837C67.326 4.1311 69.0949 3.40747 71.1607 3.40747C73.2017 3.40747 74.952 4.13729 76.4116 5.59692C77.8775 7.05656 78.6104 8.80998 78.6104 10.8572C78.6104 12.9167 77.8744 14.664 76.4024 16.0989C74.9242 17.54 73.1398 18.2605 71.0493 18.2605C69.2001 18.2605 67.5394 17.6204 66.0674 16.3401C64.447 14.9237 63.6367 13.0683 63.6367 10.7737ZM65.8169 10.8015C65.8169 12.3848 66.3488 13.6868 67.4126 14.7073C68.4702 15.7278 69.6918 16.238 71.0772 16.238C72.5801 16.238 73.848 15.7185 74.8809 14.6794C75.9138 13.628 76.4302 12.3477 76.4302 10.8386C76.4302 9.31095 75.9199 8.03068 74.8994 6.9978C73.8851 5.95874 72.6296 5.43921 71.1328 5.43921C69.6423 5.43921 68.3836 5.95874 67.357 6.9978C66.3303 8.0245 65.8169 9.2924 65.8169 10.8015Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M87.2495 3.67651V15.969H91.4615V18.0007H85.0879V3.67651H87.2495Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M99.4327 3.67651V15.969H103.645V18.0007H97.271V3.67651H99.4327Z"
                                fill="var(--primary-color)"
                            />
                            <path
                                d="M108.146 10.7737C108.146 8.75741 108.885 7.02563 110.363 5.57837C111.835 4.1311 113.604 3.40747 115.67 3.40747C117.711 3.40747 119.461 4.13729 120.921 5.59692C122.387 7.05656 123.12 8.80998 123.12 10.8572C123.12 12.9167 122.384 14.664 120.912 16.0989C119.433 17.54 117.649 18.2605 115.559 18.2605C113.709 18.2605 112.049 17.6204 110.577 16.3401C108.956 14.9237 108.146 13.0683 108.146 10.7737ZM110.326 10.8015C110.326 12.3848 110.858 13.6868 111.922 14.7073C112.98 15.7278 114.201 16.238 115.586 16.238C117.089 16.238 118.357 15.7185 119.39 14.6794C120.423 13.628 120.94 12.3477 120.94 10.8386C120.94 9.31095 120.429 8.03068 119.409 6.9978C118.394 5.95874 117.139 5.43921 115.642 5.43921C114.152 5.43921 112.893 5.95874 111.866 6.9978C110.84 8.0245 110.326 9.2924 110.326 10.8015Z"
                                fill="var(--primary-color)"
                            />
                        </svg>
                    </Link>

                    <StyleClass
                        nodeRef={menuRef as NodeRef}
                        selector="@next"
                        enterClassName="hidden"
                        leaveToClassName="hidden"
                        hideOnOutsideClick
                    >
                        <i
                            ref={menuRef}
                            className="pi pi-bars text-4xl cursor-pointer block md:hidden text-700"
                        ></i>
                    </StyleClass>

                    <div
                        className={classNames(
                            "align-items-center flex-grow-1 hidden md:flex absolute md:static w-full md:px-0 z-3 shadow-2 md:shadow-none fadein",
                            { hidden: isHidden }
                        )}
                        style={{ top: "80px", right: "0%" }}
                    >
                        <ul className="list-none p-3 md:p-0 m-0 ml-auto flex md:align-items-center select-none flex-column md:flex-row cursor-pointer surface-card md:surface-ground">
                            <li>
                                <a
                                    href="#home"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                                >
                                    <span>Home</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#apps"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                                >
                                    <span>Apps</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#features"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                                >
                                    <span>Features</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#pricing"
                                    onClick={toggleMenuItemClick}
                                    className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3"
                                >
                                    <span>Pricing</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <Button
                                    type="button"
                                    label="Buy Now"
                                    className="m-0 mt-3 md:mt-0 md:ml-5"
                                ></Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 z-2">
                    <div
                        id="home"
                        className="grid grid-nogutter justify-content-between align-items-center mb-6 py-6 md:mb-8 md:py-8"
                    >
                        <div className="col-12 md:col-4 flex flex-column gap-4 flex-order-1 md:flex-order-0 align-items-center md:align-items-start text-center md:text-left">
                            <span className="block text-900 font-bold text-4xl">
                                Modern, stylish and clean
                            </span>
                            <span className="block text-700 text-lg">
                                The ultimate collection of design-agnostic,
                                flexible and accessible UI Components.
                            </span>
                            <ul className="flex flex-wrap gap-5 list-none p-0">
                                <li className="flex align-items-center">
                                    <div className="p-1 border-circle bg-green-400 inline-block mr-2"></div>
                                    <span className="text-900 font-semibold">
                                        Javascript
                                    </span>
                                </li>
                                <li className="flex align-items-center">
                                    <div className="p-1 border-circle bg-green-400 inline-block mr-2"></div>
                                    <span className="text-900 font-semibold">
                                        TypeScript
                                    </span>
                                </li>
                                <li className="flex align-items-center">
                                    <div className="p-1 border-circle bg-green-400 inline-block mr-2"></div>
                                    <span className="text-900 font-semibold">
                                        React
                                    </span>
                                </li>
                            </ul>
                            <Button
                                type="button"
                                label="Live Preview"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                outlined
                                className="w-12rem"
                            ></Button>
                        </div>

                        <div className="col-12 md:col-7 flex-order-0 md:flex-order-1 mb-6 md:mb-0 border-round">
                            <img
                                src={`/demo/images/landing/${
                                    darkMode
                                        ? "dashboard-dark"
                                        : "dashboard-light"
                                }.png`}
                                alt=""
                                className="w-full h-full border-round shadow-2 animation-duration-1000 fadeinright"
                            />
                        </div>
                    </div>

                    <div id="apps" className="my-6 md:my-8">
                        <span className="text-900 block font-bold text-5xl mb-4 text-center">
                            Apps
                        </span>
                        <span className="text-700 block text-xl mb-8 text-center line-height-3">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Velit numquam eligendi quos.
                        </span>

                        <div className="flex flex-column lg:flex-row align-items-center justify-content-between mt-8 gap-8">
                            <div className="flex flex-column align-items-center">
                                <img
                                    src={`/demo/images/landing/${
                                        darkMode ? "chat-dark" : "chat-light"
                                    }.png`}
                                    alt="chat"
                                    className="w-full h-full border-round surface-border shadow-2 animation-duration-500 scalein origin-top"
                                />
                                <span className="block text-900 text-lg font-semibold mt-4">
                                    Chat
                                </span>
                            </div>
                            <div className="flex flex-column align-items-center">
                                <img
                                    src={`/demo/images/landing/${
                                        darkMode ? "mail-dark" : "mail-light"
                                    }.png`}
                                    alt="chat"
                                    className="w-full h-full border-round surface-border shadow-2 animation-duration-500 scalein origin-top"
                                />
                                <span className="block text-900 text-lg font-semibold mt-4">
                                    Mail
                                </span>
                            </div>
                            <div className="flex flex-column align-items-center">
                                <img
                                    src={`/demo/images/landing/${
                                        darkMode
                                            ? "kanban-dark"
                                            : "kanban-light"
                                    }.png`}
                                    alt="chat"
                                    className="w-full h-full border-round surface-border shadow-2 animation-duration-500 scalein origin-top"
                                />
                                <span className="block text-900 text-lg font-semibold mt-4">
                                    Kanban
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="features" className="my-6 py-6 md:my-8 md:py-8">
                        <span className="text-900 block font-bold text-5xl mb-4 text-center">
                            Features
                        </span>
                        <span className="text-700 block text-xl mb-8 text-center line-height-3">
                            PrimeTek Informatics is the author of PrimeReact, a
                            UI Component vendor with well known vastly popular
                            projects including PrimeFaces, PrimeNG and PrimeVue.
                        </span>

                        <div className="grid mt-8">
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-components.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        90+ UI Components
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        The ultimate set of UI Components to
                                        assist you with 90+ impressive React
                                        Components.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-community.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Community
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        Connect with the other open source
                                        community members, collaborate and have
                                        a voice in the project roadmap.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-productivity.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Productivity
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        Boost your productivity by achieving
                                        more in less time and accomplish amazing
                                        results.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-accessibility.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Accessibility
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        The ultimate set of UI Components to
                                        assist you with 90+ impressive React
                                        Components.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-support.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Enterprise Support
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        Exceptional support service featuring
                                        response within 1 business day and
                                        option to request enhancements and new
                                        features for the library.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-mobile.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Mobile
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        First class support for responsive
                                        design led by touch optimized elements.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-theme.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Themes
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        Built on a design-agnostic api, choose
                                        from a vast amount of themes such as
                                        material, bootstrap, custom or develop
                                        your own.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-3 flex justify-content-center p-3">
                                <div className="box p-4 w-full surface-card surface-border border-1 border-round">
                                    <img
                                        src="/demo/images/landing/icon-ts.svg"
                                        alt="components icon"
                                        className="block mb-3"
                                    />
                                    <span className="text-900 block font-semibold mb-3 text-lg">
                                        Typescript
                                    </span>
                                    <p className="m-0 text-secondary text-700">
                                        Top-notch support for Typescript with
                                        types and tooling assistance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pricing" className="my-6 py-6 md:my-8 md:py-8">
                        <div className="text-900 font-bold text-5xl mb-4 text-center">
                            Pricing Plans
                        </div>
                        <div className="text-700 text-xl mb-8 text-center line-height-3">
                            Choose a plan that works best for you and your team.
                        </div>

                        <div className="grid grid-nogutter justify-content-center mt-8">
                            <div className="col-12 lg:col-6 xl:col-4">
                                <div className="p-3 h-full">
                                    <div
                                        className="shadow-2 p-6 h-full flex flex-column surface-card"
                                        style={{ borderRadius: "6px" }}
                                    >
                                        <span className="text-900 block font-medium text-xl mb-2 text-center">
                                            Basic Licence
                                        </span>
                                        <span className="font-bold block text-2xl text-900 text-center">
                                            $29
                                        </span>

                                        <ul className="list-none p-0 m-0 flex-grow-1 mt-6">
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>
                                                    Up to 10 Active Users
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>
                                                    Up to 30 Project
                                                    Integrations
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>Analytics Module</span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-times text-red-500 mr-2"></i>
                                                <span>Finance Module</span>
                                            </li>
                                        </ul>

                                        <Button
                                            label="Choose Plan"
                                            className="px-5 w-full mt-6"
                                            outlined
                                            icon="pi pi-arrow-right"
                                            iconPos="right"
                                        ></Button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 lg:col-6 xl:col-4">
                                <div className="p-3 h-full">
                                    <div
                                        className="shadow-2 p-6 h-full flex flex-column surface-card"
                                        style={{ borderRadius: "6px" }}
                                    >
                                        <span className="text-900 block font-medium text-xl mb-2 text-center">
                                            Extended Licence
                                        </span>
                                        <span className="font-bold block text-2xl text-900 text-center">
                                            $49
                                        </span>

                                        <ul className="list-none p-0 m-0 flex-grow-1 mt-6">
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>
                                                    Up to 10 Active Users
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>
                                                    Up to 30 Project
                                                    Integrations
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check text-green-500 mr-2"></i>
                                                <span>Analytics Module</span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-times text-red-500 mr-2"></i>
                                                <span>Finance Module</span>
                                            </li>
                                        </ul>

                                        <Button
                                            label="Choose Plan"
                                            className="px-5 w-full mt-6"
                                            outlined
                                            icon="pi pi-arrow-right"
                                            iconPos="right"
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid justify-content-between my-6 pt-4 md:my-8">
                        <div className="col-12 md:col-2 text-center md:text-left">
                            <a className="cursor-pointer" href="#">
                                <svg
                                    width="124"
                                    height="22"
                                    viewBox="0 0 124 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M13.84 15.7927L16.2077 21.0016H11.7682L13.84 15.7927Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M9.04645 21.0016L6.67875 15.7927L4.60701 21.0016H9.04645Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M40.9033 14.5217H34.771L33.1753 18.0007H30.8467L37.9346 2.77661L44.772 18.0007H42.4062L40.9033 14.5217ZM40.022 12.49L37.8975 7.61938L35.6709 12.49H40.022Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M52.4927 12.1838V18.0007H50.3311V3.67651H52.7803C53.9802 3.67651 54.8862 3.76001 55.4985 3.927C56.117 4.09399 56.6613 4.40942 57.1314 4.87329C57.954 5.67733 58.3652 6.69165 58.3652 7.91626C58.3652 9.22746 57.9261 10.2665 57.0479 11.0334C56.1696 11.8004 54.9852 12.1838 53.4946 12.1838H52.4927ZM52.4927 10.1799H53.2998C55.2852 10.1799 56.2778 9.4161 56.2778 7.88843C56.2778 6.41024 55.2542 5.67114 53.207 5.67114H52.4927V10.1799Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M63.6367 10.7737C63.6367 8.75741 64.3758 7.02563 65.854 5.57837C67.326 4.1311 69.0949 3.40747 71.1607 3.40747C73.2017 3.40747 74.952 4.13729 76.4116 5.59692C77.8775 7.05656 78.6104 8.80998 78.6104 10.8572C78.6104 12.9167 77.8744 14.664 76.4024 16.0989C74.9242 17.54 73.1398 18.2605 71.0493 18.2605C69.2001 18.2605 67.5394 17.6204 66.0674 16.3401C64.447 14.9237 63.6367 13.0683 63.6367 10.7737ZM65.8169 10.8015C65.8169 12.3848 66.3488 13.6868 67.4126 14.7073C68.4702 15.7278 69.6918 16.238 71.0772 16.238C72.5801 16.238 73.848 15.7185 74.8809 14.6794C75.9138 13.628 76.4302 12.3477 76.4302 10.8386C76.4302 9.31095 75.9199 8.03068 74.8994 6.9978C73.8851 5.95874 72.6296 5.43921 71.1328 5.43921C69.6423 5.43921 68.3836 5.95874 67.357 6.9978C66.3303 8.0245 65.8169 9.2924 65.8169 10.8015Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M87.2495 3.67651V15.969H91.4615V18.0007H85.0879V3.67651H87.2495Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M99.4327 3.67651V15.969H103.645V18.0007H97.271V3.67651H99.4327Z"
                                        fill="var(--primary-color)"
                                    />
                                    <path
                                        d="M108.146 10.7737C108.146 8.75741 108.885 7.02563 110.363 5.57837C111.835 4.1311 113.604 3.40747 115.67 3.40747C117.711 3.40747 119.461 4.13729 120.921 5.59692C122.387 7.05656 123.12 8.80998 123.12 10.8572C123.12 12.9167 122.384 14.664 120.912 16.0989C119.433 17.54 117.649 18.2605 115.559 18.2605C113.709 18.2605 112.049 17.6204 110.577 16.3401C108.956 14.9237 108.146 13.0683 108.146 10.7737ZM110.326 10.8015C110.326 12.3848 110.858 13.6868 111.922 14.7073C112.98 15.7278 114.201 16.238 115.586 16.238C117.089 16.238 118.357 15.7185 119.39 14.6794C120.423 13.628 120.94 12.3477 120.94 10.8386C120.94 9.31095 120.429 8.03068 119.409 6.9978C118.394 5.95874 117.139 5.43921 115.642 5.43921C114.152 5.43921 112.893 5.95874 111.866 6.9978C110.84 8.0245 110.326 9.2924 110.326 10.8015Z"
                                        fill="var(--primary-color)"
                                    />
                                </svg>
                            </a>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">
                                        Company
                                    </h4>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        About Us
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        News
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Investor Relations
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Careers
                                    </a>
                                    <a className="line-height-3 block cursor-pointer text-700">
                                        Media Kit
                                    </a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">
                                        Resources
                                    </h4>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Get Started
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Learn
                                    </a>
                                    <a className="line-height-3 block cursor-pointer text-700">
                                        Case Studies
                                    </a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">
                                        Community
                                    </h4>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Discord
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Events
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        FAQ
                                    </a>
                                    <a className="line-height-3 block cursor-pointer text-700">
                                        Blog
                                    </a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-xl line-height-3 mb-3 text-900">
                                        Legal
                                    </h4>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Brand Policy
                                    </a>
                                    <a className="line-height-3 block cursor-pointer mb-2 text-700">
                                        Privacy Policy
                                    </a>
                                    <a className="line-height-3 block cursor-pointer text-700">
                                        Terms of Service
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
