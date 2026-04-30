/** @jest-environment jsdom */
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gpts from './Gpts';
import gpts from '@/gpts';

// Mock the GptCard component
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

// Mock small dataset for functional testing
jest.mock('@/gpts', () => {
  const packs = ['Pack A', 'Pack B'];
  const mockGptsList = [
    { id: '1', title: 'GPT 1', description: 'Desc 1', pack: 'Pack A' },
    { id: '2', title: 'GPT 2', description: 'Desc 2', pack: 'Pack B' },
    { id: '3', title: 'GPT 3', description: 'Desc 3', pack: 'Pack A' },
  ];
  return {
    __esModule: true,
    default: mockGptsList,
    gptPacks: packs,
  };
});

describe('Gpts Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders correctly with default filter', () => {
    render(<Gpts gpts={gpts} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pack A')).toBeInTheDocument();
    expect(screen.getByText('Pack B')).toBeInTheDocument();

    // Should show all cards initially
    expect(screen.getAllByTestId('gpt-card')).toHaveLength(3);
  });

  it('filters items when category button is clicked', () => {
    render(<Gpts gpts={gpts} />);

    const packABtn = screen.getByText('Pack A');
    fireEvent.click(packABtn);

    // Should only show items from Pack A (GPT 1 and GPT 3)
    const cards = screen.getAllByTestId('gpt-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('GPT 1')).toBeInTheDocument();
    expect(screen.getByText('GPT 3')).toBeInTheDocument();
    expect(screen.queryByText('GPT 2')).not.toBeInTheDocument();
  });
});
