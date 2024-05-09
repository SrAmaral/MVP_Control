"use client";
import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useState } from "react";

interface Blog {
    coverImage: string;
    profile: string;
    title: string;
    description: string;
    comment: number;
    share: number;
    day: string;
    month: string;
}

const totalBlogs: Blog[] = [
    {
        coverImage: "/demo/images/blog/blog-1.png",
        profile: "/demo/images/avatar/circle/avatar-f-1.png",
        title: "Blog",
        description:
            "Ornare egestas pellentesque facilisis in a ultrices erat diam metus integer sed",
        comment: 2,
        share: 7,
        day: "15",
        month: "October",
    },
    {
        coverImage: "/demo/images/blog/blog-2.png",
        profile: "/demo/images/avatar/circle/avatar-f-2.png",
        title: "Magazine",
        description:
            "Magna iaculis sagittis, amet faucibus scelerisque non ornare non in penatibus ",
        comment: 5,
        share: 1,
        day: "20",
        month: "Nov",
    },
    {
        coverImage: "/demo/images/blog/blog-3.png",
        profile: "/demo/images/avatar/circle/avatar-m-1.png",
        title: "Science",
        description:
            "Purus mattis mi, libero maecenas volutpat quis a morbi arcu pharetra, mollis",
        comment: 2,
        share: 6,
        day: "23",
        month: "Oct",
    },
    {
        coverImage: "/demo/images/blog/blog-4.png",
        profile: "/demo/images/avatar/circle/avatar-m-1.png",
        title: "Blog",
        description:
            "Curabitur vitae sit justo facilisi nec, sodales proin aliquet libero volutpat nunc",
        comment: 5,
        share: 5,
        day: "14",
        month: "Dec",
    },
    {
        coverImage: "/demo/images/blog/blog-5.png",
        profile: "/demo/images/avatar/circle/avatar-f-3.png",
        title: "Magazine",
        description:
            "Id eget arcu suspendisse ullamcorper dolor lobortis dui et morbi penatibus quam",
        comment: 4,
        share: 1,
        day: "05",
        month: "Apr",
    },
    {
        coverImage: "/demo/images/blog/blog-6.png",
        profile: "/demo/images/avatar/circle/avatar-m-3.png",
        title: "Science",
        description:
            "Sagittis hendrerit laoreet dignissim sed auctor sit pellentesque vel diam iaculis et",
        comment: 1,
        share: 3,
        day: "12",
        month: "Nov",
    },
];

function BlogList() {
    const [sortField, setSortField] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(-1);
    const router = useRouter();
    const sortOptions = [
        { label: "Most Shared", value: "share" },
        { label: "Most Commented", value: "comment" },
    ];

    const onSortChange = (event: DropdownChangeEvent) => {
        const value = event.value;
        setSortField(value);
        setSortKey(value);
    };

    const itemTemplate = (blog: Blog) => {
        return (
            <div className="col-12 md:col-4">
                <div className="p-3">
                    <div
                        className="surface-100 cursor-pointer z-index border-round"
                        onClick={() => router.push("/apps/blog/detail")}
                    >
                        <div className="relative">
                            <img
                                src={blog.coverImage}
                                className="w-full"
                                alt={blog.description.split(" ", 1).join(" ")}
                            />
                            <img
                                src={blog.profile}
                                className="flex absolute w-4rem h-4rem"
                                style={{ bottom: "-1.5rem", right: "1.5rem" }}
                                alt={blog.description.split(" ", 1).join(" ")}
                            />
                        </div>
                        <div className="p-3">
                            <div className="text-900 font-semibold text-xl mb-3">
                                {blog.title}
                            </div>
                            <p className="text-700 text-lg mt-0 mb-5">
                                {blog.description}
                            </p>

                            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                                <span className="flex align-items-center text-900">
                                    <i className="pi pi-comment mr-2"></i>
                                    <span className="font-semibold">
                                        {blog.comment}
                                    </span>
                                </span>
                                <span className="flex align-items-center text-900">
                                    <i className="pi pi-share-alt mr-2"></i>
                                    <span className="font-semibold">
                                        {blog.share}
                                    </span>
                                </span>
                                <span className="flex align-items-center text-900">
                                    <i className="pi pi-clock mr-2"></i>
                                    <span className="font-semibold mr-1">
                                        {blog.day}
                                    </span>
                                    <span className="font-semibold">
                                        {blog.month}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const dataViewHeader = (
        <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between gap-3">
            <span className="text-xl text-900 font-semibold">Articles</span>
            <Dropdown
                value={sortKey}
                options={sortOptions}
                optionLabel="label"
                placeholder="Sort By"
                onChange={onSortChange}
                className="w-full md:w-15rem"
            />
        </div>
    );

    return (
        <React.Fragment>
            <div className="card">
                <DataView
                    value={totalBlogs}
                    paginator
                    rows={3}
                    layout={"grid"}
                    sortOrder={sortOrder}
                    sortField={sortField}
                    itemTemplate={itemTemplate}
                    header={dataViewHeader}
                ></DataView>
            </div>

            <div className="card">
                <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div className="font-bold text-5xl text-900 mb-3">
                        Recent Articles
                    </div>
                    <div className="text-700 text-xl line-height-3 mb-5">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div className="grid nogutter">
                        <div className="col-12 lg:col-4 p-4">
                            <div className="border-top-3 border-blue-600"></div>
                            <div className="text-blue-600 font-medium my-2">
                                Animals
                            </div>
                            <div className="text-900 font-medium text-xl line-height-3 mb-4">
                                Why Earth&lsquo;s most beloved creatures are
                                headed toward extinction
                            </div>
                            <div className="font-sm text-700 line-height-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex mt-4">
                                <Avatar
                                    image={`/demo/images/avatar/circle/avatar-f-1.png`}
                                    shape="circle"
                                ></Avatar>
                                <div className="ml-2">
                                    <div className="text-xs font-bold text-900 mb-1">
                                        Anna Miles
                                    </div>
                                    <div className="text-xs flex align-items-center text-700">
                                        <i className="pi pi-calendar mr-1 text-xs"></i>
                                        <span>Apr 9, 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-4 p-4">
                            <div className="border-top-3 border-pink-600"></div>
                            <div className="text-pink-600 font-medium my-2">
                                Oxygen
                            </div>
                            <div className="text-900 font-medium text-xl line-height-3 mb-4">
                                Only one-third of tropical rainforests remain
                                intact, study says{" "}
                            </div>
                            <div className="font-sm text-700 line-height-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex mt-4">
                                <Avatar
                                    image={`/demo/images/avatar/circle/avatar-f-2.png`}
                                    shape="circle"
                                ></Avatar>
                                <div className="ml-2">
                                    <div className="text-xs font-bold text-900 mb-1">
                                        Arlene Miles
                                    </div>
                                    <div className="text-xs flex align-items-center text-700">
                                        <i className="pi pi-calendar mr-1 text-xs"></i>
                                        <span>Apr 9, 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-4 p-4">
                            <div className="border-top-3 border-orange-600"></div>
                            <div className="text-orange-600 font-medium my-2">
                                Nature
                            </div>
                            <div className="text-900 font-medium text-xl line-height-3 mb-4">
                                Does planting a tree really offset your carbon
                                footprint?
                            </div>
                            <div className="font-sm text-700 line-height-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div className="flex mt-4">
                                <Avatar
                                    image={`/demo/images/avatar/circle/avatar-f-3.png`}
                                    shape="circle"
                                ></Avatar>
                                <div className="ml-2">
                                    <div className="text-xs font-bold text-900 mb-1">
                                        Diane Miles
                                    </div>
                                    <div className="text-xs flex align-items-center text-700">
                                        <i className="pi pi-calendar mr-1 text-xs"></i>
                                        <span>Apr 9, 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BlogList;
