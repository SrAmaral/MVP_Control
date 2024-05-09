import type { UseSubmenuOverlayPositionProps } from "@/types";
import { useEventListener } from "primereact/hooks";
import { DomHandler } from "primereact/utils";
import { useContext, useEffect } from "react";
import { LayoutContext } from "../context/layoutcontext";
import { MenuContext } from "../context/menucontext";

export const useSubmenuOverlayPosition = ({
    target,
    overlay,
    container,
    when,
}: UseSubmenuOverlayPositionProps) => {
    const { isSlim, isSlimPlus, isHorizontal, setLayoutState } =
        useContext(LayoutContext);
    const { activeMenu } = useContext(MenuContext);

    const handleScroll = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlaySubmenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
            resetMenu: true,
        }));
    };

    const [bindScrollListener, unbindScrollListener] = useEventListener({
        type: "scroll",
        target: container as React.Ref<HTMLElement>,
        listener: handleScroll,
    });

    const calculatePosition = () => {
        if (overlay && target) {
            const { left, top } = target.getBoundingClientRect();
            const { width: vWidth, height: vHeight } = DomHandler.getViewport();
            const [oWidth, oHeight] = [
                overlay.offsetWidth,
                overlay.offsetHeight,
            ];
            const scrollbarWidth = DomHandler.calculateScrollbarWidth(
                container as HTMLElement
            );

            // reset
            overlay.style.top = overlay.style.left = "";

            if (isHorizontal()) {
                const width = left + oWidth + scrollbarWidth;
                overlay.style.left =
                    vWidth < width
                        ? `${left - (width - vWidth)}px`
                        : `${left}px`;
            } else if (isSlim() || isSlimPlus()) {
                const height = top + oHeight;
                overlay.style.top =
                    vHeight < height
                        ? `${top - (height - vHeight)}px`
                        : `${top}px`;
            }
        }
    };

    useEffect(() => {
        if (when) {
            bindScrollListener();
        }

        return () => {
            unbindScrollListener();
        };
    }, [when]);

    useEffect(() => {
        if (when) {
            calculatePosition();
        }
    }, [when, activeMenu]);
};
