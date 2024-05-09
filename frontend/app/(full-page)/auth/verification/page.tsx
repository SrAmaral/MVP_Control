"use client";
import type { Page } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import React, { useContext, useState } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";

const Verification: Page = () => {
    const [value1, setValue1] = useState<number | null>();
    const [value2, setValue2] = useState<number | null>();
    const [value3, setValue3] = useState<number | null>();
    const [value4, setValue4] = useState<number | null>();
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig.colorScheme !== "light";

    const onDigitInput = (
        event: React.KeyboardEvent<HTMLSpanElement>,
        currentInputId: number
    ) => {
        const isDigit =
            event.code.includes("Numpad") || event.code.includes("Digit");
        const isBackspace = event.code === "Backspace";
        let nextInputId: number | null = null;

        if (isDigit) {
            nextInputId = currentInputId + 1;
        } else if (isBackspace) {
            nextInputId = currentInputId - 1;
        }

        const element =
            nextInputId !== null
                ? document.getElementById("val" + nextInputId)
                : null;

        if (element) {
            element.focus();
        }
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1600 800"
                className="fixed left-0 top-0 min-h-screen min-w-screen"
                preserveAspectRatio="none"
            >
                <rect
                    fill={dark ? "var(--primary-900)" : "var(--primary-500)"}
                    width="1600"
                    height="800"
                />
                <path
                    fill={dark ? "var(--primary-800)" : "var(--primary-400)"}
                    d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
                />
                <path
                    fill={dark ? "var(--primary-700)" : "var(--primary-300)"}
                    d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
                />
                <path
                    fill={dark ? "var(--primary-600)" : "var(--primary-200)"}
                    d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
                />
                <path
                    fill={dark ? "var(--primary-500)" : "var(--primary-100)"}
                    d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
                />
            </svg>
            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                    <div className="mb-4">
                        <div className="text-900 text-xl font-bold mb-2">
                            Verification
                        </div>
                        <span className="text-600 font-medium">
                            We have sent code to you email:
                        </span>
                        <div className="flex align-items-center mt-1">
                            <i className="pi pi-envelope text-600"></i>
                            <span className="text-900 font-bold ml-2">
                                dm**@gmail.com
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-column">
                        <div className="flex justify-content-between w-full align-items-center mb-4 gap-3">
                            <InputNumber
                                id="input1"
                                inputId="val1"
                                value={value1}
                                onValueChange={(e) => setValue1(e.value)}
                                inputClassName="w-3rem text-center"
                                maxLength={1}
                                onKeyUp={(e) => onDigitInput(e, 1)}
                            ></InputNumber>
                            <InputNumber
                                id="input2"
                                inputId="val2"
                                value={value2}
                                onValueChange={(e) => setValue2(e.value)}
                                inputClassName="w-3rem text-center"
                                maxLength={1}
                                onKeyUp={(e) => onDigitInput(e, 2)}
                            ></InputNumber>
                            <InputNumber
                                id="input3"
                                inputId="val3"
                                value={value3}
                                onValueChange={(e) => setValue3(e.value)}
                                inputClassName="w-3rem text-center"
                                maxLength={1}
                                onKeyUp={(e) => onDigitInput(e, 3)}
                            ></InputNumber>
                            <InputNumber
                                id="input4"
                                inputId="val4"
                                value={value4}
                                onValueChange={(e) => setValue4(e.value)}
                                inputClassName="w-3rem text-center"
                                maxLength={1}
                                onKeyUp={(e) => onDigitInput(e, 4)}
                            ></InputNumber>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-content-between">
                            <Button
                                label="Cancel"
                                outlined
                                className="flex-auto"
                                onClick={() => router.push("/")}
                            ></Button>
                            <Button
                                label="Verify"
                                className="flex-auto"
                                onClick={() => router.push("/")}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Verification;
