module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  ignorePatterns: [".eslintrc.js", "*.config.js", "staticAssetMock.js", "/dist/**.*"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error"],
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
