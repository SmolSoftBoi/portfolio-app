import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QrGenerator from './QrGenerator';

describe('QrGenerator', () => {
  test('renders QrGenerator with buttons', () => {
    render(<QrGenerator />);

    // Verify the "Text" button is rendered using an accessible role and name
    expect(screen.getByRole('button', { name: 'Text' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'URL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wi-Fi' })).toBeInTheDocument();
  });

  test('clicking a button changes the active state', () => {
    render(<QrGenerator />);
    expect(screen.getByRole('button', { name: 'Wi-Fi' })).toBeInTheDocument();
  });

  test('clicking a button changes the active state', () => {
    render(<QrGenerator />);
    const urlButton = screen.getByRole('button', { name: 'URL' });
    fireEvent.click(urlButton);

    expect(urlButton).toHaveClass('active');
    expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();
  });

  test('benchmark rendering', () => {
    const start = performance.now();
    for (let i = 0; i < 500; i++) {
      render(<QrGenerator />);
    }
    const end = performance.now();
    console.log(`Render time for 500 iterations: ${end - start}ms`);
  });
});
