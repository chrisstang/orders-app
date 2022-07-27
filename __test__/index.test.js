import { render, screen, fireEvent } from '@testing-library/react'
import { menuItems } from '../constant/menu'
import Menu from '../pages/index'
import MenuItem from '../components/Menu/MenuItem'
import '@testing-library/jest-dom'

describe('render Menu heading', () => {
  it('shoud renders a heading', () => {
    render(<Menu />)

    const heading = screen.getByRole('heading', { name: 'Menu' })
    expect(heading).toBeInTheDocument()
  })
})

describe('render MenuItem', () => {
  it('should renders a menu item title', () => {
    render(<MenuItem item={menuItems[0]} />)
    
    const menuItem = screen.getByText('Hamburger')
    expect(menuItem).toBeInTheDocument()
  })

  it('should trigger update on click input', () => {
    const updateOrderList = jest.fn()
    render(<MenuItem item={menuItems[0]} updateOrderList={updateOrderList} />)

    const numberInput = screen.getByRole('spinbutton')
    expect(numberInput).toBeInTheDocument()

    fireEvent.change(numberInput, { target: { value: 1 }})
    expect(numberInput).toHaveValue(1)
  })

  it('should trigger form submission on submit button', () => {
    const submitHanlder = jest.fn()
    render(<Menu />)

    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: 'Order' })
    expect(submitButton).toBeInTheDocument()

    form.onsubmit = submitHanlder
    fireEvent.submit(submitButton)
    expect(submitHanlder).toHaveBeenCalled()
  })
})