module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
    'plugin:import/errors', // For import-related rules
    'plugin:import/warnings', // For additional import warnings
    'google', // Google style guide
  ],
  parserOptions: {
    ecmaVersion: 12, // Supports modern ES features
    sourceType: 'module', // Allows usage of ES Modules
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files
    '/generated/**/*', // Ignore generated files
  ],
  plugins: [
    'import', // For import rules
  ],
  rules: {
    quotes: ['error', 'double'], // Enforce double quotes
    'import/no-unresolved': 0, // Turn off unresolved imports error
    indent: ['error', 2], // Enforce 2-space indentation

    // Import Rules
    'import/no-unresolved': 0, // Disable unresolved import errors (useful for aliases)
    // Code Formatting
    'max-len': ['warn', { code: 100 }], // Allow longer lines up to 100 characters
    'no-console': 'off', // Allow console statements (useful for debugging)
    'require-jsdoc': 'off', // Disable JSDoc requirement for functions
    'new-cap': 'warn',
    'no-unused-vars': 'warn'
  },
}
