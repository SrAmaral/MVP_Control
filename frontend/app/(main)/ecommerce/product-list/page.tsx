"use client";
import { Button } from "primereact/button";
import React, { useState } from "react";

function ProductList() {
    const [products] = useState([
        {
            price: "$140.00",
            image: "demo/images/ecommerce/product-list/product-list-4-1.png",
        },
        {
            price: "$82.00",
            image: "demo/images/ecommerce/product-list/product-list-4-2.png",
        },
        {
            price: "$54.00",
            image: "demo/images/ecommerce/product-list/product-list-4-3.png",
        },
        {
            price: "$72.00",
            image: "demo/images/ecommerce/product-list/product-list-4-4.png",
        },
        {
            price: "$99.00",
            image: "demo/images/ecommerce/product-list/product-list-4-5.png",
        },
        {
            price: "$89.00",
            image: "demo/images/ecommerce/product-list/product-list-4-6.png",
        },
    ]);

    const [products2, setProducts2] = useState([
        {
            color: "Bluegray",
            image: "demo/images/ecommerce/product-list/product-list-2-1.png",
        },
        {
            color: "Indigo",
            image: "demo/images/ecommerce/product-list/product-list-2-2.png",
        },
        {
            color: "Green",
            image: "demo/images/ecommerce/product-list/product-list-2-3.png",
        },
        {
            color: "Blue",
            image: "demo/images/ecommerce/product-list/product-list-2-4.png",
        },
    ]);

    const onColorChange = (color: string, productIndex: number) => {
        const _products2 = [...products2];
        _products2[productIndex]["color"] = color;
        setProducts2(_products2);
    };

    return (
        <>
            <div className="card">
                <div className="text-900 font-medium text-4xl mb-4">
                    Popular Products
                </div>
                <p className="mt-0 p-0 mb-5 text-700 text-2xl">
                    Exclusive Selection
                </p>
                <div className="grid -mt-3 -ml-3 -mr-3">
                    {products.map((product, i) => {
                        return (
                            <div key={i} className="col-12 md:col-6 lg:col-4">
                                <div className="p-2">
                                    <div className="shadow-2 p-4 surface-card border-round">
                                        <div className="relative mb-3">
                                            <span
                                                className="surface-card text-900 shadow-2 px-3 py-2 absolute"
                                                style={{
                                                    borderRadius: "1.5rem",
                                                    left: "1rem",
                                                    top: "1rem",
                                                }}
                                            >
                                                Category
                                            </span>
                                            <img
                                                src={"/" + product.image}
                                                className="w-full"
                                                alt={i.toString()}
                                            />
                                        </div>
                                        <div className="flex justify-content-between align-items-center mb-3">
                                            <span className="text-900 font-medium text-xl">
                                                Product Name
                                            </span>
                                            <span>
                                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                                <span className="font-medium">
                                                    5.0
                                                </span>
                                            </span>
                                        </div>
                                        <p className="mt-0 mb-3 text-700 line-height-3">
                                            Enim nec dui nunc mattis enim ut
                                            tellus. Tincidunt arcu.
                                        </p>
                                        <span className="text-primary text-xl font-medium">
                                            {product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="card">
                <div className="grid -mt-3 -ml-3 -mr-3">
                    {products2.map((product, i) => {
                        return (
                            <div
                                key={i}
                                className="col-12 md:col-6 lg:col-3 mb-5 lg:mb-0"
                            >
                                <div className="mb-3 relative">
                                    <img
                                        src={"/" + product.image}
                                        className="w-full"
                                        alt={i.toString()}
                                    />
                                    <Button
                                        type="button"
                                        className="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-black-alpha-40 transition-colors transition-duration-300 cursor-pointer"
                                        style={{
                                            bottom: "1rem",
                                            left: "1rem",
                                            width: "calc(100% - 2rem)",
                                        }}
                                    >
                                        <i className="pi pi-shopping-cart mr-3 text-base"></i>
                                        <span className="text-base">
                                            Add to Cart
                                        </span>
                                    </Button>
                                </div>
                                <div className="flex flex-column align-items-center">
                                    <span className="text-xl text-900 font-medium mb-3">
                                        Product Name
                                    </span>
                                    <span className="text-xl text-900 mb-3">
                                        $150.00
                                    </span>
                                    <div className="flex align-items-center mb-3">
                                        <div
                                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-bluegray-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                                            style={{
                                                width: "1.2rem",
                                                height: "1.2rem",
                                                boxShadow:
                                                    product.color === "Bluegray"
                                                        ? "0 0 0 0.2rem var(--bluegray-500)"
                                                        : undefined,
                                            }}
                                            onClick={() =>
                                                onColorChange("Bluegray", i)
                                            }
                                        ></div>
                                        <div
                                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-indigo-500 hover:border-indigo-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                                            style={{
                                                width: "1.2rem",
                                                height: "1.2rem",
                                                boxShadow:
                                                    product.color === "Indigo"
                                                        ? "0 0 0 0.2rem var(--indigo-500)"
                                                        : undefined,
                                            }}
                                            onClick={() =>
                                                onColorChange("Indigo", i)
                                            }
                                        ></div>
                                        <div
                                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-purple-500 hover:border-purple-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                                            style={{
                                                width: "1.2rem",
                                                height: "1.2rem",
                                                boxShadow:
                                                    product.color === "Green"
                                                        ? "0 0 0 0.2rem var(--purple-500)"
                                                        : undefined,
                                            }}
                                            onClick={() =>
                                                onColorChange("Green", i)
                                            }
                                        ></div>
                                        <div
                                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-cyan-500 hover:border-cyan-500 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                                            style={{
                                                width: "1.2rem",
                                                height: "1.2rem",
                                                boxShadow:
                                                    product.color === "Blue"
                                                        ? "0 0 0 0.2rem var(--cyan-500)"
                                                        : undefined,
                                            }}
                                            onClick={() =>
                                                onColorChange("Blue", i)
                                            }
                                        ></div>
                                    </div>
                                    <span className="text-700">
                                        {product.color}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ProductList;
