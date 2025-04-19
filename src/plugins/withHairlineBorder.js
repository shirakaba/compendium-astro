/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */

const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'hairline-border-outset': (value) => ({
        boxShadow: `0 0 0 1px ${toColorValue(value)}`,
        '@media (min-resolution: 2dppx)': {
          boxShadow: `0 0 0 0.5px ${toColorValue(value)}`,
        },
        '@media (min-resolution: 3dppx)': {
          boxShadow: `0 0 0 0.33333333px ${toColorValue(value)}`,
        },
        '@media (min-resolution: 4dppx)': {
          boxShadow: `0 0 0 0.25px ${toColorValue(value)}`,
        },
      }),
      'hairline-border-inset': (value) => ({
        boxShadow: `inset 0 0 0 1px ${toColorValue(value)}`,
        '@media (min-resolution: 2dppx)': {
          boxShadow: `inset 0 0 0 0.5px ${toColorValue(value)}`,
        },
        '@media (min-resolution: 3dppx)': {
          boxShadow: `inset 0 0 0 0.33333333px ${toColorValue(value)}`,
        },
        '@media (min-resolution: 4dppx)': {
          boxShadow: `inset 0 0 0 0.25px ${toColorValue(value)}`,
        },
      }),
    },
    {
      values: flattenColorPalette(theme('backgroundColor')),
      type: ['color', 'any'],
    }
  );
});

/**
 * Converts a color value or function to a color value.
 *
 * @param {string | (...args: Array<any>) => unknown} maybeFunction - The color value or function
 * @returns {string} - The color value
 * Formerly `import toColorValue from 'tailwindcss/lib/util/toColorValue'`.
 * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.4.17/src/util/toColorValue.js
 */
function toColorValue(maybeFunction) {
  return typeof maybeFunction === 'function'
    ? maybeFunction({})
    : maybeFunction;
}
