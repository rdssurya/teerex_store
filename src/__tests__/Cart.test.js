import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../Components/Products';

describe('Products', () => {
  it('renders the store title', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    const storeTitle = screen.getByText('TEEREX STORE');
    expect(storeTitle).toBeInTheDocument();
  });

  it('navigates to "/" when "PRODUCTS" button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Products />
      </MemoryRouter>
    );
    const productsButton = screen.getByRole('button', { name: /PRODUCTS/i });
    expect(productsButton).toBeInTheDocument();
  });

  it('navigates to "/cart" when "CART" button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Products />
      </MemoryRouter>
    );
    const cartButton = screen.getByRole('button', { name: /CART/i });
    expect(cartButton).toBeInTheDocument();
  });
});
