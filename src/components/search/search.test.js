import React from 'react';
import { render } from '@testing-library/react';
import Search from './search';

test('renders search bar empty', () => {
    const { getByLabelText } = render(<Search />);
    const element = getByLabelText(/Search for .NET global tools.../i);
    expect(element).toBeInTheDocument();
  });
