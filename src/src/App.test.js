import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders .NET Global Tools text', () => {
  const { getByText } = render(<App />);
  const element = getByText(/.NET Global Tools/i);
  expect(element).toBeInTheDocument();
});
