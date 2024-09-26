import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterPage from '../../src/pages/RegisterPage';
import { BrowserRouter } from 'react-router-dom';

describe('RegisterPage', () => {
    it('should render a register Form with heading', () => {
        render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);
        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
    });

    
    it('should render a register Form containing an input for username ', () => {
        render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);

        const placeholderUsername = screen.getByPlaceholderText('your username');
        expect(placeholderUsername).toBeInTheDocument();
    });
        
    it('should render a register Form containing an input for user-email ', () => {
        render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);

        const placeholderUsername = screen.getByPlaceholderText('your@email.com');
        expect(placeholderUsername).toBeInTheDocument();
    });
        
    it('should render a register Form containing an input for user-password ', () => {
        render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);

        const placeholderUsername = screen.getByPlaceholderText('Enter your password here');
        expect(placeholderUsername).toBeInTheDocument();
    });
        
    it('should render a register Form with a submit button', () => {
        render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);
        
        const submitBtn = screen.getByRole('button');
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).toHaveTextContent('Register')
    });
})