import React from 'react'
import {Dialog, DialogProps} from '@accessible/modal'
export {
  Modal as Drawer,
  ModalContext as DrawerContext,
  ModalContextValue as DrawerContextValue,
  ModalProps as DrawerProps,
  useModal as useDrawer,
  ModalConsumer as DrawerConsumer,
  Trigger,
  TriggerProps,
  Close,
  CloseProps,
  useIsOpen,
  useControls,
} from '@accessible/modal'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface ContentProps extends DialogProps {
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

export const Content: React.FC<ContentProps> = ({
  placement = 'left',
  openStyle,
  closedStyle,
  ...props
}) => (
  <Dialog
    closedStyle={Object.assign({}, defaultClosedStyles[placement], closedStyle)}
    openStyle={Object.assign(
      {},
      defaultClosedStyles[placement],
      defaultOpenStyles,
      openStyle
    )}
    {...props}
  />
)

/* istanbul ignore next */
if (__DEV__) {
  Content.displayName = 'Content'
}
