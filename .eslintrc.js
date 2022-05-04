module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-relative-packages': 'off',
    'no-alert': 'off',
    eqeqeq: 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    semi: 'error',
    'no-nested-ternary': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'no-else-return': 'off',
    'prefer-arrow-callback': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'object-shorthand': 'off',
    'no-shadow': 'off',
    'no-debugger': 'off',
    'prefer-const': 'off',
    'no-multiple-empty-lines': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off'

  },
};
