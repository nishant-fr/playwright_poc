/**
 * @file jest.config.js
 * @description Jest configuration for the TypeScript project.
 */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: './coverage',
    collectCoverage: true,
  };
  