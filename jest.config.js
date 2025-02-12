require('dotenv').config({
  path: '.env'
})
module.exports = {
  roots: ['<rootDir>/tests'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!<rootDir>/src/domain/usecases/**',
    '!<rootDir>/src/**/*testHelpers.ts'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': ['ts-jest',
      {
        isolatedModules: true
      }
    ]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: ['dotenv/config'],
  clearMocks: true
}
