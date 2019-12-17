/* jest */
import * as React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import {Drawer, Content, Trigger} from './index'

describe('<Content>', () => {
  it('should open and close on Trigger click', () => {
    for (const placement of ['top', 'right', 'bottom', 'left']) {
      const result = render(
        <Drawer>
          <Content placement={placement}>
            <div>Hello world</div>
          </Content>

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
        <Content>
          <div>Hello world</div>
        </Content>

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
