const { performance } = require('perf_hooks');

// Mock data
const name = 'John Doe';
const email = 'john.doe@example.com';
const subject = 'Performance Optimization';
const message =
  'This is a test message to benchmark console.log behavior with JSON.stringify.';

const iterations = 10000;

function benchmarkLog() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    // This replicates the exact line we are removing
    const logString = `Received contact form data: ${JSON.stringify({
      name,
      email,
      subject,
      message,
    })}`;
    // We mock console.log to avoid spamming the output, but we keep the string construction
    // as that's the main CPU cost aside from I/O.
    // However, the actual I/O of console.log is also significant.
    // Let's create a minimal logger to /dev/null if we want to test I/O, but
    // just constructing the string is often the CPU bound part users care about removing.
    // If we want to be truly accurate, we should write to stdout but redirect it.
    process.stdout.write(logString + '\n');
  }
  const end = performance.now();
  return end - start;
}

function benchmarkNoLog() {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    // Doing nothing
  }
  const end = performance.now();
  return end - start;
}

console.error('Running benchmark...');

// Warmup
for (let i = 0; i < 100; i++) {
  const logString = `Received contact form data: ${JSON.stringify({
    name,
    email,
    subject,
    message,
  })}`;
}

const timeWithLog = benchmarkLog();
const timeWithoutLog = benchmarkNoLog();

console.error(`Iterations: ${iterations}`);
console.error(`Time with log: ${timeWithLog.toFixed(2)}ms`);
console.error(`Time without log: ${timeWithoutLog.toFixed(2)}ms`);
console.error(`Improvement: ${(timeWithLog - timeWithoutLog).toFixed(2)}ms`);
