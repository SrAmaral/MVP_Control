"use client";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

function ShoppingCart() {
    const quantityOptions = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
    ];
    const [selectedQuantity, setselectedQuantity] = useState(1);
    const [selectedQuantity2, setselectedQuantity2] = useState(1);

    return (
        <div className="card">
            <div className="flex flex-column align-items-center mb-6">
                <div className="text-900 text-4xl mb-4 font-medium">
                    Your cart total is $82.00
                </div>
                <p className="text-700 font-medium text-xl mt-0 mb-4">
                    FREE SHIPPING AND RETURN
                </p>
                <Button label="Check Out" />
            </div>
            <ul className="list-none p-0 m-0">
                <li className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border md:align-items-center">
                    <img
                        src="/demo/images/ecommerce/shopping-cart/shopping-cart-2-1.png"
                        className="w-12rem flex-shrink-0 mx-auto md:mx-0"
                        alt="shopping-cart-2-1"
                    />
                    <div className="flex-auto py-5 md:pl-5">
                        <div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                            <div className="w-full sm:w-6 flex flex-column">
                                <span className="text-900 text-xl font-medium mb-3">
                                    Product Name
                                </span>
                                <span className="text-700">Medium</span>
                            </div>
                            <div className="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
                                <div>
                                    <Dropdown
                                        options={quantityOptions}
                                        value={selectedQuantity}
                                        onChange={(e) =>
                                            setselectedQuantity(e.value)
                                        }
                                    ></Dropdown>
                                </div>
                                <div className="flex flex-column sm:align-items-end">
                                    <span className="text-900 text-xl font-medium mb-2 sm:mb-3">
                                        $20.00
                                    </span>
                                    <a
                                        className="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                                        tabIndex={0}
                                    >
                                        Remove
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-column">
                            <span className="inline-flex align-items-center mb-3">
                                <i className="pi pi-envelope text-700 mr-2"></i>
                                <span className="text-700 mr-2">
                                    Order today.
                                </span>
                            </span>
                            <span className="inline-flex align-items-center mb-3">
                                <i className="pi pi-send text-700 mr-2"></i>
                                <span className="text-700 mr-2">
                                    Delivery by{" "}
                                    <span className="font-bold">Dec 23.</span>
                                </span>
                            </span>
                            <span className="flex align-items-center">
                                <i className="pi pi-exclamation-triangle text-700 mr-2"></i>
                                <span className="text-700">
                                    Only 8 Available.
                                </span>
                            </span>
                        </div>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border md:align-items-center">
                    <img
                        src="/demo/images/ecommerce/shopping-cart/shopping-cart-2-2.png"
                        className="w-12rem flex-shrink-0 mx-auto md:mx-0"
                        alt="shopping-cart-2-2"
                    />
                    <div className="flex-auto py-5 md:pl-5">
                        <div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                            <div className="w-full sm:w-6 flex flex-column">
                                <span className="text-900 text-xl font-medium mb-3">
                                    Product Name
                                </span>
                                <span className="text-700">Medium</span>
                            </div>
                            <div className="w-full sm:w-6 flex align-items-start justify-content-between mt-3 sm:mt-0">
                                <div>
                                    <Dropdown
                                        options={quantityOptions}
                                        value={selectedQuantity2}
                                        onChange={(e) =>
                                            setselectedQuantity2(e.value)
                                        }
                                    ></Dropdown>
                                </div>
                                <div className="flex flex-column sm:align-items-end">
                                    <span className="text-900 text-xl font-medium mb-2 sm:mb-3">
                                        $62.00
                                    </span>
                                    <a
                                        className="cursor-pointer text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors transition-duration-300"
                                        tabIndex={0}
                                    >
                                        Remove
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-column">
                            <span className="inline-flex align-items-center mb-3">
                                <i className="pi pi-envelope text-700 mr-2"></i>
                                <span className="text-700 mr-2">
                                    Order today.
                                </span>
                            </span>
                            <span className="inline-flex align-items-center mb-3">
                                <i className="pi pi-send text-700 mr-2"></i>
                                <span className="text-700 mr-2">
                                    Delivery by{" "}
                                    <span className="font-bold">Dec 23.</span>
                                </span>
                            </span>
                            <span className="flex align-items-center">
                                <i className="pi pi-exclamation-triangle text-700 mr-2"></i>
                                <span className="text-700">
                                    Only 2 Available.
                                </span>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="flex">
                <div className="w-12rem hidden md:block"></div>
                <ul className="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
                    <li className="flex justify-content-between mb-4">
                        <span className="text-xl text-900 font-semibold">
                            Subtotal
                        </span>
                        <span className="text-xl text-900">$82.00</span>
                    </li>
                    <li className="flex justify-content-between mb-4">
                        <span className="text-xl text-900 font-semibold">
                            Shipping
                        </span>
                        <span className="text-xl text-900">Free</span>
                    </li>
                    <li className="flex justify-content-between mb-4">
                        <span className="text-xl text-900 font-semibold">
                            VAT
                        </span>
                        <span className="text-xl text-900">$8.00</span>
                    </li>
                    <li className="flex justify-content-between border-top-1 surface-border mb-4 pt-4">
                        <span className="text-xl text-900 font-bold text-3xl">
                            Total
                        </span>
                        <span className="text-xl text-900 font-bold text-3xl">
                            $90.00
                        </span>
                    </li>
                    <li className="flex justify-content-end">
                        <Button label="Check Out"></Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ShoppingCart;
