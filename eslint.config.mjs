import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

const config = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      // Do not need to import React from 'react';
      'react/react-in-jsx-scope': 'off',
    },
    // Eslint runs prettier for us so that it does not conflict with the eslint rules.
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
  },
];

export default config;
