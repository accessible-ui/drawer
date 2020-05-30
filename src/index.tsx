import * as React from 'react'
import {
  Target as DisclosureTarget,
  TargetProps as DisclosureTargetProps,
  DisclosureControls,
  CloseProps as DisclosureCloseProps,
  TriggerProps as DisclosureTriggerProps,
  DisclosureProps,
  DisclosureContextValue,
} from '@accessible/disclosure'
export {
  Disclosure as Drawer,
  DisclosureContext as DrawerContext,
  DisclosureConsumer as DrawerConsumer,
  useDisclosure as useDrawer,
  Close,
  Trigger,
  useIsOpen,
  useControls,
} from '@accessible/disclosure'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

const defaultClosedStyles = {
  top: {
    margin: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    transform: 'translate3d(0, -100%, 0)',
  },
  right: {
    margin: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 'auto',
    transform: 'translate3d(100%, 0, 0)',
  },
  bottom: {
    margin: 0,
    top: 'auto',
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'translate3d(0, 100%, 0)',
  },
  left: {
    margin: 0,
    top: 0,
    right: 'auto',
    bottom: 0,
    left: 0,
    transform: 'translate3d(-100%, 0, 0)',
  },
}

const defaultOpenStyles = {
  transform: 'translate3d(0, 0, 0)',
}

const defaultStyles = {
  position: 'fixed',
  margin: 'auto',
  left: '50%',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
}

export const Target: React.FC<TargetProps> = ({
  placement = 'left',
  openStyle,
  ...props
}) => {
  const childProps = props.children.props
  return React.createElement(
    DisclosureTarget,
    Object.assign(props, {
      openStyle: Object.assign({}, defaultOpenStyles, openStyle),
    }),
    React.cloneElement(props.children, {
      style: Object.assign(
        {},
        defaultStyles,
        defaultClosedStyles[placement],
        childProps.style
      ),
    })
  )
}

export interface DrawerContextValue extends DisclosureContextValue {}
export interface DrawerProps extends DisclosureProps {}
export interface DrawerControls extends DisclosureControls {}
export interface TriggerProps extends DisclosureTriggerProps {}
export interface CloseProps extends DisclosureCloseProps {}
export interface TargetProps extends DisclosureTargetProps {
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

/* istanbul ignore next */
if (__DEV__) {
  Target.displayName = 'Target'
}
