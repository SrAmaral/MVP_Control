"use client";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";

function Colors() {
    const [colors, setColors] = useState<string[]>([]);
    const [shades, setShades] = useState<number[]>([]);
    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig.colorScheme !== "light";

    useEffect(() => {
        setColors([
            "blue",
            "green",
            "yellow",
            "cyan",
            "pink",
            "indigo",
            "red",
            "teal",
            "orange",
            "bluegray",
            "purple",
            "gray",
            "primary",
        ]);
        setShades([0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
    }, []);

    return (
        <div className="card">
            <h2>Colors</h2>
            <p>Each PrimeReact theme exports its own color palette.</p>

            <h4>Getting Started</h4>
            <p>
                Colors are exported as CSS variables and used with the standard{" "}
                <span className="text-primary font-medium">var</span> syntax
                e.g.{" "}
                <span className="text-primary font-medium">
                    var(--text-color)
                </span>
                .
            </p>

            <pre className="app-code">
                <code>{`<span style={{color:'var(--text-color)'}}></span>`}</code>
            </pre>

            <h4>PrimeFlex Integration</h4>
            <p>
                Color utility classes of PrimeFlex such as background, text and
                border use the exported CSS variables from the theme so
                PrimeFlex or PrimeBlocks are perfectly compatible with the
                provided themes.
            </p>

            <pre className="app-code">
                <code>{`<div className="bg-blue-500></div>`}</code>
            </pre>

            <h4>Exported Colors</h4>
            <p>
                Following is the list of colors exported as CSS variables from
                the theme.
            </p>
            <div className="card">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-900 text-left p-2">Variable</th>
                            <th className="text-900 text-left p-2">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --text-color
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Font text color.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --text-color-secondary
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Muted font text color with a secondary level.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --primary-color
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Primary color of the theme.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --primary-color-text
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Text color when background is primary color.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --font-family
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Font family of the theme.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-ground
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Base ground color.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-section
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Color of a section on a ground surface.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-card
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Color of a surface used as a card.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-overlay
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Color of overlay surfaces.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-border
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Color of a divider.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --surface-hover
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Color of an element in hover state.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">
                                    --focus-ring
                                </span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Box shadow of a focused item.
                            </td>
                        </tr>
                        <tr>
                            <td className="border-bottom-1 surface-border p-2">
                                <span className="font-medium">--maskbg</span>
                            </td>
                            <td className="border-bottom-1 surface-border p-2">
                                Background color of an overlay mask.
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">
                                <span className="font-medium">
                                    --border-radius
                                </span>
                            </td>
                            <td className="p-2">
                                Border radius of an element.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4>Color Palette</h4>
            <p>
                A palette consists of 9 colors where each color provides
                tints/shades from 50 to 900.
            </p>

            <div className="card">
                <div className="flex flex-wrap">
                    {colors.map((color, i) => {
                        return (
                            <div
                                key={i + color}
                                className="flex flex-column mr-6 mb-6"
                            >
                                {shades.map((shade, j) => {
                                    return (
                                        <React.Fragment key={shade + j}>
                                            {shade !== 0 && (
                                                <div
                                                    className="flex align-items-center w-19rem p-3 font-bold"
                                                    style={{
                                                        backgroundColor:
                                                            "var(--" +
                                                            color +
                                                            "-" +
                                                            shade,
                                                        color:
                                                            shade > 500
                                                                ? "#fff"
                                                                : "#000",
                                                    }}
                                                >
                                                    {color}-{shade}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <h4>Surfaces</h4>
            <p>
                In addition, a theme brings a special palette called surfaces
                that can be used as the base when designing the surface layers
                and separators.
            </p>
            <div className="card">
                <div className="flex flex-column">
                    {shades.map((shade, i) => {
                        return (
                            <div
                                key={i + shade}
                                className="flex align-items-center w-19rem p-3 font-bold"
                                style={{
                                    backgroundColor: "var(--surface-" + shade,
                                    color: dark
                                        ? shade > 400
                                            ? "#000"
                                            : "#fff"
                                        : shade > 500
                                        ? "#fff"
                                        : "#000",
                                }}
                            >
                                surface-{shade}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Colors;
