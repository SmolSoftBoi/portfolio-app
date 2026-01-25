/** @jest-environment jsdom */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gpts from './Gpts';

// Mock the GptCard component to isolate the test to Gpts component logic
jest.mock('./GptCard', () => {
  return function MockGptCard({ gpt }: { gpt: any }) {
    return <div data-testid="gpt-card">{gpt.title}</div>;
  };
});

// Mock SupportButton
jest.mock('./SupportButton', () => {
  return function MockSupportButton() {
    return <div>Support</div>;
  };
});

// Define mock data inside the factory or use a separate file, but here inline is fine.
jest.mock('@/gpts', () => {
  const PACK_COUNT = 1000;
  const packs = Array.from({ length: PACK_COUNT }, (_, i) => `Pack ${i}`);
  const gpts = packs.map((pack, i) => ({
    id: `gpt-${i}`,
    title: `GPT ${i}`,
    description: `Description ${i}`,
    pack: pack,
  }));
  return {
    __esModule: true,
    default: gpts,
    gptPacks: packs,
  };
});

// We also need the mock data in the test to pass as props
const PACK_COUNT = 1000;
const packs = Array.from({ length: PACK_COUNT }, (_, i) => `Pack ${i}`);
const mockGpts = packs.map((pack, i) => ({
  id: `gpt-${i}`,
  title: `GPT ${i}`,
  description: `Description ${i}`,
  pack: pack,
}));

describe('Gpts Component Benchmark', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Gpts gpts={mockGpts} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pack 0')).toBeInTheDocument();
    expect(screen.getByText(`Pack ${PACK_COUNT - 1}`)).toBeInTheDocument();
  });

  it('measures render time', () => {
    const start = performance.now();

    const ITERATIONS = 20;
    for (let i = 0; i < ITERATIONS; i++) {
        const { unmount } = render(<Gpts gpts={mockGpts} />);
        unmount();
    }

    const end = performance.now();
    console.log(`Average render time for ${PACK_COUNT} buttons over ${ITERATIONS} iterations: ${(end - start) / ITERATIONS} ms`);
  });
});
