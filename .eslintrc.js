module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:flowtype/recommended'],
  plugins: ['flowtype'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
