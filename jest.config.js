module.exports = {
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/src/**/?(*.)+(spec).[jt]s'],
};
