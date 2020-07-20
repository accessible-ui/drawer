import * as React from 'react';
import type { DisclosureProps, DisclosureContextValue, TargetProps as DisclosureTargetProps, UseA11yTargetOptions as UseA11yDisclosureTargetOptions } from '@accessible/disclosure';
/**
 * This hook provides the current value of the drawer's context object
 */
export declare function useDrawer(): DrawerContextValue;
/**
 * This component creates the context for your drawer target and trigger
 * and contains some configuration options.
 */
export declare function Drawer(props: DrawerProps): JSX.Element;
export declare namespace Drawer {
    var displayName: string;
}
/**
 * A React hook for creating a headless drawer target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-drawer/dialog.html).
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export declare function useA11yTarget<T extends HTMLElement>(target: React.RefObject<T> | T | null, options?: UseA11yTargetOptions): {
    readonly 'aria-hidden': boolean;
    readonly id: string | undefined;
    readonly className: string | undefined;
    readonly style: {
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties;
} & {
    readonly style: ({
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties & {
        readonly position: "fixed";
        readonly top: 0;
        readonly right: 0;
        readonly bottom: "auto";
        readonly left: 0;
        readonly transform: "translate3d(0, -100%, 0)";
    }) | ({
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties & {
        readonly position: "fixed";
        readonly top: 0;
        readonly right: 0;
        readonly bottom: 0;
        readonly left: "auto";
        readonly transform: "translate3d(100%, 0, 0)";
    }) | ({
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties & {
        readonly position: "fixed";
        readonly top: "auto";
        readonly right: 0;
        readonly bottom: 0;
        readonly left: 0;
        readonly transform: "translate3d(0, 100%, 0)";
    }) | ({
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties & {
        readonly position: "fixed";
        readonly top: 0;
        readonly right: "auto";
        readonly bottom: 0;
        readonly left: 0;
        readonly transform: "translate3d(-100%, 0, 0)";
    });
};
/**
 * This component wraps any React element and turns it into a
 * drawer target.
 */
export declare function Target(props: TargetProps): React.FunctionComponentElement<TargetProps & {
    openStyle: {
        readonly transform: "translate3d(0, 0, 0)";
    } & React.CSSProperties;
}>;
export declare namespace Target {
    var displayName: string;
}
export { Trigger, CloseButton, useA11yTrigger, useA11yCloseButton, } from '@accessible/disclosure';
export type { TriggerProps, CloseButtonProps, UseA11yTriggerOptions, UseA11yCloseButtonOptions, } from '@accessible/disclosure';
export interface DrawerProps extends DisclosureProps {
}
export interface DrawerContextValue extends DisclosureContextValue {
}
export interface UseA11yTargetOptions extends UseA11yDisclosureTargetOptions {
    /**
     * Sets the placement of the drawer menu
     * @default "left"
     */
    placement?: 'top' | 'right' | 'bottom' | 'left';
}
export interface TargetProps extends DisclosureTargetProps, UseA11yTargetOptions {
}
