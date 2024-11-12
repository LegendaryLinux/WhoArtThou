const react = require('eslint-plugin-react');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        }
      },
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      quotes: ['error', 'single'],
    }
  }
];
