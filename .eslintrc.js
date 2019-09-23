module.exports = {
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prefer-destructuring': 'warn',
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs', {'allowSingleLine': false}],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 0,
      'maxBOF': 0,
    }],
    'no-use-before-define': ['error', {'functions': false}],
    '@typescript-eslint/no-use-before-define': ['error', {'functions': false}],
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'import/extensions': ['error', 'always', {'ignorePackages': true}],
  },
  overrides: [
    {
      "files": [
        "*.ts",
      ],
      "rules": {
        "import/extensions": "off"
      }
    },
  ]
};

