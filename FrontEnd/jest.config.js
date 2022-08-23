

module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  roots: ['./tests', '../FrontEnd/src', '../FrontEnd/src'],
  setupFilesAfterEnv: ['./tests/setup-jest.js'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-app',

  // https://stackoverflow.com/questions/71421924/running-jest-in-angular13-unexpected-value-translatemodule-imported-by-the-mo
  globalSetup: 'jest-preset-angular/global-setup',
};
