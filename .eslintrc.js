module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  rules: {
    'react/no-did-mount-set-state': 0,
    camelcase: 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-shadow': 0,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
};
