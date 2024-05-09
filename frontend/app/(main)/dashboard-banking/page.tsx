"use client";
import type { Demo } from "@/types";
import { ChartData, ChartOptions } from "chart.js";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";

const Banking = () => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const [price, setPrice] = useState(0);
    const { layoutConfig } = useContext(LayoutContext);
    const dt = useRef<DataTable<Demo.Payment[]>>(null);

    const payments: Demo.Payment[] = [
        { name: "Electric Bill", amount: 75.6, paid: true, date: "06/04/2022" },
        { name: "Water Bill", amount: 45.5, paid: true, date: "07/04/2022" },
        { name: "Gas Bill", amount: 45.2, paid: false, date: "12/04/2022" },
        { name: "Internet Bill", amount: 25.9, paid: true, date: "17/04/2022" },
        { name: "Streaming", amount: 40.9, paid: false, date: "20/04/2022" },
    ];

    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const initChart = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
            "--text-color-secondary"
        );
        const surfaceBorder =
            documentStyle.getPropertyValue("--surface-border");

        const data: ChartData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "Income",
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue("--green-500"),
                },
                {
                    label: "Expenses",
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                    fill: true,
                    borderColor: "#6366f1",
                    tension: 0.4,
                    backgroundColor: "rgba(99,102,220,0.2)",
                },
            ],
        };

        const options: ChartOptions = {
            animation: {
                duration: 0,
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || "";

                            if (label) {
                                label += ": ";
                            }

                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    };

    useEffect(() => {
        initChart();
    }, [layoutConfig]);

    const nameBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const amountBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.amount)}
            </>
        );
    };

    const dateBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.date}
            </>
        );
    };

    const statusBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                {rowData.paid ? (
                    <Tag value="COMPLETED" severity="success"></Tag>
                ) : (
                    <Tag value="PENDING" severity="warning"></Tag>
                )}
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="flex flex-column sm:flex-row align-items-center gap-4">
                    <div className="flex flex-column sm:flex-row align-items-center gap-3">
                        <img
                            alt="avatar"
                            src={`/demo/images/avatar/circle/avatar-f-1.png`}
                            className="w-4rem h-4rem flex-shrink-0"
                        />
                        <div className="flex flex-column align-items-center sm:align-items-start">
                            <span className="text-900 font-bold text-4xl">
                                Welcome Isabel
                            </span>
                            <p className="text-600 m-0">
                                Your last login was on 04/05/2022 at 10:24 am
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:ml-auto">
                        <Button
                            type="button"
                            tooltip="Exchange"
                            tooltipOptions={{ position: "bottom" }}
                            icon="pi pi-arrows-h"
                            outlined
                            rounded
                        ></Button>
                        <Button
                            type="button"
                            tooltip="Withdraw"
                            tooltipOptions={{ position: "bottom" }}
                            icon="pi pi-download"
                            outlined
                            rounded
                        ></Button>
                        <Button
                            type="button"
                            tooltip="Send"
                            tooltipOptions={{ position: "bottom" }}
                            icon="pi pi-send"
                            rounded
                        ></Button>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-4">
                <div className="card h-full relative overflow-hidden">
                    <svg
                        id="visual"
                        viewBox="0 0 900 600"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        className="absolute left-0 top-0 h-full w-full z-1"
                        preserveAspectRatio="none"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="900"
                            height="600"
                            fill="var(--primary-600)"
                        ></rect>
                        <path
                            d="M0 400L30 386.5C60 373 120 346 180 334.8C240 323.7 300 328.3 360 345.2C420 362 480 391 540 392C600 393 660 366 720 355.2C780 344.3 840 349.7 870 352.3L900 355L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
                            fill="var(--primary-500)"
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                        ></path>
                    </svg>
                    <div className="z-2 relative text-white">
                        <div className="text-xl font-semibold mb-3">
                            Debit Card
                        </div>
                        <div className="mb-1 font-semibold">Balance</div>
                        <div className="text-2xl mb-5 font-bold">$2.000,00</div>
                        <div className="flex align-items-center justify-content-between">
                            <span className="text-lg">**** **** **** 1412</span>
                            <span className="font-medium text-lg">12/26</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-4">
                <div className="card h-full">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <div className="text-900 text-xl font-semibold">
                            Credit Card
                        </div>
                        <img
                            alt="avatar"
                            src={`/demo/images/banking/visa.svg`}
                            className="h-1rem"
                        />
                    </div>
                    <div className="text-600 mb-1 font-semibold">Debt</div>
                    <div className="text-900 text-2xl text-primary mb-5 font-bold">
                        $1.500,00
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-900 text-lg">
                            **** **** **** 1231
                        </span>
                        <span className="text-600 font-medium text-lg">
                            12/24
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-2">
                <div className="card h-full flex flex-column align-items-center justify-content-center">
                    <i className="pi pi-dollar text-primary text-4xl mb-4"></i>
                    <span className="text-900 text-lg mb-4 font-medium">
                        Primary
                    </span>
                    <span className="text-900 text-2xl text-primary font-bold">
                        $24,345.21
                    </span>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-2">
                <div className="card h-full flex flex-column align-items-center justify-content-center">
                    <i className="pi pi-euro text-primary text-4xl mb-4"></i>
                    <span className="text-900 text-lg mb-4 font-medium">
                        Currency
                    </span>
                    <span className="text-900 text-2xl text-primary font-bold">
                        $10,416.11
                    </span>
                </div>
            </div>

            <div className="col-12 xl:col-4">
                <div className="card">
                    <div className="text-900 text-xl font-semibold mb-3">
                        Recent Transactions
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                            <img
                                alt="brands"
                                src={`/demo/images/banking/airbnb.png`}
                                className="w-3rem flex-shrink-0 mr-3"
                            />
                            <div className="flex flex-column">
                                <span className="text-xl font-medium text-900 mb-1">
                                    Airbnb
                                </span>
                                <span>05/23/2022</span>
                            </div>
                            <span className="text-xl text-900 ml-auto font-semibold">
                                $250.00
                            </span>
                        </li>
                        <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                            <img
                                alt="brands"
                                src={`/demo/images/banking/amazon.png`}
                                className="w-3rem flex-shrink-0 mr-3"
                            />
                            <div className="flex flex-column">
                                <span className="text-xl font-medium text-900 mb-1">
                                    Amazon
                                </span>
                                <span>04/12/2022</span>
                            </div>
                            <span className="text-xl text-900 ml-auto font-semibold">
                                $50.00
                            </span>
                        </li>
                        <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                            <img
                                alt="brands"
                                src={`/demo/images/banking/nike.svg`}
                                className="w-3rem flex-shrink-0 mr-3 border-circle"
                            />
                            <div className="flex flex-column">
                                <span className="text-xl font-medium text-900 mb-1">
                                    Nike Store
                                </span>
                                <span>04/29/2022</span>
                            </div>
                            <span className="text-xl text-900 ml-auto font-semibold">
                                $60.00
                            </span>
                        </li>
                        <li className="flex align-items-center p-3 mb-3 border-bottom-1 surface-border">
                            <img
                                alt="brands"
                                src={`/demo/images/banking/starbucks.svg`}
                                className="w-3rem flex-shrink-0 mr-3"
                            />
                            <div className="flex flex-column">
                                <span className="text-xl font-medium text-900 mb-1">
                                    Starbucks
                                </span>
                                <span>04/15/2022</span>
                            </div>
                            <span className="text-xl text-900 ml-auto font-semibold">
                                $15.24
                            </span>
                        </li>
                        <li className="flex align-items-center p-3 mb-3">
                            <img
                                alt="brands"
                                src={`/demo/images/banking/amazon.png`}
                                className="w-3rem flex-shrink-0 mr-3"
                            />
                            <div className="flex flex-column">
                                <span className="text-xl font-medium text-900 mb-1">
                                    Amazon
                                </span>
                                <span>04/12/2022</span>
                            </div>
                            <span className="text-xl text-900 ml-auto font-semibold">
                                $12.50
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-12 xl:col-8">
                <div className="card">
                    <div className="text-900 text-xl font-semibold mb-3">
                        Overview
                    </div>
                    <Chart
                        type="line"
                        data={chartData}
                        options={chartOptions}
                    ></Chart>
                </div>
            </div>

            <div className="col-12 lg:col-6">
                <div className="card h-full">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <div className="text-900 text-xl font-semibold">
                            Recent Transactions
                        </div>
                        <Button
                            type="button"
                            icon="pi pi-plus"
                            label="Add New"
                            outlined
                            size="small"
                        ></Button>
                    </div>
                    <div className="flex flex-column row-gap-3">
                        <div className="flex flex-column lg:flex-row gap-3">
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer border-radius">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-f-1.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Aisha Williams
                                </span>
                            </div>
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer border-radius">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-f-2.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Jane Watson
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-column lg:flex-row gap-3">
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer border-radius">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-m-1.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Brad Curry
                                </span>
                            </div>
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer border-radius">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-f-3.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Claire Dunphy
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-column lg:flex-row gap-3">
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer border-radius">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-m-2.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Kevin James
                                </span>
                            </div>
                            <div className="w-full lg:w-6 p-3 border-1 border-round surface-border flex align-items-center hover:surface-100 cursor-pointer">
                                <img
                                    alt="avatar"
                                    src={`/demo/images/avatar/circle/avatar-f-4.png`}
                                    className="w-2rem flex-shrink-0 mr-2"
                                />
                                <span className="text-900 text-lg font-medium">
                                    Sarah McTamish
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-column sm:flex-row gap-3 mt-5">
                        <div className="flex-1 p-fluid">
                            <InputNumber
                                type="text"
                                value={price}
                                onValueChange={(e) => setPrice(e.value ?? 0)}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                            ></InputNumber>
                        </div>
                        <Button type="button" label="Send"></Button>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-6">
                <div className="card">
                    <div className="text-900 text-xl font-semibold mb-3">
                        Monthly Payments
                    </div>

                    <DataTable
                        ref={dt}
                        value={payments}
                        rows={5}
                        className="datatable-responsive"
                        emptyMessage="No products found."
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="name"
                            header="Name"
                            body={nameBodyTemplate}
                            headerClassName="white-space-nowrap w-4"
                        ></Column>
                        <Column
                            field="price"
                            header="Price"
                            body={amountBodyTemplate}
                            headerClassName="white-space-nowrap w-4"
                        ></Column>
                        <Column
                            field="date"
                            header="Date"
                            body={dateBodyTemplate}
                            headerClassName="white-space-nowrap w-4"
                        ></Column>
                        <Column
                            field="inventoryStatus"
                            header="Status"
                            body={statusBodyTemplate}
                            bodyClassName="text-right"
                            headerClassName="white-space-nowrap w-4"
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Banking;
