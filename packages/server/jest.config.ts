/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from 'jest';

const config: Config = {
  transform: { '\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
};
export default config;
