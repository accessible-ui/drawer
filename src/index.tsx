import * as React from 'react'
import {
  Disclosure,
  Target as DisclosureTarget,
  useA11yTarget as useA11yDisclosureTarget,
  useDisclosure,
} from '@accessible/disclosure'
import type {
  DisclosureProps,
  DisclosureContextValue,
  TargetProps as DisclosureTargetProps,
  UseA11yTargetOptions as UseA11yDisclosureTargetOptions,
} from '@accessible/disclosure'

/**
 * This hook provides the current value of the drawer's context object
 */
export function useDrawer(): DrawerContextValue {
  return useDisclosure()
}

/**
 * This component creates the context for your drawer target and trigger
 * and contains some configuration options.
 */
export function Drawer(props: DrawerProps) {
  return <Disclosure {...props} />
}

/**
 * A React hook for creating a headless drawer target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-drawer/dialog.html).
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export function useA11yTarget<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseA11yTargetOptions = {}
) {
  const disclosureProps = useA11yDisclosureTarget(
    target,
    Object.assign({}, options, {
      openStyle: Object.assign(defaultOpenStyles, options.openStyle),
    })
  )

  return Object.assign(disclosureProps, {
    style: Object.assign(
      disclosureProps.style,
      defaultClosedStyles[options.placement || 'left']
    ),
  } as const)
}

/**
 * This component wraps any React element and turns it into a
 * drawer target.
 */
export function Target(props: TargetProps) {
  const childProps = props.children.props
  return React.createElement(
    DisclosureTarget,
    Object.assign({}, props, {
      openStyle: Object.assign({}, defaultOpenStyles, props.openStyle),
    }),
    React.cloneElement(props.children, {
      style: Object.assign(
        {},
        defaultClosedStyles[props.placement || 'left'],
        childProps.style
      ),
    })
  )
}

const defaultClosedStyles = {
  top: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    transform: 'translate3d(0, -100%, 0)',
  },
  right: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 'auto',
    transform: 'translate3d(100%, 0, 0)',
  },
  bottom: {
    position: 'fixed',
    top: 'auto',
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'translate3d(0, 100%, 0)',
  },
  left: {
    position: 'fixed',
    top: 0,
    right: 'auto',
    bottom: 0,
    left: 0,
    transform: 'translate3d(-100%, 0, 0)',
  },
} as const

const defaultOpenStyles = {
  transform: 'translate3d(0, 0, 0)',
} as const

export {
  Trigger,
  CloseButton,
  useA11yTrigger,
  useA11yCloseButton,
} from '@accessible/disclosure'

export type {
  TriggerProps,
  CloseButtonProps,
  UseA11yTriggerOptions,
  UseA11yCloseButtonOptions,
} from '@accessible/disclosure'

export interface DrawerProps extends DisclosureProps {}
export interface DrawerContextValue extends DisclosureContextValue {}
export interface UseA11yTargetOptions extends UseA11yDisclosureTargetOptions {
  /**
   * Sets the placement of the drawer menu
   * @default "left"
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
}
export interface TargetProps
  extends DisclosureTargetProps,
    UseA11yTargetOptions {}

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer'
  Target.displayName = 'Target'
}
