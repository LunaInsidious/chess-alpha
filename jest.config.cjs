module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.+)": "<rootDir>/src/$1",
  },
};
