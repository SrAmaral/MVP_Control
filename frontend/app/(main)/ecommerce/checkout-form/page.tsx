"use client";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

function CheckoutForm() {
    const [value, setValue] = useState("");
    const [quantities] = useState([1, 1, 1]);
    const [checked, setChecked] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [selectedCity, setSelectedCity] = useState("");
    const [cities] = useState([
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ]);

    return (
        <div className="card">
            <div className="grid grid-nogutter">
                <div className="col-12 px-4 mt-4 md:mt-6 md:px-6">
                    <span className="text-900 block font-bold text-xl">
                        Checkout
                    </span>
                </div>
                <div className="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
                    <ul className="flex list-none flex-wrap p-0 mb-6">
                        <li className="flex align-items-center text-primary mr-2">
                            Cart{" "}
                            <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
                        </li>
                        <li className="flex align-items-center text-500 mr-2">
                            Information
                            <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
                        </li>
                        <li className="flex align-items-center text-500 mr-2">
                            Shipping
                            <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
                        </li>
                        <li className="flex align-items-center text-500 mr-2">
                            Payment
                        </li>
                    </ul>
                    <div className="grid formgrid">
                        <div className="col-12 field mb-6">
                            <span className="text-900 text-2xl block font-medium mb-5">
                                Contact Information
                            </span>
                            <input
                                id="email"
                                placeholder="Email"
                                type="text"
                                className="p-inputtext w-full mb-4"
                            />
                            <div className="field-checkbox">
                                <Checkbox
                                    name="checkbox-1"
                                    onChange={(e) =>
                                        setChecked(e.checked ?? false)
                                    }
                                    checked={checked}
                                    inputId="checkbox-1"
                                ></Checkbox>
                                <label htmlFor="checkbox-1">
                                    Email me with news and offers
                                </label>
                            </div>
                        </div>
                        <div className="col-12 field mb-4">
                            <span className="text-900 text-2xl block font-medium mb-5">
                                Shipping
                            </span>
                            <Dropdown
                                options={cities}
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.value)}
                                placeholder="Country / Region"
                                optionLabel="name"
                                showClear
                                className="w-full"
                            ></Dropdown>
                        </div>
                        <div className="col-12 lg:col-6 field mb-4">
                            <input
                                id="name"
                                placeholder="Name"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 lg:col-6 field mb-4">
                            <input
                                id="lastname"
                                placeholder="Last Name"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 field mb-4">
                            <input
                                id="address"
                                placeholder="Address"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 field mb-4">
                            <input
                                id="address2"
                                placeholder="Apartment, suite, etc"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 lg:col-6 field mb-4">
                            <input
                                id="pc"
                                placeholder="Postal Code"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 lg:col-6 field mb-4">
                            <input
                                id="city"
                                placeholder="City"
                                type="text"
                                className="p-inputtext w-full"
                            />
                        </div>
                        <div className="col-12 lg:col-6 field mb-4">
                            <div className="field-checkbox">
                                <Checkbox
                                    name="checkbox-2"
                                    onChange={(e) =>
                                        setChecked2(e.checked ?? false)
                                    }
                                    checked={checked2}
                                    inputId="checkbox-2"
                                ></Checkbox>
                                <label htmlFor="checkbox-2">
                                    Save for next purchase
                                </label>
                            </div>
                        </div>
                        <div className="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
                            <Button
                                className="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4"
                                outlined
                                severity="secondary"
                                label="Return to Cart"
                                icon="pi pi-fw pi-arrow-left"
                            ></Button>
                            <Button
                                className="w-full lg:w-auto flex-order-1 lg:flex-order-2"
                                label="Continue to Shipping"
                                icon="pi pi-fw pi-check"
                            ></Button>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 px-4 py-4 md:px-6">
                    <div className="pb-3 surface-border">
                        <span className="text-900 font-medium text-xl">
                            Your Cart
                        </span>
                    </div>
                    <div className="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border">
                        <img
                            src="/demo/images/ecommerce/shop/shop-1.png"
                            className="w-8rem h-8rem flex-shrink-0 mb-3"
                            alt="product"
                        />
                        <div className="flex-auto lg:ml-3">
                            <div className="flex align-items-center justify-content-between mb-3">
                                <span className="text-900 font-bold">
                                    Product Name
                                </span>
                                <span className="text-900 font-bold">
                                    $123.00
                                </span>
                            </div>
                            <div className="text-600 text-sm mb-3">
                                Black | Large
                            </div>
                            <div className="flex flex-auto justify-content-between align-items-center">
                                <InputNumber
                                    showButtons
                                    buttonLayout="horizontal"
                                    min={0}
                                    inputClassName="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                                    value={quantities[0]}
                                    className="border-1 surface-border border-round"
                                    decrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                                    incrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                ></InputNumber>
                                <Button
                                    icon="pi pi-trash"
                                    rounded
                                    text
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 mt-3 surface-border">
                        <div className="p-inputgroup mb-3">
                            <InputText
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Promo code"
                                className="w-full"
                            />
                            <Button
                                type="button"
                                label="Apply"
                                disabled={!value}
                            ></Button>
                        </div>
                    </div>
                    <div className="py-2 mt-3">
                        <div className="flex justify-content-between align-items-center mb-3">
                            <span className="text-900 font-medium">
                                Subtotal
                            </span>
                            <span className="text-900">$123.00</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mb-3">
                            <span className="text-900 font-medium">
                                Shipping
                            </span>
                            <span className="text-primary font-bold">Free</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mb-3">
                            <span className="text-900 font-bold">Total</span>
                            <span className="text-900 font-medium text-xl">
                                $123.00
                            </span>
                        </div>
                    </div>
                    <div className="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
                        <img
                            src="/demo/images/ecommerce/shop/flag.png"
                            className="mr-2"
                            alt="Country Flag"
                        />
                        <span className="text-black-alpha-90 font-medium">
                            No additional duties or taxes.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;
