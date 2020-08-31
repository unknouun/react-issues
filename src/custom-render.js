import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { IssuesProvider } from './context/IssuesContext';

const Wrapper = ({ children }) => {
    return (
        <BrowserRouter>
            <IssuesProvider>{children}</IssuesProvider>
        </BrowserRouter>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Wrapper, ...options });

export { screen, waitForElementToBeRemoved } from '@testing-library/react';

export { customRender as render };
