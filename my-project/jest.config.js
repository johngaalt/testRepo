const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {},
  transform: {
    "^.+\\.(ts|tsx)?$": ["ts-jest"],
    ".+\\.(png|svg|jpg|jpeg|gif|scss|css)$": "jest-transform-stub",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.ts"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

export default config;
