module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 10000,
};
