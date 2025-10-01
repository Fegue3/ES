import { render, screen } from '@testing-library/react'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('mostra o título', () => {
    render(<HomePage />)
    expect(screen.getByText(/bem-vindo/i)).toBeInTheDocument()
  })
})
