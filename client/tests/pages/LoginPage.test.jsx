import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../src/pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';

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
            
    it('should ckeck the state variable email', async () => {
        const setEmail = vi.fn();

        vi.mock(import('useState'), (async(importOriginal) => {
            const actual = await importOriginal()
            return {
              ...actual,
            }}));
        setEmail('your@mail.com')

        render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>);

        expect(setEmail).toHaveBeenCalledWith('your@mail.com');
    });

    it('should ckeck the state variable user', async () => {
        const setUser = vi.fn();
        vi.mock(import('useState'), (async(importOriginal) => {
            const actual = await importOriginal()
            return {
              ...actual,
            }}));
        setUser({
            name: 'John',
            email: 'john@gmail.com',
            password: 'password',
        })
        render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>);

        
        expect(setUser).toHaveBeenCalledWith({
            name: 'John',
            email: 'john@gmail.com',
            password: 'password',
        });
    });
})