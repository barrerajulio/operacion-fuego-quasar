require('reflect-metadata');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
}
