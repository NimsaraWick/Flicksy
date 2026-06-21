/**
 * Jest configuration for Backend testing.
 */
export default {
  // Use Node environment for backend tests
  testEnvironment: 'node',
  // Transform is empty because we use --experimental-vm-modules for ESM support
  transform: {},
  // Detailed output for each test
  verbose: true,
};
