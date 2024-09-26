import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../src/pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
//import userEvent from '@testing-library/user-event'

describe('LoginPage', () => {
    it('should render the login page', () => {
        render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>)

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
    });

    it('should render a register Form containing an input for user-email ', () => {
        render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>);

        const placeholderUsername = screen.getByPlaceholderText('your@email.com');
        expect(placeholderUsername).toBeInTheDocument();
    });
        
    it('should render a register Form containing an input for user-password ', () => {
        render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>);

        const placeholderUsername = screen.getByPlaceholderText('Enter your password here');
        expect(placeholderUsername).toBeInTheDocument();
    });
})