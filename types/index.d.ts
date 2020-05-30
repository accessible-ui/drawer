import * as React from 'react'
import {
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
export declare const Target: React.FC<TargetProps>
export interface DrawerContextValue extends DisclosureContextValue {}
export interface DrawerProps extends DisclosureProps {}
export interface DrawerControls extends DisclosureControls {}
export interface TriggerProps extends DisclosureTriggerProps {}
export interface CloseProps extends DisclosureCloseProps {}
export interface TargetProps extends DisclosureTargetProps {
  placement?: 'top' | 'right' | 'bottom' | 'left'
}
