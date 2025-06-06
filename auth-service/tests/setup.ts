// Setup file for Jest tests
// This file runs before each test file

// Configure global test timeout
jest.setTimeout(10000);

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3002';
process.env.DATABASE_URL = 'file:../dev.db';

// Suppress console logs during tests (optional)
// Uncomment the lines below if you want to suppress logs during testing
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };
