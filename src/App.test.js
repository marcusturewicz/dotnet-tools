import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders .NET Global Tools text', () => {
  const { getByText } = render(<App />);
  const element = getByText(/ToolGet/i);
  expect(element).toBeInTheDocument();
});
