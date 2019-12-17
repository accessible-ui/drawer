<hr>
<div align="center">
  <h1 align="center">
    &lt;Drawer&gt;
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/drawer">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/drawer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/drawer">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/drawer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/drawer">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/drawer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/drawer">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/drawer?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/drawer?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/drawer</pre>
<hr>

An accessible and versatile drawer component for React. This drawer is just a few new styles
on top of [@accessible/drawer](https://github.com/accessible-ui/drawer) so when using both,
the drawer costs you nothing.

## Features

- **Style-agnostic** You can use this component with the styling library of your choice. It
  works with CSS-in-JS, SASS, plain CSS, plain `style` objects, anything!
- **Portal-friendly** The drawer content will render into React portals of your choice when configured
  to do so.
- **a11y/aria-compliant** This component works with screen readers out of the box and manages
  focus for you.

## Quick Start

[Check out the example on CodeSandbox](https://codesandbox.io/s/accessibledrawer-example-y65oq)

```jsx harmony
import {Drawer, Content, Trigger, Close} from '@accessible/drawer'

const Component = () => (
  <Drawer>
    <Content>
      <div className="my-drawer">
        <Close>
          <button>Close me</button>
        </Close>
      </div>
    </Content>

    <Trigger>
      <button>Open me</button>
    </Trigger>
  </Drawer>
)
```

## API

### Components

| Component               | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`<Drawer>`](#drawer)   | This component creates the context for your drawer box and trigger and contains some configuration options.   |
| [`<Content>`](#content) | This component wraps any React element and turns it into a drawer box.                                        |
| [`<Trigger>`](#trigger) | This component wraps any React element and turns it into a drawer trigger.                                    |
| [`<Close>`](#close)     | This is a convenience component that wraps any React element and adds an onClick handler to close the drawer. |  |

### Hooks

| Hook                            | Description                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`useDrawer()`](#usedrawer)     | This hook provides the value of the drawer's [DrawerContextValue object](#drawercontextvalue). |
| [`useControls()`](#usecontrols) | This hook provides access to the drawer's `open`, `close`, and `toggle` functions.             |
| [`useIsOpen()`](#useisopen)     | This hook provides access to the drawer's `isOpen` value.                                      |

### `<Drawer>`

This component creates the context for your drawer box and trigger and contains some
configuration options.

#### Props

| Prop        | Type                                                                                                                               | Default     | Required? | Description                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultOpen | `boolean`                                                                                                                          | `false`     | No        | This sets the default open state of the drawer. By default the drawer is closed.                                                                                                   |
| open        | `boolean`                                                                                                                          | `undefined` | No        | You can control the open/closed state of the drawer with this prop. When it isn't undefined, this value will take precedence over any calls to `open()`, `close()`, or `toggle()`. |
| id          | `string`                                                                                                                           | `undefined` | No        | By default this component creates a unique id for you, as it is required for certain aria attributes. Supplying an id here overrides the auto id feature.                          |
| children    | <code>React.ReactNode &#124; React.ReactNode[] &#124; JSX.Element &#124; ((context: DrawerContextValue) => React.ReactNode)</code> | `undefined` | No        | Your drawer contents and any other children.                                                                                                                                       |

### `<Content>`

This component wraps any React element and turns it into a drawer content.

#### Props

| Prop          | Type                                                             | Default         | Required? | Description                                                                                                                                                                                                     |
| ------------- | ---------------------------------------------------------------- | --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| placement     | <code>"top" &#124; "right" &#124; "bottom" &#124; "left" </code> | `"left"`        | No        | Sets the edge of the `window` you want your drawer content to render on.                                                                                                                                        |
| portal        | <code>boolean &#124; string </code>                              | `false`         | No        | When `true` this will render the drawer into a React portal with the id `#portals`. You can render it into any portal by providing its query selector here, e.g. `#foobar`, `[data-portal=true]`, or `.foobar`. |
| closeOnEscape | `boolean`                                                        | `true`          | No        | By default the drawer will close when the `Escape` key is pressed. You can turn this off by providing `false` here.                                                                                             |
| closedClass   | `string`                                                         | `undefined`     | No        | This class name will be applied to the child element when the drawer is `closed`.                                                                                                                               |
| openClass     | `string`                                                         | `"modal--open"` | No        | This class name will be applied to the child element when the drawer is `open`.                                                                                                                                 |
| closedStyle   | `React.CSSProperties`                                            | `undefined`     | No        | These styles will be applied to the child element when the drawer is `closed` in addition to the default styles that set the box's visibility.                                                                  |
| openStyle     | `React.CSSProperties`                                            | `undefined`     | No        | These styles name will be applied to the child element when the drawer is `open` in addition to the default styles that set the box's visibility.                                                               |
| children      | `React.ReactElement`                                             | `undefined`     | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above.                                                                                      |

#### Example

```jsx harmony
<Content>
  <div className="alert">Alert</div>
</Content>

// <div
//   class="alert"
//   aria-hidden="true"
//   aria-drawer="false"
//   id="modal--12"
//   role="content"
//   style="visibility: hidden; position: fixed; margin: auto; left: 0px; right: 0px; top: 50%; transform: translateY(-50%); z-index: 1;"
// >
//   Alert
// </div>
```

### `<Trigger>`

This component wraps any React element and adds an `onClick` handler which toggles the open state
of the drawer content.

#### Props

| Prop        | Type                  | Default     | Required? | Description                                                                                                                |
| ----------- | --------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| closedClass | `string`              | `undefined` | No        | This class name will be applied to the child element when the drawer is `closed`.                                          |
| openClass   | `string`              | `undefined` | No        | This class name will be applied to the child element when the drawer is `open`.                                            |
| closedStyle | `React.CSSProperties` | `undefined` | No        | These styles will be applied to the child element when the drawer is `closed`.                                             |
| openStyle   | `React.CSSProperties` | `undefined` | No        | These styles name will be applied to the child element when the drawer is `open`.                                          |
| children    | `React.ReactElement`  | `undefined` | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above. |

```jsx harmony
<Trigger on="click">
  <button className="my-button">Open me!</button>
</Trigger>

// <button
//   class="my-button"
//   aria-controls="modal--12"
//   aria-haspopup="content"
//   aria-expanded="false"
// >
//   Open me!
// </button>
```

### `<Close>`

This is a convenience component that wraps any React element and adds an onClick handler which closes the drawer.

#### Props

| Prop     | Type                 | Default     | Required? | Description                                                                                                                |
| -------- | -------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| children | `React.ReactElement` | `undefined` | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above. |

```jsx harmony
<Close>
  <button className="my-button">Close me</button>
</Close>

// <button
//   class="my-button"
//   aria-controls="modal--12"
//   aria-haspopup="content"
//   aria-expanded="false"
// >
//   Close me
// </button>
```

### `useDrawer()`

This hook provides the value of the drawer's [DrawerContextValue object](#drawercontextvalue)

#### Example

```jsx harmony
const Component = () => {
  const {open, close, toggle, isOpen} = useDrawer()
  return <button onClick={toggle}>Toggle the drawer</button>
}
```

### `DrawerContextValue`

```typescript
interface DrawerContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  id: string
}
```

### `useControls()`

This hook provides access to the drawer's `open`, `close`, and `toggle` functions

#### Example

```jsx harmony
const Component = () => {
  const {open, close, toggle} = useControls()
  return (
    <Content>
      <div className="my-drawer">
        <button onClick={close}>Close me</button>
      </div>
    </Content>
  )
}
```

### `useIsOpen()`

This hook provides access to the drawer's `isOpen` value

#### Example

```jsx harmony
const Component = () => {
  const isOpen = useIsOpen()
  return (
    <Content>
      <div className="my-drawer">Am I open? {isOpen ? 'Yes' : 'No'}</div>
    </Content>
  )
}
```

## LICENSE

MIT
