import React from 'react';
import { render } from './custom-render';
import App from './App';

test('App renders correctly', () => {
    const { getByText } = render(<App />);
    const headerTitle = getByText(/React's list of open issues/i);
    expect(headerTitle).toBeInTheDocument();
});
