import React from 'react';
import { render } from '@testing-library/react';
import Search from './search';

test('renders search bar empty', () => {
    const location = {
      search: {
      }
    }
    const { getByLabelText } = render(<Search location={location} />);
    const element = getByLabelText(/Search for .NET Tools.../i);
    expect(element).toBeInTheDocument();
  });
