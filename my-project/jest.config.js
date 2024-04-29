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
};

export default config;
