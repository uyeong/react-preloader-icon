module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: '.reports',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {'^.+\\.[j|t]sx?$': 'ts-jest'},
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.spec.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**']
};