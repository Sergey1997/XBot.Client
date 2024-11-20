module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["warn", "name", "length"], // Changed to 'warn'
    "prefer-arrow-callback": "warn", // Changed to 'warn'
    "quotes": ["warn", "double", { "allowTemplateLiterals": true }], // Changed to 'warn'
    "indent": ["warn", 2], // Set to warn with 2-space indentation
    "eol-last": ["warn", "always"], // Require newline at end of file, but as a warning
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
