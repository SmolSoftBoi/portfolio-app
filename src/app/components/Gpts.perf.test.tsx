/** @jest-environment jsdom */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gpts from './Gpts';

// Mock child components to isolate Gpts rendering performance
jest.mock('./GptCard', () => () => <div />);
jest.mock('./SupportButton', () => () => <div />);

// Mock large dataset for benchmarking
jest.mock('@/gpts', () => {
  const PACK_COUNT = 1000;
  const packs = Array.from({ length: PACK_COUNT }, (_, i) => `Pack ${i}`);
  // We don't need the full gpt objects for the pack button rendering,
  // but the component iterates gpts to filter.
  // To test the BUTTON rendering specifically, we need many packs.
  return {
    __esModule: true,
    default: [], // We pass gpts via props, but the component imports gptPacks from here
    gptPacks: packs,
  };
});

// Mock data to pass as props
const PACK_COUNT = 1000;
// We keep the gpts list empty or small because we are primarily testing the
// rendering overhead of the filter buttons list (gptPacks.map), which was the optimization target.
const mockGpts: any[] = [];

describe('Gpts Component Benchmark', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // Only run if BENCHMARK=true
  const runBenchmark = process.env.BENCHMARK === 'true' ? it : it.skip;

  runBenchmark(`rendering ${PACK_COUNT} filter buttons`, () => {
    const start = performance.now();

    const ITERATIONS = 20;
    for (let i = 0; i < ITERATIONS; i++) {
        const { unmount } = render(<Gpts gpts={mockGpts} />);
        unmount();
    }

    const end = performance.now();
    // eslint-disable-next-line no-console
    console.log(`Average render time for ${PACK_COUNT} buttons over ${ITERATIONS} iterations: ${(end - start) / ITERATIONS} ms`);
  });
});
