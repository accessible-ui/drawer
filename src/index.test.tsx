/* jest */
import * as React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import {Drawer, Target, Trigger} from './index'

describe('<Target>', () => {
  it('should open and close on Trigger click', () => {
    for (const placement of ['top', 'right', 'bottom', 'left']) {
      const result = render(
        <Drawer>
          <Target placement={placement as 'top' | 'right' | 'bottom' | 'left'}>
            <div>Hello world</div>
          </Target>

          <Trigger>
            <button>open me</button>
          </Trigger>
        </Drawer>
      )

      expect(result.asFragment()).toMatchSnapshot('closed initially')
      fireEvent.click(result.getByText('open me'))
      expect(result.asFragment()).toMatchSnapshot('open')
      fireEvent.click(result.getByText('open me'))
      expect(result.asFragment()).toMatchSnapshot('closed')
      cleanup()
    }
  })

  it('should open on the left by default', () => {
    const result = render(
      <Drawer>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Drawer>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })
})
