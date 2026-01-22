import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import QrGenerator from './QrGenerator';

describe('QrGenerator', () => {
  test('renders QrGenerator with buttons', () => {
    render(<QrGenerator />);

    // Use getAllByText because "Text" appears in the button and the floating label/placeholder
    expect(screen.getAllByText('Text').length).toBeGreaterThan(0);

    // More specific query for the button
    const buttons = screen.getAllByRole('button');
    const textButton = buttons.find((button) => button.textContent === 'Text');
    expect(textButton).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'URL' })).toBeInTheDocument();
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
      cleanup();
    }
    const end = performance.now();
    console.log(
      `Render (mount/unmount) time for 500 iterations: ${end - start}ms`
    );
  });
});
