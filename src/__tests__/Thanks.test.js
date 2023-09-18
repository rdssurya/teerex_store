import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Thanks from '../Components/Thanks';

describe('Thanks', () => {
  it('Navigates user to Products page when EXPLORE MORE is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Thanks />
      </MemoryRouter>
    );
    const link = screen.getByText('EXPLORE MORE');
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
});
