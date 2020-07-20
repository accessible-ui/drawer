/* jest */
import * as React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Drawer,
  Trigger,
  Target,
  CloseButton,
  useDrawer,
  useA11yTarget,
} from './index'

describe('<Drawer>', () => {
  it('should have a custom id', () => {
    render(
      <Drawer id='foobar'>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute('id', 'foobar')
  })

  it('should invoke onChange callback when open state changes', () => {
    const handleChange = jest.fn()

    render(
      <Drawer onChange={handleChange}>
        <Trigger>
          <button data-testid='btn'>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(handleChange).not.toBeCalled()
    userEvent.click(screen.getByRole('button'))
    expect(handleChange).toBeCalledWith(true, false)
    userEvent.click(screen.getByRole('button'))
    expect(handleChange).toBeCalledWith(false, true)
  })
})

describe('<Target>', () => {
  it('should open and close on Trigger click', () => {
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
    })

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )
    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'visible',
    })

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
    })
  })

  it('should default to "left"', () => {
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      right: 'auto',
      transform: 'translate3d(-100%, 0, 0)',
    })
  })

  it('should return correct props for "left"', () => {
    render(
      <Drawer>
        <Target placement='left'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      right: 'auto',
      transform: 'translate3d(-100%, 0, 0)',
    })
  })

  it('should return correct props for "top"', () => {
    render(
      <Drawer>
        <Target placement='top'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 'auto',
      right: 0,
      transform: 'translate3d(0, -100%, 0)',
    })
  })

  it('should return correct props for "right"', () => {
    render(
      <Drawer>
        <Target placement='right'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
      position: 'fixed',
      left: 'auto',
      top: 0,
      bottom: 0,
      right: 0,
      transform: 'translate3d(100%, 0, 0)',
    })
  })

  it('should return correct props for "bottom"', () => {
    render(
      <Drawer>
        <Target placement='bottom'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 'auto',
      bottom: 0,
      right: 0,
      transform: 'translate3d(0, 100%, 0)',
    })
  })

  it('should close on escape key', () => {
    render(
      <Drawer defaultOpen>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )

    fireEvent.keyDown(screen.getByText('Hello world'), {
      key: 'Escape',
      which: 27,
    })
    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it(`shouldn't close on escape key if prop is false`, () => {
    render(
      <Drawer defaultOpen>
        <Target closeOnEscape={false}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    fireEvent.keyDown(screen.getByText('Hello world'), {
      key: 'Escape',
      code: 27,
    })
    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )
  })

  it(`should assign to custom styles when opened or closed`, () => {
    render(
      <Drawer>
        <Target>
          <div style={{fontSize: '2rem'}}>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({fontSize: '2rem'})
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).toHaveStyle({fontSize: '2rem'})
  })

  it(`should apply custom classname when opened or closed`, () => {
    render(
      <Drawer>
        <Target>
          <div className='custom'>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveClass('custom')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).toHaveClass('custom')
  })

  it(`should apply user defined openClass and closedClass`, () => {
    render(
      <Drawer>
        <Target closedClass='closed' openClass='open'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveClass('closed')
    expect(screen.getByText('Hello world')).not.toHaveClass('open')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).not.toHaveClass('closed')
    expect(screen.getByText('Hello world')).toHaveClass('open')
  })

  it(`should apply user defined openStyle and closedStyle`, () => {
    render(
      <Drawer>
        <Target closedStyle={{display: 'none'}} openStyle={{display: 'block'}}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveStyle({display: 'none'})
    expect(screen.getByText('Hello world')).not.toHaveStyle({display: 'block'})
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).not.toHaveStyle({display: 'none'})
    expect(screen.getByText('Hello world')).toHaveStyle({display: 'block'})
  })

  it(`should be initially open when defined as such`, () => {
    render(
      <Drawer defaultOpen>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )
  })

  it(`should act like a controlled component when 'open' prop is specified`, () => {
    const result = render(
      <Drawer open>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'false'
    )

    result.rerender(
      <Drawer open={false}>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Hello world')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('should render into a portal by default ID', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portals')
    document.body.appendChild(portalRoot)

    render(
      <Drawer open>
        <Target portal>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world').parentNode).toHaveAttribute(
      'id',
      'portals'
    )
    document.body.removeChild(portalRoot)
  })

  it('should render into a portal by custom selector object', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'portals')
    document.body.appendChild(portalRoot)

    render(
      <Drawer open>
        <Target portal={{container: '.portals'}}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world').parentNode).toHaveClass('portals')
    document.body.removeChild(portalRoot)
  })

  it('should render into a portal by custom selector', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'portals')
    document.body.appendChild(portalRoot)

    render(
      <Drawer open>
        <Target portal='.portals'>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Hello world').parentNode).toHaveClass('portals')
    document.body.removeChild(portalRoot)
  })
})

describe('<Trigger>', () => {
  it('should have correct aria-controls prop', () => {
    render(
      <Drawer id='test'>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'test')
  })

  it('should have correct aria-expanded prop', () => {
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('should have openClass and closedClass', () => {
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger closedClass='closed' openClass='open'>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByRole('button')).toHaveClass('closed')
    expect(screen.getByRole('button')).not.toHaveClass('open')
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).not.toHaveClass('closed')
    expect(screen.getByRole('button')).toHaveClass('open')
  })

  it('should have openStyle and closedStyle', () => {
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger closedStyle={{display: 'flex'}} openStyle={{display: 'block'}}>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByRole('button')).toHaveStyle({display: 'flex'})
    expect(screen.getByRole('button')).not.toHaveStyle({display: 'block'})
    userEvent.click(screen.getByText('open me'))
    expect(screen.getByRole('button')).not.toHaveStyle({display: 'flex'})
    expect(screen.getByRole('button')).toHaveStyle({display: 'block'})
  })

  it('should fire user-defined onClick handler', () => {
    const cb = jest.fn()
    render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button onClick={cb}>open me</button>
        </Trigger>
      </Drawer>
    )

    userEvent.click(screen.getByRole('button'))
    expect(cb).toBeCalledTimes(1)
  })
})

describe('<CloseButton>', () => {
  it('should have correct aria-controls prop', () => {
    render(
      <Drawer id='test'>
        <Target>
          <div>
            <CloseButton>
              <button data-testid='close' aria-label='close me'>
                Close me
              </button>
            </CloseButton>
            Hello world
          </div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('Close me')).toHaveAttribute(
      'aria-controls',
      'test'
    )
  })

  it('should have correct aria-expanded prop', () => {
    render(
      <Drawer defaultOpen>
        <Target>
          <div>
            <CloseButton>
              <button data-testid='close' aria-label='close me'>
                Close me
              </button>
            </CloseButton>
            Hello world
          </div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByText('open me')).toHaveAttribute('aria-expanded', 'true')
    userEvent.click(screen.getByTestId('close'))
    expect(screen.getByText('open me')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('should override the aria label', () => {
    render(
      <Drawer defaultOpen={true}>
        <Target>
          <div>
            <CloseButton>
              <button data-testid='close' aria-label='close me'>
                Close me
              </button>
            </CloseButton>
            Hello world
          </div>
        </Target>
      </Drawer>
    )

    expect(screen.getByText('Close me')).toHaveAttribute(
      'aria-label',
      'close me'
    )
  })

  it('should close the target', () => {
    render(
      <Drawer defaultOpen>
        <Target>
          <div data-testid='target'>
            <CloseButton>
              <button data-testid='close'>Close me</button>
            </CloseButton>
            Hello world
          </div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(screen.getByTestId('target')).toHaveAttribute('aria-hidden', 'false')
    userEvent.click(screen.getByTestId('close'))
    expect(screen.getByTestId('target')).toHaveAttribute('aria-hidden', 'true')
  })

  it('should fire user-defined onClick handler', () => {
    const cb = jest.fn()
    render(
      <Drawer defaultOpen={true}>
        <Target>
          <div>
            <CloseButton>
              <button onClick={cb} data-testid='close'>
                Close me
              </button>
            </CloseButton>
            Hello world
          </div>
        </Target>

        <Trigger closedClass='closed' openClass='open'>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    userEvent.click(screen.getByTestId('close'))
    expect(cb).toBeCalledTimes(1)
  })
})

describe('useDrawer()', () => {
  it('should return context', () => {
    const {result} = renderHook(() => useDrawer(), {wrapper: Drawer})
    expect(typeof result.current.close).toBe('function')
    expect(typeof result.current.open).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.isOpen).toBe('boolean')
    expect(typeof result.current.id).toBe('string')
    expect(Object.keys(result.current).sort()).toEqual(
      ['close', 'open', 'toggle', 'isOpen', 'id'].sort()
    )
  })
})

describe('useA11yTarget()', () => {
  it('should default to "left"', () => {
    const ref = {current: null}
    const {result} = renderHook(() => useA11yTarget(ref), {
      wrapper: Drawer,
    })

    expect(result.current.style).toStrictEqual({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      right: 'auto',
      transform: 'translate3d(-100%, 0, 0)',
    })
  })

  it('should return correct props for "left"', () => {
    const ref = {current: null}
    const {result} = renderHook(() => useA11yTarget(ref, {placement: 'left'}), {
      wrapper: Drawer,
    })

    expect(result.current.style).toStrictEqual({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      right: 'auto',
      transform: 'translate3d(-100%, 0, 0)',
    })
  })

  it('should return correct props for "top"', () => {
    const ref = {current: null}
    const {result} = renderHook(() => useA11yTarget(ref, {placement: 'top'}), {
      wrapper: Drawer,
    })

    expect(result.current.style).toStrictEqual({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 'auto',
      right: 0,
      transform: 'translate3d(0, -100%, 0)',
    })
  })

  it('should return correct props for "right"', () => {
    const ref = {current: null}
    const {result} = renderHook(
      () => useA11yTarget(ref, {placement: 'right'}),
      {
        wrapper: Drawer,
      }
    )

    expect(result.current.style).toStrictEqual({
      visibility: 'hidden',
      position: 'fixed',
      left: 'auto',
      top: 0,
      bottom: 0,
      right: 0,
      transform: 'translate3d(100%, 0, 0)',
    })
  })

  it('should return correct props for "bottom"', () => {
    const ref = {current: null}
    const {result} = renderHook(
      () => useA11yTarget(ref, {placement: 'bottom'}),
      {
        wrapper: Drawer,
      }
    )

    expect(result.current.style).toStrictEqual({
      visibility: 'hidden',
      position: 'fixed',
      left: 0,
      top: 'auto',
      bottom: 0,
      right: 0,
      transform: 'translate3d(0, 100%, 0)',
    })
  })
})
