import React from 'react';
import { render } from '@testing-library/react';
import Search from './search';

test('renders search bar empty', () => {
    const { getByText } = render(<Search />);
    const element = getByText(/Search for .NET global tools.../i);
    expect(element).toBeInTheDocument();
  });
