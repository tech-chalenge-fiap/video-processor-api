require('dotenv').config({
  path: '.env'
})
module.exports = {
  roots: ['<rootDir>/tests'],
  coverageThreshold: {
    global: {
      statements: 81,
      branches: 100,
      functions: 66,
      lines: 79
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
