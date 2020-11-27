/* eslint-disable */
// const path = require('path');

module.exports = {
  root: true,
  extends: [
    '@shopify/stylelint-plugin',
    "@shopify/stylelint-plugin/prettier"
  ],
  plugins: [
    // "stylelint-order"
    // 'stylelint-config-shopify',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-media-use-custom-media',
    'stylelint-use-nesting'
  ],
  rules: {
    // "order/properties-alphabetical-order": true,
    // "selector-class-pattern": null,
    'csstools/value-no-unknown-custom-properties': [true, {
      importFrom: [
        'src/styles/variables.css',
        'src/styles/animations.css',
      ],
    }],
    'csstools/use-nesting': true,
    'no-unknown-animations': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'csstools/media-use-custom-media': 'always-known',
    // "selector-class-pattern": "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute', 'class', 'id'],
    }],
    'selector-id-pattern': '^[a-zA-Z][a-z0-9\-]+$',
    'selector-class-pattern': '^[a-zA-Z][a-z0-9\-]+$',
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'tailwind',
        'apply',
        'variants',
        'responsive',
        'screen',
      ],
    }],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'color-no-hex': null,
    'selector-max-combinators': null,
    'selector-max-specificity': '1,5,0',
    'selector-max-id': 1,
    'selector-max-class': 4,
  },
};
