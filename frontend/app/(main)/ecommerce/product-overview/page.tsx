"use client";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import React, { useEffect, useState } from "react";

function ProductOverview() {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("bluegray");
    const [size, setSize] = useState("M");

    useEffect(() => {
        setImages([
            "product-overview-3-1.png",
            "product-overview-3-2.png",
            "product-overview-3-3.png",
            "product-overview-3-4.png",
        ]);
    }, [selectedImageIndex]);

    return (
        <div className="card">
            <div className="grid mb-7">
                <div className="col-12 lg:col-7">
                    <div className="flex">
                        <div
                            className="flex flex-column w-2 justify-content-between"
                            style={{ rowGap: "1rem" }}
                        >
                            {images.map((image, i) => {
                                return (
                                    <img
                                        alt={i.toString()}
                                        key={i}
                                        src={`/demo/images/ecommerce/productoverview/${image}`}
                                        className={classNames(
                                            "w-full cursor-pointer border-2 border-transparent transition-colors transition-duration-150 border-round",
                                            {
                                                "border-primary":
                                                    selectedImageIndex === i,
                                            }
                                        )}
                                        onClick={() => setSelectedImageIndex(i)}
                                    />
                                );
                            })}
                        </div>
                        <div className="pl-3 w-10 flex">
                            <img
                                alt={images[selectedImageIndex]}
                                src={`/demo/images/ecommerce/productoverview/${images[selectedImageIndex]}`}
                                className="w-full border-2 border-transparent border-round"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-4 py-3 lg:pl-6">
                    <div className="flex align-items-center text-xl font-medium text-900 mb-4">
                        Product Title Placeholder
                    </div>
                    <div className="flex align-items-center justify-content-between mb-5">
                        <span className="text-900 font-medium text-3xl block">
                            $120
                        </span>
                        <div className="flex align-items-center">
                            <span className="mr-3">
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star text-600 mr-1"></i>
                            </span>
                            <span className="text-sm">
                                <b className="text-900 mr-1">24</b>{" "}
                                <span className="text-500"></span>reviews
                            </span>
                        </div>
                    </div>

                    <div className="font-bold text-900 mb-3">Color</div>
                    <div className="flex align-items-center mb-5">
                        <div
                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-bluegray-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            style={{
                                boxShadow:
                                    color === "bluegray"
                                        ? "0 0 0 0.2rem var(--bluegray-500)"
                                        : undefined,
                            }}
                            onClick={() => setColor("bluegray")}
                        ></div>
                        <div
                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-green-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            style={{
                                boxShadow:
                                    color === "green"
                                        ? "0 0 0 0.2rem var(--green-500)"
                                        : undefined,
                            }}
                            onClick={() => setColor("green")}
                        ></div>
                        <div
                            className="w-2rem h-2rem flex-shrink-0 border-circle bg-blue-500 cursor-pointer border-2 surface-border transition-all transition-duration-300"
                            style={{
                                boxShadow:
                                    color === "blue"
                                        ? "0 0 0 0.2rem var(--blue-500)"
                                        : undefined,
                            }}
                            onClick={() => setColor("blue")}
                        ></div>
                    </div>

                    <div className="mb-3 flex align-items-center justify-content-between">
                        <span className="font-bold text-900">Size</span>
                        <a
                            tabIndex={0}
                            className="cursor-pointer text-600 text-sm flex align-items-center"
                        >
                            Size Guide{" "}
                            <i className="ml-1 pi pi-angle-right"></i>
                        </a>
                    </div>
                    <div className="grid grid-nogutter align-items-center mb-5">
                        <div
                            className={classNames(
                                "col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors",
                                {
                                    "border-primary border-2 text-primary":
                                        size === "XS",
                                }
                            )}
                            onClick={() => setSize("XS")}
                        >
                            XS
                        </div>
                        <div
                            className={classNames(
                                "col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors",
                                {
                                    "border-primary border-2 text-primary":
                                        size === "S",
                                }
                            )}
                            onClick={() => setSize("S")}
                        >
                            S
                        </div>
                        <div
                            className={classNames(
                                "col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors",
                                {
                                    "border-primary border-2 text-primary":
                                        size === "M",
                                }
                            )}
                            onClick={() => setSize("M")}
                        >
                            M
                        </div>
                        <div
                            className={classNames(
                                "col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors",
                                {
                                    "border-primary border-2 text-primary":
                                        size === "L",
                                }
                            )}
                            onClick={() => setSize("L")}
                        >
                            L
                        </div>
                        <div
                            className={classNames(
                                "col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round cursor-pointer hover:surface-100 transition-duration-150 transition-colors",
                                {
                                    "border-primary border-2 text-primary":
                                        size === "XL",
                                }
                            )}
                            onClick={() => setSize("XL")}
                        >
                            XL
                        </div>
                    </div>

                    <div className="font-bold text-900 mb-3">Quantity</div>
                    <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
                        <InputNumber
                            showButtons
                            buttonLayout="horizontal"
                            min={0}
                            inputClassName="w-3rem text-center"
                            value={quantity}
                            onChange={(e) => setQuantity(e.value ?? 0)}
                            decrementButtonClassName="p-button-text"
                            incrementButtonClassName="p-button-text"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                        ></InputNumber>
                        <div className="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 sm:ml-5">
                            <Button
                                label="Add to Cart"
                                className="flex-1 mr-5"
                            ></Button>
                            <i
                                className={classNames(
                                    "pi text-2xl cursor-pointer",
                                    {
                                        "pi-heart text-600": !liked,
                                        "pi-heart-fill text-orange-500": liked,
                                    }
                                )}
                                onClick={() => setLiked(!liked)}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>

            <TabView>
                <TabPanel header="Details">
                    <div className="text-900 font-bold text-3xl mb-4 mt-2">
                        Product Details
                    </div>
                    <p className="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
                        Volutpat maecenas volutpat blandit aliquam etiam erat
                        velit scelerisque in. Duis ultricies lacus sed turpis
                        tincidunt id. Sed tempus urna et pharetra. Metus
                        vulputate eu scelerisque felis imperdiet proin
                        fermentum. Venenatis urna cursus eget nunc scelerisque
                        viverra mauris in. Viverra justo nec ultrices dui sapien
                        eget mi proin. Laoreet suspendisse interdum consectetur
                        libero id faucibus.
                    </p>

                    <div className="grid">
                        <div className="col-12 lg:col-4">
                            <span className="text-900 block font-medium mb-3 font-bold">
                                Highlights
                            </span>
                            <ul className="py-0 pl-3 m-0 text-600 mb-3">
                                <li className="mb-2">Vulputate sapien nec.</li>
                                <li className="mb-2">
                                    Purus gravida quis blandit.
                                </li>
                                <li className="mb-2">
                                    Nisi quis eleifend quam adipiscing.
                                </li>
                                <li>Imperdiet proin fermentum.</li>
                            </ul>
                        </div>
                        <div className="col-12 lg:col-4">
                            <span className="text-900 block mb-3 font-bold">
                                Size and Fit
                            </span>
                            <ul className="list-none p-0 m-0 text-600 mb-4 text-600">
                                <li className="mb-3">
                                    <span className="font-semibold">
                                        Leo vel:
                                    </span>{" "}
                                    Egestas congue.
                                </li>
                                <li className="mb-3">
                                    <span className="font-semibold">
                                        Sociis natoque:
                                    </span>{" "}
                                    Parturient montes nascetur.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Suspendisse in:
                                    </span>{" "}
                                    Purus sit amet volutpat.
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 lg:col-4">
                            <span className="text-900 block mb-3 font-bold">
                                Material & Care
                            </span>
                            <ul className="p-0 m-0 flex flex-wrap flex-column xl:flex-row text-600">
                                <li className="flex align-items-center white-space-nowrap w-10rem block mr-2 mb-3">
                                    <i className="pi pi-sun mr-2 text-900"></i>
                                    <span>Not dryer safe</span>
                                </li>
                                <li className="flex align-items-center white-space-nowrap w-10rem block mb-3">
                                    <i className="pi pi-times-circle mr-2 text-900"></i>
                                    <span>No chemical wash</span>
                                </li>
                                <li className="flex align-items-center white-space-nowrap w-10rem block mb-3 mr-2">
                                    <i className="pi pi-sliders-h mr-2 text-900"></i>
                                    <span>Iron medium heat</span>
                                </li>
                                <li className="flex align-items-center white-space-nowrap w-10rem block mb-3">
                                    <i className="pi pi-minus-circle mr-2 text-900"></i>
                                    <span>Dry flat</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Reviews">
                    <div className="text-900 font-bold text-3xl mb-4 mt-2">
                        Customer Reviews
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="pb-5 border-bottom-1 surface-border">
                            <span>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-gray-500"></i>
                            </span>
                            <div className="text-900 font-bold text-xl my-3">
                                Absolute Perfection!
                            </div>
                            <p className="mx-0 mt-0 mb-3 text-600 line-height-3">
                                Blandit libero volutpat sed cras ornare arcu dui
                                vivamus. Arcu dictum varius duis at consectetur
                                lorem donec massa. Imperdiet proin fermentum leo
                                vel orci porta non. Porttitor rhoncus dolor
                                purus non.
                            </p>
                            <span className="font-medium">
                                Darlene Robertson, 2 days ago
                            </span>
                        </li>
                        <li className="py-5 border-bottom-1 surface-border">
                            <span>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i className="pi pi-star-fill text-yellow-500"></i>
                            </span>
                            <div className="text-900 font-bold text-xl my-3">
                                Classy
                            </div>
                            <p className="mx-0 mt-0 mb-3 text-600 line-height-3">
                                Venenatis cras sed felis eget. Proin nibh nisl
                                condimentum id venenatis a condimentum.
                            </p>
                            <span className="font-medium">
                                Kristin Watson, 2 days ago
                            </span>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel header="Shipping and Returns">
                    <div className="text-900 font-bold text-3xl mb-4 mt-2">
                        Shipping Placeholder
                    </div>
                    <p className="line-height-3 text-600 p-0 mx-0 mt-0 mb-4">
                        Mattis aliquam faucibus purus in massa tempor nec
                        feugiat nisl. Justo donec enim diam vulputate ut
                        pharetra. Tempus egestas sed sed risus. Feugiat sed
                        lectus vestibulum mattis. Tristique nulla aliquet enim
                        tortor at auctor urna nunc. Habitant morbi tristique
                        senectus et. Facilisi nullam vehicula ipsum.
                    </p>

                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <span className="text-900 block font-bold mb-3 font-bold">
                                Shipping Costs
                            </span>
                            <ul className="py-0 pl-3 m-0 text-600 mb-3">
                                <li className="mb-2">Japan - JPY 2,500.</li>
                                <li className="mb-2">Europe - EUR 10</li>
                                <li className="mb-2">Switzerland - CHF 10</li>
                                <li className="mb-2">Canada - CAD 25</li>
                                <li className="mb-2">USA - USD 20</li>
                                <li className="mb-2">Australia - AUD 30</li>
                                <li className="mb-2">
                                    United Kingdom - GBP 10
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 md:col-6">
                            <span className="text-900 block font-bold mb-3">
                                Return Policy
                            </span>
                            <p className="line-height-3 text-600 p-0 m-0">
                                Pharetra et ultrices neque ornare aenean euismod
                                elementum nisi. Diam phasellus vestibulum lorem
                                sed. Mattis molestie a iaculis at.{" "}
                            </p>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
}

export default ProductOverview;
