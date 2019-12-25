import {FC, createElement, cloneElement} from 'react'
import {
  Target as CollapseTarget,
  TargetProps as CollapseTargetProps,
  CollapseControls,
  CloseProps as CollapseCloseProps,
  TriggerProps as CollapseTriggerProps,
  CollapseProps,
  CollapseContextValue,
} from '@accessible/collapse'
export {
  Collapse as Drawer,
  CollapseContext as DrawerContext,
  CollapseConsumer as DrawerConsumer,
  useCollapse as useDrawer,
  Close,
  Trigger,
  useIsOpen,
  useControls,
} from '@accessible/collapse'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface DrawerContextValue extends CollapseContextValue {}
export interface DrawerProps extends CollapseProps {}
export interface DrawerControls extends CollapseControls {}
export interface TriggerProps extends CollapseTriggerProps {}
export interface CloseProps extends CollapseCloseProps {}
export interface TargetProps extends CollapseTargetProps {
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

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

export const Target: FC<TargetProps> = ({
  placement = 'left',
  openStyle,
  ...props
}) => {
  const childProps = props.children.props
  return createElement(
    CollapseTarget,
    Object.assign(props, {
      openStyle: Object.assign({}, defaultOpenStyles, openStyle),
    }),
    cloneElement(props.children, {
      style: Object.assign(
        {},
        defaultStyles,
        defaultClosedStyles[placement],
        childProps.style
      ),
    })
  )
}

/* istanbul ignore next */
if (__DEV__) {
  Target.displayName = 'Target'
}
