/** @jest-environment jsdom */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gpts from './Gpts';
import { gptPacks } from '@/gpts';
import type { Gpt } from '@/gpts';

// Mock child components to isolate Gpts rendering performance
jest.mock(
  './GptCard',
  () =>
    function MockGptCard() {
      return <div />;
    }
);
jest.mock(
  './SupportButton',
  () =>
    function MockSupportButton() {
      return <div />;
    }
);

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

  const createBenchmarkGpts = (packs: string[]): Gpt[] =>
    packs.map((pack, index) => ({
      id: `benchmark-gpt-${index}`,
      title: `Benchmark GPT ${index}`,
      description: `Synthetic GPT for ${pack}`,
      pack,
    }));

  const replaceGptPacks = (packs: string[]) => {
    gptPacks.splice(0, gptPacks.length, ...packs);
  };

  runBenchmark(`updating ${gptPacks.length} filter buttons`, () => {
    const ITERATIONS = 20;
    const ascendingPacks = [...gptPacks];
    const descendingPacks = [...ascendingPacks].reverse();
    const benchmarkGpts = createBenchmarkGpts(ascendingPacks);
    const { rerender, unmount } = render(<Gpts gpts={benchmarkGpts} />);

    const start = performance.now();

    for (let index = 0; index < ITERATIONS; index++) {
      replaceGptPacks(index % 2 === 0 ? descendingPacks : ascendingPacks);
      rerender(<Gpts gpts={benchmarkGpts} />);
    }

    const end = performance.now();
    const averageDuration = (end - start) / ITERATIONS;

    try {
      console.info(
        `Average update time for ${gptPacks.length} buttons over ${ITERATIONS} iterations: ${averageDuration} ms`
      );
    } finally {
      replaceGptPacks(ascendingPacks);
      unmount();
    }

    expect(Number.isFinite(averageDuration)).toBe(true);
    expect(averageDuration).toBeGreaterThanOrEqual(0);
  });
});
