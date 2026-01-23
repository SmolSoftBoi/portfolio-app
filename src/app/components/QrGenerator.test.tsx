import React, { act } from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import QrGenerator from './QrGenerator';

// Mock QrCard to inspect the value passed to it
jest.mock('./QrCard', () => {
  return function MockQrCard({
    value,
    theme,
    children,
  }: {
    value: string;
    theme: string;
    children: React.ReactNode;
  }) {
    return (
      <div data-testid={`qr-card-${theme}`} data-value={value}>
        {children}
      </div>
    );
  };
});

describe('QrGenerator', () => {

  beforeAll(() => {
    // Mock XMLSerializer for SVG serialization
    global.XMLSerializer = class {
      serializeToString() {
        return '<svg>...</svg>';
      }
    } as any;

    // Mock btoa
    global.btoa = jest.fn((str) => 'base64encoded');

    // Mock Image
    // @ts-ignore
    global.Image = class {
      onload: () => void = () => {};
      src: string = '';
      width: number = 100;
      height: number = 100;
      constructor() {
        setTimeout(() => this.onload(), 10); // Simulate async load
      }
    };
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders default Text mode correctly', () => {
    render(<QrGenerator />);

    // Check if Text input is present
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();

    // Check if QrCard receives the correct value
    const qrCard = screen.getByTestId('qr-card-light');
    expect(qrCard).toHaveAttribute('data-value', ''); // Initially empty

    // Type something
    fireEvent.change(input, { target: { value: 'Hello World' } });
    expect(qrCard).toHaveAttribute('data-value', 'Hello World');
  });

  test('generates correct URL value', () => {
    render(<QrGenerator />);

    // Switch to URL
    fireEvent.click(screen.getByRole('button', { name: 'URL' }));

    const input = screen.getByPlaceholderText('Enter URL');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'https://example.com' } });

    const qrCard = screen.getByTestId('qr-card-light');
    expect(qrCard).toHaveAttribute('data-value', 'https://example.com');
  });

  test('generates correct Wi-Fi value', () => {
    render(<QrGenerator />);

    // Switch to Wi-Fi
    fireEvent.click(screen.getByRole('button', { name: 'Wi-Fi' }));

    const ssidInput = screen.getByPlaceholderText('Enter SSID');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    expect(ssidInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(ssidInput, { target: { value: 'MyNetwork' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });

    const qrCard = screen.getByTestId('qr-card-light');
    // Expected format: WIFI:S:<SSID>;T:WPA;P:<PASSWORD>;;
    expect(qrCard).toHaveAttribute(
      'data-value',
      'WIFI:S:MyNetwork;T:WPA;P:secret123;;'
    );
  });

  test('download button triggers download logic', async () => {
    // Mock canvas methods on the prototype
    const mockDrawImage = jest.fn();
    const mockToDataURL = jest.fn(() => 'data:image/png;base64,fake');

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: mockDrawImage,
    } as unknown as CanvasRenderingContext2D);

    jest
      .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
      .mockImplementation(mockToDataURL);

    // Mock anchor click to catch the download trigger
    // Since the element is created dynamically and not attached, spying on prototype is needed
    const mockClick = jest.fn();
    jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(mockClick);

    // Mock document.querySelector for SVG (the source image data)
    const mockSvg = document.createElement('div');
    jest.spyOn(document, 'querySelector').mockReturnValue(mockSvg);

    render(<QrGenerator />);

    const downloadButton = screen.getAllByText('Download')[0]; // First one (Light theme)

    await act(async () => {
      fireEvent.click(downloadButton);
    });

    // Wait for the async image loading and canvas drawing
    await waitFor(() => {
      expect(mockDrawImage).toHaveBeenCalled();
      expect(mockToDataURL).toHaveBeenCalledWith('image/png');
      expect(mockClick).toHaveBeenCalled();
    });
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
