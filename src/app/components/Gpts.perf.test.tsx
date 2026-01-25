/** @jest-environment jsdom */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gpts from './Gpts';
import gpts, { gptPacks } from '@/gpts';

// Mock child components to isolate Gpts rendering performance
jest.mock('./GptCard', () => function MockGptCard() { return <div />; });
jest.mock('./SupportButton', () => function MockSupportButton() { return <div />; });

// Mock large dataset for benchmarking
jest.mock('@/gpts', () => {
  // Only generate the large dataset if we are actually running the benchmark
  const isBenchmark = process.env.BENCHMARK === 'true';
  const PACK_COUNT = isBenchmark ? 1000 : 0;

  const packs = Array.from({ length: PACK_COUNT }, (_, i) => `Pack ${i}`);

  return {
    __esModule: true,
    default: [], // We pass gpts via props, but the component imports gptPacks from here
    gptPacks: packs,
  };
});

describe('Gpts Component Benchmark', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // Only run if BENCHMARK=true
  const runBenchmark = process.env.BENCHMARK === 'true' ? it : it.skip;

  runBenchmark(`rendering ${gptPacks.length} filter buttons`, () => {
    const start = performance.now();

    const ITERATIONS = 20;
    for (let i = 0; i < ITERATIONS; i++) {
        // Use the imported gpts mock (which is [])
        const { unmount } = render(<Gpts gpts={gpts} />);
        unmount();
    }

    const end = performance.now();
    console.log(`Average render time for ${gptPacks.length} buttons over ${ITERATIONS} iterations: ${(end - start) / ITERATIONS} ms`);
  });
});
