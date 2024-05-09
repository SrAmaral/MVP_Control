"use client";
import React, { useState } from "react";

function AboutUs() {
    const [visibleMember, setVisibleMember] = useState<number | null>(null);

    return (
        <>
            <div className="card px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-wrap mb-4">
                    <div className="w-full lg:w-6 pl-0 lg:pr-4">
                        <img
                            src="/demo/images/blocks/about/about-1.png"
                            alt="Image"
                            className="w-full border-round"
                        />
                    </div>
                    <div className="w-full lg:w-6 pr-0 lg:pl-4 mt-3 lg:mt-0">
                        <div className="font-bold text-4xl mb-4 text-900">
                            About us
                        </div>
                        <p className="line-height-3 mt-0 mb-3 p-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        <p className="line-height-3 mt-0 mb-3 p-0">
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Neque porro quisquam est,
                            qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci velit, sed quia non numquam eius modi
                            tempora incidunt ut labore et dolore magnam aliquam
                            quaerat voluptatem.
                        </p>
                        <p className="line-height-3 my-0 p-0">
                            Ut enim ad minima veniam, quis nostrum
                            exercitationem ullam corporis suscipit laboriosam,
                            nisi ut aliquid ex ea commodi consequatur? Quis
                            autem vel eum iure reprehenderit qui in ea voluptate
                            velit esse quam nihil molestiae consequatur, vel
                            illum qui dolorem eum fugiat quo voluptas nulla
                            pariatur?
                        </p>
                    </div>
                </div>
                <div className="mt-3 md:mt-8">
                    <span className="block text-900 font-bold text-3xl mb-3 text-center">
                        Our Team
                    </span>
                    <div className="text-center text-lg line-height-3 mb-6">
                        Faucibus ornare suspendisse sed nisi. Nisl rhoncus
                        mattis rhoncus urna neque viverra justo nec.
                    </div>
                    <div className="grid">
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="relative overflow-hidden"
                                onMouseEnter={() => setVisibleMember(0)}
                                onMouseLeave={() => setVisibleMember(-1)}
                            >
                                <img
                                    src="/demo/images/blocks/team/team-1.png"
                                    className="w-full block"
                                    alt="Team 1"
                                />
                                {visibleMember === 0 && (
                                    <div
                                        className="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                        }}
                                    >
                                        <div className="flex flex-column p-5 h-full">
                                            <span className="block font-medium text-white text-xl mb-3">
                                                Jeff Davies
                                            </span>
                                            <span className="font-medium text-400">
                                                Software Developer
                                            </span>
                                            <div className="mt-auto">
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-twitter text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-github text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-facebook text-600 text-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="relative overflow-hidden"
                                onMouseEnter={() => setVisibleMember(1)}
                                onMouseLeave={() => setVisibleMember(-1)}
                            >
                                <img
                                    src="/demo/images/blocks/team/team-2.png"
                                    className="w-full block"
                                    alt="Team 2"
                                />
                                {visibleMember === 1 && (
                                    <div
                                        className="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                        }}
                                    >
                                        <div className="flex flex-column p-5 h-full">
                                            <span className="block font-medium text-white text-xl mb-3">
                                                Kristin Watson
                                            </span>
                                            <span className="font-medium text-400">
                                                UI/UX Designer
                                            </span>
                                            <div className="mt-auto">
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-twitter text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-github text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-facebook text-600 text-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="relative overflow-hidden"
                                onMouseEnter={() => setVisibleMember(2)}
                                onMouseLeave={() => setVisibleMember(-1)}
                            >
                                <img
                                    src="/demo/images/blocks/team/team-3.png"
                                    className="w-full block"
                                    alt="Team 3"
                                />
                                {visibleMember === 2 && (
                                    <div
                                        className="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                        }}
                                    >
                                        <div className="flex flex-column p-5 h-full">
                                            <span className="block font-medium text-white text-xl mb-3">
                                                Jenna Williams
                                            </span>
                                            <span className="font-medium text-400">
                                                Marketing Specialist
                                            </span>
                                            <div className="mt-auto">
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-twitter text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-github text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-facebook text-600 text-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="relative overflow-hidden"
                                onMouseEnter={() => setVisibleMember(3)}
                                onMouseLeave={() => setVisibleMember(-1)}
                            >
                                <img
                                    src="/demo/images/blocks/team/team-4.png"
                                    className="w-full block"
                                    alt="Team 4"
                                />
                                {visibleMember === 3 && (
                                    <div
                                        className="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.7)",
                                        }}
                                    >
                                        <div className="flex flex-column p-5 h-full">
                                            <span className="block font-medium text-white text-xl mb-3">
                                                Joe Clifford
                                            </span>
                                            <span className="font-medium text-400">
                                                Customer Relations
                                            </span>
                                            <div className="mt-auto">
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-twitter text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-github text-600 text-xl mr-3"></i>
                                                </a>
                                                <a
                                                    tabIndex={0}
                                                    className="cursor-pointer text-white"
                                                >
                                                    <i className="pi pi-facebook text-600 text-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
