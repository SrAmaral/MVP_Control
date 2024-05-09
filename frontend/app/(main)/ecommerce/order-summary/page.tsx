"use client";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import React from "react";

function OrderSummary() {
    const products = [
        {
            name: "Cotton Sweatshirt",
            size: "Medium",
            color: "White",
            price: "$12",
            quantity: "1",
            image: "/demo/images/ecommerce/ordersummary/order-summary-1-1.png",
        },
        {
            name: "Regular Jeans",
            size: "Large",
            color: "Black",
            price: "$24",
            quantity: "1",
            image: "/demo/images/ecommerce/ordersummary/order-summary-1-2.png",
        },
    ];

    return (
        <>
            <div className="card">
                <span className="text-700 text-xl">Thanks!</span>
                <div className="text-900 font-bold text-4xl my-2">
                    Successful Order 🚀
                </div>
                <p className="text-700 text-xl mt-0 mb-4 p-0">
                    Your order is on the way. It&lsquo;ll be shipped today.
                    We&lsquo;ll inform you.
                </p>
                <div
                    style={{
                        height: "3px",
                        background:
                            "linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)",
                    }}
                ></div>

                <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between py-5">
                    <div className="mb-3 sm:mb-0">
                        <span className="font-medium text-xl text-900 mr-2">
                            Order number:
                        </span>
                        <span className="font-medium text-xl text-blue-500">
                            451234
                        </span>
                    </div>
                    <div>
                        <Button
                            label="Details"
                            icon="pi pi-list"
                            className="mr-2"
                            outlined
                        ></Button>
                        <Button
                            label="Print"
                            icon="pi pi-print"
                            outlined
                        ></Button>
                    </div>
                </div>
                <div className="border-round surface-border border-1">
                    <ul className="list-none p-0 m-0">
                        {products.map((product, i) => {
                            return (
                                <li
                                    key={i}
                                    className={classNames(
                                        "p-3 surface-border flex align-items-start sm:align-items-center",
                                        {
                                            "border-bottom-1":
                                                i !== products.length - 1,
                                        }
                                    )}
                                >
                                    <img
                                        src={product.image}
                                        className="w-3rem sm:w-8rem flex-shrink-0 mr-3 shadow-2"
                                        alt={product.name}
                                    />
                                    <div className="flex flex-column">
                                        <span className="text-900 font-semibold text-xl mb-2">
                                            {product.name}
                                        </span>
                                        <span className="text-700 font-medium mb-3">
                                            {product.color} | {product.size}
                                        </span>
                                        <span className="text-900 font-medium">
                                            Quantity: {product.quantity}
                                        </span>
                                    </div>
                                    <span className="text-900 font-medium text-lg ml-auto">
                                        {product.price}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex flex-wrap mt-5 pb-3">
                    <div className="w-full lg:w-6 pl-3">
                        <span className="font-medium text-900">
                            Shipping Address
                        </span>
                        <div className="flex flex-column text-900 mt-3 mb-5">
                            <span className="mb-1">Celeste Slater</span>
                            <span className="mb-1">
                                606-3727 Ullamcorper. Roseville NH 11523
                            </span>
                            <span>(786) 713-8616</span>
                        </div>

                        <span className="font-medium text-900">Payment</span>
                        <div className="flex align-items-center mt-3">
                            <img
                                src="/demo/images/ecommerce/ordersummary/visa.png"
                                className="w-4rem mr-3"
                                alt="visa"
                            />
                            <div className="flex flex-column">
                                <span className="text-900 mb-1">
                                    Visa Debit Card
                                </span>
                                <span className="text-900 font-medium">
                                    **** **** **** 1234
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6 pl-3 lg:pl-0 lg:pr-3 flex align-items-end mt-5 lg:mt-0">
                        <ul className="list-none p-0 m-0 w-full">
                            <li className="mb-3">
                                <span className="font-medium text-900">
                                    Summary
                                </span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Subtotal</span>
                                <span className="text-900 font-medium text-lg">
                                    $36.00
                                </span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Shipping</span>
                                <span className="text-900 font-medium text-lg">
                                    $5.00
                                </span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Tax</span>
                                <span className="text-900 font-medium text-lg">
                                    $4.00
                                </span>
                            </li>
                            <li className="flex justify-content-between border-top-1 surface-border py-3">
                                <span className="text-900 font-medium">
                                    Total
                                </span>
                                <span className="text-900 font-bold text-lg">
                                    $41.00
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
                    <span className="text-2xl font-medium text-900">
                        Thanks for your order!
                    </span>
                    <div className="flex mt-3 sm:mt-0">
                        <div className="flex flex-column align-items-center">
                            <span className="text-900 font-medium mb-2">
                                Order ID
                            </span>
                            <span className="text-700">451234</span>
                        </div>
                        <div className="flex flex-column align-items-center ml-6 md:ml-8">
                            <span className="text-900 font-medium mb-2">
                                Order Date
                            </span>
                            <span className="text-700">7 Feb 2023</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5">
                    <img
                        src="/demo/images/ecommerce/ordersummary/order-summary-2-1.png"
                        className="w-15rem flex-shrink-0 md:mr-6"
                        alt="summary-1-2"
                    />
                    <div className="flex-auto mt-3 md:mt-0">
                        <span className="text-xl text-900">Product Name</span>
                        <div className="font-medium text-2xl text-900 mt-3 mb-5">
                            Order Processing
                        </div>
                        <div
                            className="border-round overflow-hidden surface-300 mb-3"
                            style={{ height: "7px" }}
                        >
                            <div className="bg-primary border-round w-4 h-full"></div>
                        </div>
                        <div className="flex w-full justify-content-between">
                            <span className="text-900 text-xs sm:text-base">
                                Ordered
                            </span>
                            <span className="text-900 font-medium text-xs sm:text-base">
                                Processing
                            </span>
                            <span className="text-500 text-xs sm:text-base">
                                Shipping
                            </span>
                            <span className="text-500 text-xs sm:text-base">
                                Delivered
                            </span>
                        </div>
                    </div>
                </div>
                <div className="py-5 flex justify-content-between flex-wrap">
                    <div className="flex sm:mr-5 mb-5">
                        <span className="font-medium text-900 text-xl mr-8">
                            Product Name
                        </span>
                        <span className="text-900 text-xl">$21.00</span>
                    </div>
                    <div className="flex flex-column sm:mr-5 mb-5">
                        <span className="font-medium text-900 text-xl">
                            Shipping Address
                        </span>
                        <div className="flex flex-column text-900 mt-3">
                            <span className="mb-1">Celeste Slater</span>
                            <span className="mb-1">
                                606-3727 Ullamcorper. Roseville NH 11523
                            </span>
                            <span>(786) 713-8616</span>
                        </div>
                    </div>
                    <div className="flex flex-column">
                        <span className="font-medium text-900 text-xl">
                            Payment
                        </span>
                        <div className="flex align-items-center mt-3">
                            <img
                                src="/demo/images/ecommerce/ordersummary/visa.png"
                                className="w-4rem mr-3"
                                alt="visa-2"
                            />
                            <div className="flex flex-column">
                                <span className="text-900 mb-1">
                                    Visa Debit Card
                                </span>
                                <span className="text-900 font-medium">
                                    **** **** **** 1234
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderSummary;
