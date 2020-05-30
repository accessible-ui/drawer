/* jest */
import * as React from 'react'
import {render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      userEvent.click(result.getByRole('button'))
      expect(result.asFragment()).toMatchSnapshot('open')
      userEvent.click(result.getByRole('button'))
      expect(result.asFragment()).toMatchSnapshot('closed')
      cleanup()
      document.getElementsByTagName('html')[0].innerHTML = ''
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
    userEvent.click(result.getByRole('button'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })
})
